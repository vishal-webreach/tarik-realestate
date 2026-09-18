<?php

declare(strict_types=1);

/**
 * Branded HTML email shell shared by every outbound message. Table-based
 * layout with inline styles and web-safe font fallbacks (Georgia / Arial)
 * on purpose — Gmail, Outlook, and most mobile mail clients strip <style>
 * blocks and ignore flexbox/grid, so this is the layout that actually
 * survives across inboxes instead of just looking right in a browser.
 */
function render_email_shell(string $businessName, string $bodyHtml): string
{
    $business = htmlspecialchars($businessName, ENT_QUOTES, 'UTF-8');

    return <<<HTML
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0ece4;padding:32px 16px;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#ffffff;">
        <tr>
          <td style="background-color:#1a1a1a;padding:24px 40px;">
            <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:18px;letter-spacing:2px;color:#ffffff;">{$business}</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;font-family:Arial,Helvetica,sans-serif;">
            {$bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:20px 40px;border-top:1px solid #e8e2d9;">
            <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#a09a93;">{$business}</p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
HTML;
}

/**
 * One label/value row in the agent's lead-detail table. Values must already
 * be HTML-escaped by the caller.
 */
function render_field_row(string $label, string $escapedValue): string
{
    $labelEsc = htmlspecialchars($label, ENT_QUOTES, 'UTF-8');
    return <<<HTML
<tr>
  <td style="padding:12px 0;border-bottom:1px solid #e8e2d9;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a7a63;width:140px;vertical-align:top;white-space:nowrap;">{$labelEsc}</td>
  <td style="padding:12px 0 12px 16px;border-bottom:1px solid #e8e2d9;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#1a1a1a;">{$escapedValue}</td>
</tr>
HTML;
}
