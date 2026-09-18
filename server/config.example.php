<?php
/**
 * Copy this file to config.php on your PHP host and fill in real values.
 * config.php is gitignored — never commit real API keys.
 */

return [
    // Create one at https://app.sendgrid.com/settings/api_keys (Restricted
    // Access → Mail Send only is enough).
    'sendgrid_api_key' => 'SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',

    // Must be a verified Sender Identity (or a domain with authenticated
    // sending) in SendGrid, or every send will fail with a 403.
    'from_email' => 'noreply@yourdomain.com',
    'from_name' => 'Tarik Real Estate',

    // Who gets notified when a lead comes in.
    'business_name' => 'Tarik Real Estate',
    'agent_name' => 'Tarik Jabrane',
    'agent_email' => 'tarikrealestate@gmail.com',
    'agent_phone' => '703-862-1119',

    // Optional extra recipients on the agent notification email only (never
    // on the visitor's thank-you email). Leave either as an empty array for
    // none. TODO: CLIENT TO CONFIRM — these are placeholder addresses.
    'cc_emails' => ['cc-placeholder@example.com'],
    'bcc_emails' => ['bcc-placeholder@example.com'],

    // Browser origins allowed to POST to this endpoint (no trailing slash).
    // Keep the localhost entry for local `astro dev` testing.
    'allowed_origins' => [
        'https://tarikrealestate.com',
        'http://localhost:4321',
    ],

    // Submissions arriving faster than this after the form was rendered are
    // treated as spam (a real visitor can't fill and submit a form in under
    // 3 seconds; a script can).
    'min_submit_seconds' => 3,

    // Simple per-IP throttle: at most this many submissions per window.
    'rate_limit_max' => 5,
    'rate_limit_window_seconds' => 600,
];
