// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Set the site URL for production (replace with your own URL in production)
  site: 'https://example.com',
  
  // Base path (set to '/' for most sites)
  base: '/',
  
  // Configure Vite plugins
  vite: {
    plugins: [
      tailwindcss() 
    ]
  },
  
  // Configure Astro integrations
  integrations: [mdx(), icon(), sitemap()]
});