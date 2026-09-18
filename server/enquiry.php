<?php

declare(strict_types=1);

/**
 * Single endpoint behind every lead form on the site (the enquiry modal and
 * the hero property search). POST JSON, get back { success, message? }.
 * See README.md in this folder for deployment steps.
 */

header('Content-Type: application/json; charset=utf-8');

$config = require __DIR__ . '/config.php';
require __DIR__ . '/mailer.php';
require __DIR__ . '/helpers.php';
require __DIR__ . '/email-templates.php';

// --- CORS --------------------------------------------------------------
// Only the domains listed in config.php get a permissive response; a
// disallowed origin's preflight fails and the browser never sends the
// actual POST, so this alone keeps the endpoint from being used by other
// sites even though it has no auth of its own.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $config['allowed_origins'], true)) {
    header("Access-Control-Allow-Origin: $origin");
}
header('Vary: Origin');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    exit;
}

// --- Parse body ----------------------------------------------------------
$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid request.']);
    exit;
}

// --- Rate limit ------------------------------------------------------------
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!rate_limit_ok($ip, $config)) {
    http_response_code(429);
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again in a few minutes.']);
    exit;
}

// --- Honeypot + time-trap spam check ----------------------------------------
// Both are silently swallowed as a fake "success" — a bot that gets an error
// back just learns to route around it. Real users never notice either
// check since the honeypot field is invisible and no genuine visitor can
// fill a multi-field form in under min_submit_seconds.
$honeypot = isset($data['hp_field']) ? trim((string) $data['hp_field']) : '';
$renderedAtMs = isset($data['ts']) ? (float) $data['ts'] : null;

$isSpam = $honeypot !== '';
if (!$isSpam && $renderedAtMs) {
    $elapsedSeconds = (microtime(true) * 1000 - $renderedAtMs) / 1000;
    if ($elapsedSeconds < $config['min_submit_seconds']) {
        $isSpam = true;
    }
}

if ($isSpam) {
    echo json_encode(['success' => true]);
    exit;
}

// --- Field validation -----------------------------------------------------
$name = clean_field($data, 'name', 100);
$email = clean_field($data, 'email', 200);
$phone = clean_field($data, 'phone', 30);
$message = clean_field($data, 'message', 2000);
$source = clean_field($data, 'source', 60) ?: 'Website Enquiry';
$listingAddress = clean_field($data, 'listingAddress', 200);
$transactionType = clean_field($data, 'transactionType', 30);
$location = clean_field($data, 'location', 100);
$propertyType = clean_field($data, 'propertyType', 60);

$errors = [];
if (mb_strlen($name) < 2) {
    $errors[] = 'Please enter your name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Please enter a valid email address.';
}
if ($phone !== '' && !preg_match('/^[0-9+\-\s().]{7,30}$/', $phone)) {
    $errors[] = 'Please enter a valid phone number.';
}

if ($errors) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// --- Notify the agent (this is the actual lead capture) --------------------
$esc = fn (string $v): string => htmlspecialchars($v, ENT_QUOTES, 'UTF-8');

// "Enquiry Type" isn't something the visitor typed — it's set automatically
// from which button/form they used (Buyer, Seller, Renter, General,
// Property Search), so the agent has context at a glance.
$rows = [
    'Name' => $esc($name),
    'Email' => $esc($email),
    'Phone' => $phone !== '' ? $esc($phone) : '—',
    'Enquiry Type' => $esc($source),
];
if ($listingAddress !== '') $rows['Property'] = $esc($listingAddress);
if ($transactionType !== '') $rows['Looking To'] = $esc($transactionType);
if ($location !== '') $rows['Location'] = $esc($location);
if ($propertyType !== '') $rows['Property Type'] = $esc($propertyType);
if ($message !== '') $rows['Message'] = nl2br($esc($message));

$rowsHtml = '';
foreach ($rows as $label => $value) {
    $rowsHtml .= render_field_row($label, $value);
}

$agentBody = "<p style=\"margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:500;color:#1a1a1a;\">New Website Lead</p>"
    . "<table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" style=\"border-collapse:collapse;\">{$rowsHtml}</table>";

$agentHtml = render_email_shell($config['business_name'], $agentBody);

$agentSent = sendgrid_send(
    $config,
    $config['agent_email'],
    $config['agent_name'],
    "{$config['business_name']} — {$name}",
    $agentHtml,
    $email,
    $name,
    $config['cc_emails'] ?? [],
    $config['bcc_emails'] ?? []
);

if (!$agentSent) {
    http_response_code(502);
    echo json_encode(['success' => false, 'message' => 'We could not send your message right now. Please call or text us directly.']);
    exit;
}

// --- Thank-you confirmation to the visitor (best-effort) ------------------
$thankYouBody = "<p style=\"margin:0 0 20px;font-family:Georgia,'Times New Roman',serif;font-size:24px;font-weight:500;color:#1a1a1a;\">Thank You, " . $esc($name) . "</p>"
    . "<p style=\"margin:0 0 16px;font-size:14px;line-height:1.6;color:#5a5a5a;\">We've received your message and " . $esc($config['agent_name']) . " will be in touch shortly.</p>"
    . "<p style=\"margin:0;font-size:14px;line-height:1.6;color:#5a5a5a;\">Need something sooner? Call or text us at <strong style=\"color:#1a1a1a;\">" . $esc($config['agent_phone']) . "</strong>.</p>";

$thankYouHtml = render_email_shell($config['business_name'], $thankYouBody);

sendgrid_send($config, $email, $name, 'Thanks for reaching out — ' . $config['business_name'], $thankYouHtml);

echo json_encode(['success' => true]);
