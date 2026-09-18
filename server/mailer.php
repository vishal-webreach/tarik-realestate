<?php

declare(strict_types=1);

/**
 * Sends one email via the SendGrid v3 API using raw cURL — no Composer
 * dependency, so this drops onto plain shared PHP hosting unmodified.
 */
function sendgrid_send(
    array $config,
    string $toEmail,
    string $toName,
    string $subject,
    string $htmlBody,
    ?string $replyToEmail = null,
    ?string $replyToName = null,
    array $ccEmails = [],
    array $bccEmails = []
): bool {
    // SendGrid rejects the whole send with a 400 if any address repeats
    // across to/cc/bcc — so a lead is silently lost if, say, agent_email
    // and a bcc_email ever end up the same. De-dupe defensively instead of
    // trusting config.php to never overlap.
    $used = [strtolower($toEmail)];
    $ccEmails = array_values(array_filter($ccEmails, function ($e) use (&$used) {
        $keep = !in_array(strtolower($e), $used, true);
        if ($keep) $used[] = strtolower($e);
        return $keep;
    }));
    $bccEmails = array_values(array_filter($bccEmails, fn ($e) => !in_array(strtolower($e), $used, true)));

    $personalization = [
        'to' => [['email' => $toEmail, 'name' => $toName]],
    ];
    if ($ccEmails) {
        $personalization['cc'] = array_map(fn ($e) => ['email' => $e], $ccEmails);
    }
    if ($bccEmails) {
        $personalization['bcc'] = array_map(fn ($e) => ['email' => $e], $bccEmails);
    }

    $payload = [
        'personalizations' => [$personalization],
        'from' => ['email' => $config['from_email'], 'name' => $config['from_name']],
        'subject' => $subject,
        'content' => [['type' => 'text/html', 'value' => $htmlBody]],
    ];

    if ($replyToEmail) {
        $payload['reply_to'] = ['email' => $replyToEmail, 'name' => $replyToName ?? $replyToEmail];
    }

    $ch = curl_init('https://api.sendgrid.com/v3/mail/send');
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $config['sendgrid_api_key'],
            'Content-Type: application/json',
        ],
        CURLOPT_POSTFIELDS => json_encode($payload),
        CURLOPT_TIMEOUT => 15,
    ]);

    curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);

    if ($error !== '') {
        error_log('SendGrid cURL error: ' . $error);
        return false;
    }

    // SendGrid returns 202 Accepted on success.
    if ($status < 200 || $status >= 300) {
        error_log('SendGrid API error: HTTP ' . $status);
        return false;
    }

    return true;
}
