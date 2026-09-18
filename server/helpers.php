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
