import type { APIRoute } from "astro";
import { BASE_URL } from "../lib/baseUrl";

// Generated from astro.config.mjs `site`/`base` instead of a static file in
// /public, so the Sitemap: line always points at the right domain — nothing
// to remember to update by hand when the real domain replaces the
// placeholder GitHub Pages one.
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(`${BASE_URL}sitemap-index.xml`, site);

  const body = `User-agent: *
Allow: /
Disallow: ${BASE_URL}thank-you/
Disallow: ${BASE_URL}server/

Sitemap: ${sitemapURL.href}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
