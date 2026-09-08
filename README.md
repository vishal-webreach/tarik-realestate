# Tarik Real Estate — Landing Page

A single-page real estate agent landing page. Built with Astro, React (for a
few interactive islands), and Tailwind CSS. Visual design ported from the
approved reference at `design/tarik-real-estate-landing-page/`. This is
phase one of the project — a PHP/MySQL backend for seller submissions and
enquiry handling comes later.

## Commands

| Command           | Action                                       |
| :----------------- | :-------------------------------------------- |
| `npm install`       | Install dependencies                          |
| `npm run dev`       | Start local dev server (`localhost:4321`, or next free port) |
| `npm run build`     | Build production site to `./dist/`            |
| `npm run preview`   | Preview the production build locally          |

## Pre-Launch Checklist

This build is full of clearly-marked **placeholder content**. Before launch, replace:

- [x] **Phone** — `src/data/site-config.ts` `contact.phone` — confirmed from
      the client-supplied profile poster (703-862-1119).
- [x] **Email** — `src/data/site-config.ts` `contact.email` — confirmed
      (tarikrealestate@gmail.com).
- [ ] **Agent license number** — `src/data/site-config.ts` `agent.licenseNumber`.
- [ ] **Listings** — `src/data/properties.ts`: `featuredProperties` and
      `recentSales`. The first featured entry is a placeholder for
      3501 Groveton St, Alexandria, VA — confirm real price, specs, and
      photos against the client's source listing (Zillow blocked automated
      lookup, so these are estimates).
- [ ] **Testimonials** — `src/data/testimonials.ts`: every entry has
      `isPlaceholder: true`; replace with real client reviews.
- [ ] **Insights articles** — `src/data/insights.ts`: sample article content.
- [ ] **Service areas / imagery** — `src/data/areas.ts`.
- [ ] **Social links** — `src/components/astro/Footer.astro` currently
      points to generic `instagram.com`/`facebook.com`/`linkedin.com`.
- [ ] Remove the `noindex, nofollow` robots meta tag in
      `src/layouts/BaseLayout.astro` once real content is in place.

Stock photography currently comes from Pexels (hot-linked, matching the
design reference) — replace with the client's real listing/lifestyle photos
where noted.

## Branding

The client's real logo lives in `public/branding/` (see the README there for
which piece is used where, and why the Header keeps the design reference's
own adaptive SVG mark instead of a flat logo image). Site colors (`gold`,
`charcoal`, `cream` tokens in `src/styles/global.css`) come from the design
reference, not the raw logo swatch.

## Enquiry Button

Every active listing card and the "Sell With Us" seller CTA open the same
`EnquiryModal` (a single React island mounted once in `BaseLayout.astro`,
opened via a `data-enquiry-open` + `enquiry:open` custom event so trigger
buttons stay in plain static markup). The header's desktop CTA is currently
a direct `tel:` call button instead (see `TEMP` comment in
`src/components/react/Header.tsx` — the "Let's Talk" enquiry-modal trigger
is commented out there, not deleted). The modal UI
(form, confirmation state) is fully built but **not wired to a backend
yet** — submitting it does not send anywhere. See the `TODO(backend)`
comment in `src/components/react/EnquiryModal.tsx` for where the future PHP
endpoint integration goes.

## Architecture notes

Most sections are static `.astro` components. Scroll-reveal animation
(`.reveal` → `.reveal.visible`, defined in `global.css`) is driven by a
single shared `IntersectionObserver` in `BaseLayout.astro`, rather than one
observer per section.

Three components need real client-side state and are React islands instead:

- `Header.tsx` (`client:load`) — scroll-position color switching, mobile menu.
- `PropertySearch.tsx` (`client:load`) — custom dropdowns, simulated search.
- `Testimonials.tsx` (`client:visible`) — carousel; manages its own reveal
  animation via `useReveal()` rather than the shared observer (see the
  comment in `BaseLayout.astro`'s reveal script for why it's excluded).

## Project Structure

```text
src/
├── components/
│   ├── astro/    static section components (Hero, FeaturedProperties, Footer, etc.)
│   └── react/    Header, PropertySearch, Testimonials, EnquiryModal — the hydrated islands
├── data/         site-config.ts, properties.ts, areas.ts, testimonials.ts, insights.ts
├── hooks/        useReveal.ts — used only by Testimonials.tsx
├── layouts/      BaseLayout.astro
├── pages/        index.astro — the landing page
└── styles/       global.css — Tailwind theme tokens + animations
```
