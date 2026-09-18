import type { APIRoute } from "astro";
import { siteConfig } from "../data/site-config";
import { BASE_URL } from "../lib/baseUrl";

// llms.txt (see https://llmstxt.org) — a plain-text briefing for AI
// assistants/crawlers, the same idea as robots.txt/sitemap.xml but aimed at
// LLMs that can't easily parse the rendered page. Generated from
// site-config.ts so it can't drift out of sync with the real contact info.
export const GET: APIRoute = ({ site }) => {
  const homeURL = new URL(BASE_URL, site).href;

  const body = `# ${siteConfig.business.name}

> ${siteConfig.agent.fullName}, ${siteConfig.agent.title}, serving ${siteConfig.contact.location} and the greater Northern Virginia / DMV region — buying, selling, and renting residential real estate.

## Site

- [Homepage](${homeURL}): Featured and recently sold listings, buyer/seller/renter enquiry forms, real estate investment guidance, Morocco/international real estate assistance, agent bio, areas served, client testimonials, and real estate resources/insights.

## Areas served

${siteConfig.areasServed.map((area) => `- ${area}`).join("\n")}

## Contact

- Agent: ${siteConfig.agent.fullName}, ${siteConfig.agent.title}
- Phone: ${siteConfig.contact.phone}
- Email: ${siteConfig.contact.email}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
