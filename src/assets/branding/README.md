# Branding Assets

The client's real logo files live here (in `src/assets/`, not `public/`, so
`astro:assets` can optimize them via the `<Image>` component):

- `tarik-real-estate-logo.png` — the original full lockup (crest + wordmark stacked), unmodified.
- `crest.png` — just the shield/icon mark, auto-cropped from the original.
- `wordmark.png` — just the "TARIK REAL ESTATE" text, auto-cropped from the original. Not currently used by any component, kept in case a future page wants it on its own.
- `crest.png` was also used to generate `favicon.png` (the browser tab icon, in `/public`).

## Where each is used

- **Footer** (`src/components/astro/Footer.astro`): the full, unmodified `tarik-real-estate-logo.png`. The footer's background is always the same dark color, so the logo's fixed colors read cleanly at any size.
- **Header** (`src/components/react/Header.tsx`): `crest.png` + `wordmark.png` side by side (a horizontal lockup, since the full logo file is a tall vertical stack that doesn't fit a header well). The header sits over a photo in its unscrolled state, where the logo's fixed bronze/gray tones can wash out against a bright sky — `Header.tsx` applies a `drop-shadow` filter to both images only while unscrolled (removed once the header's white background scrolls into place) to keep them legible without altering the artwork itself.

Site colors (`gold`/`charcoal`/`cream` tokens in `src/styles/global.css`) follow the approved design reference (`design/tarik-real-estate-landing-page`), not the raw logo swatch — update them there if the client supplies a refreshed brand kit.
