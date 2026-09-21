<?php

declare(strict_types=1);

/**
 * Trims, strips tags, collapses newlines (so a submitted value can never
 * inject extra headers into an outbound email), and caps length.
 */
function clean_field(array $data, string $key, int $maxLen = 255): string
{
    $val = isset($data[$key]) ? (string) $data[$key] : '';
    $val = trim($val);
    $val = str_replace(["\r", "\n"], ' ', $val);
    $val = strip_tags($val);
    if (mb_strlen($val) > $maxLen) {
        $val = mb_substr($val, 0, $maxLen);
    }
    return $val;
}

/**
 * filter_var(FILTER_VALIDATE_EMAIL) alone accepts a single-character TLD
 * (e.g. "name@gmail.c" passes it) since that's technically not forbidden
 * by the email grammar — but no real TLD is that short, so this also
 * requires a real-shaped one, mirroring the frontend's EMAIL_PATTERN.
 *
 * Format-only checks can never catch a domain typo like "gmail.co" instead
 * of "gmail.com" — that's syntactically perfect but simply can't receive
 * mail. This also confirms the domain can actually take mail, by looking
 * up its real DNS records. Only possible server-side — browsers have no
 * DNS lookup API, so this is the reason a domain-typo error appears a
 * moment after clicking submit rather than instantly like the other
 * checks.
 */
function is_valid_email(string $email): bool
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        return false;
    }
    if (!preg_match('/\.[a-zA-Z]{2,}$/', $email)) {
        return false;
    }

    $domain = substr(strrchr($email, '@'), 1);
    return has_deliverable_mx($domain);
}

/**
 * True if mail could actually be delivered to this domain. Two gotchas
 * plain checkdnsrr($domain, 'MX') misses:
 *  - A domain with NO MX record can still receive mail via a plain A
 *    record (an old but valid convention) — so absence of MX isn't
 *    automatically invalid.
 *  - A domain can publish a "Null MX" record (RFC 7505 — target ".") to
 *    explicitly declare it never accepts mail. checkdnsrr() reports that
 *    as "an MX record exists" (true), which is technically correct but
 *    the wrong answer for "can I email this domain" — exactly what let
 *    "gmail.co" through despite it rejecting all mail.
 */
function has_deliverable_mx(string $domain): bool
{
    $mxRecords = @dns_get_record($domain, DNS_MX);
    if ($mxRecords) {
        foreach ($mxRecords as $record) {
            if (($record['target'] ?? '') !== '.') {
                return true;
            }
        }
        return false; // every MX record present is a Null MX — mail explicitly refused
    }

    return checkdnsrr($domain, 'A') || checkdnsrr($domain, 'AAAA');
}

/**
 * Checks digit COUNT, not string length — mirrors the frontend's
 * isValidPhone(). 10-15 digits covers a US number (10, or 11 with a
 * leading "1") through a full international E.164 number.
 */
function is_valid_phone(string $phone): bool
{
    if (!preg_match('/^[0-9+\-\s().]+$/', $phone)) {
        return false;
    }
    $digitCount = strlen(preg_replace('/\D/', '', $phone));
    return $digitCount >= 10 && $digitCount <= 15;
}

/**
 * Simple file-based per-IP throttle. Fails open (allows the request) on any
 * storage problem — spam protection should never be the reason a real lead
 * gets lost.
 */
function rate_limit_ok(string $ip, array $config): bool
{
    $dir = __DIR__ . '/storage';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true) && !is_dir($dir)) {
        return true;
    }

    $file = $dir . '/' . hash('sha256', $ip) . '.json';
    $fp = @fopen($file, 'c+');
    if (!$fp) {
        return true;
    }

    flock($fp, LOCK_EX);
    $raw = stream_get_contents($fp);
    $attempts = json_decode($raw !== false && $raw !== '' ? $raw : '[]', true);
    if (!is_array($attempts)) {
        $attempts = [];
    }

    $now = time();
    $windowStart = $now - $config['rate_limit_window_seconds'];
    $attempts = array_values(array_filter($attempts, fn ($t) => $t > $windowStart));

    $allowed = count($attempts) < $config['rate_limit_max'];
    if ($allowed) {
        $attempts[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, json_encode($attempts));
        fflush($fp);
    }

    flock($fp, LOCK_UN);
    fclose($fp);
    return $allowed;
}
