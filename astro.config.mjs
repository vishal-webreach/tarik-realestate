// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://vishal-webreach.github.io',
  base: '/tarik-realestate',

  integrations: [react()],

  image: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.pexels.com' }]
  },

  vite: {
    plugins: [tailwindcss()]
  }
});