// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://tarikrealestate.com',
  base: '/',

  integrations: [
    react(),
    sitemap({
      // Utility pages (post-submit redirect, error page) — no indexing value.
      filter: (page) => !page.includes('/thank-you') && !page.endsWith('/404'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});