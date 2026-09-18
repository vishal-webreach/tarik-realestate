# Form handler (PHP + SendGrid)

Handles both lead forms on the site (the enquiry modal used across every
page, and the property search bar on the homepage). Sends two emails per
submission via SendGrid: a lead notification to the agent, and a thank-you
confirmation to the visitor.

## Why this is a separate folder

The site itself is a static Astro build deployed to **GitHub Pages**
(`.github/workflows/deploy.yml`), which only serves static files — it cannot
run PHP. This folder is never built or deployed by that workflow. It must be
uploaded separately to any standard PHP-capable host (shared hosting/cPanel,
a VPS, etc.) that supports PHP 8+ with cURL enabled, which covers virtually
all budget hosting.

## Deploy steps

1. Upload the contents of this folder to your PHP host, e.g. as
   `https://yourdomain.com/server/`.
2. Copy `config.example.php` to `config.php` on the server and fill in:
   - `sendgrid_api_key` — from SendGrid → Settings → API Keys (Restricted
     Access, "Mail Send" permission is enough).
   - `from_email` — must be a **verified Sender Identity** in SendGrid (or a
     domain with authenticated sending set up), or every send fails with a
     403.
   - `allowed_origins` — add your real production domain. This is the CORS
     allowlist; requests from any other origin are rejected by the browser
     before they reach this script.
3. Make sure the `storage/` folder is writable by PHP (used for the
   per-IP rate limit) — `chmod 755 storage` if needed.
4. In [`src/data/site-config.ts`](../src/data/site-config.ts), set
   `formsConfig.endpoint` to `https://yourdomain.com/server/enquiry.php`,
   then rebuild and redeploy the Astro site.
5. Test end-to-end: submit the enquiry modal (or the search bar) on the live
   site and confirm both emails arrive.

`config.php` is gitignored — never commit real API keys.

## What it does

- Validates required fields server-side (name, email format, phone format)
  — the frontend also validates, but this is what actually protects you,
  since client-side checks can always be bypassed.
- Strips tags/newlines from every field before it goes into an email, which
  also blocks email header injection.
- Honeypot field (`hp_field`) — a hidden input real visitors never see or
  fill; if it's non-empty, the request is silently accepted (`success:
  true`) but no email is sent, so bots don't learn to adapt.
- Time-trap (`ts`) — rejects (same silent-success handling) submissions that
  arrive less than `min_submit_seconds` after the form was rendered, since
  no human fills a multi-field form that fast.
- Per-IP rate limit (file-based, in `storage/`) — caps submissions per IP
  within a rolling window. Fails open on any storage error, so a disk issue
  never blocks a real lead.
- CORS restricted to `allowed_origins` from `config.php`.

## Testing locally

```bash
curl -i -X POST https://yourdomain.com/server/enquiry.php \
  -H "Content-Type: application/json" \
  -H "Origin: http://localhost:4321" \
  -d '{"name":"Test User","email":"test@example.com","phone":"703-555-0100","message":"Testing the form handler.","source":"Enquiry — General","ts":0}'
```

Note `ts: 0` deliberately fails the time-trap in the example above (that's
what confirms the check works — you should get back `{"success":true}` with
no email actually sent). Drop `ts` entirely, or set it to the current
millisecond timestamp, to test a real send.
