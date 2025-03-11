// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  // Set the site URL for production
  site: 'https://example.com',
  
  // Base path (set to '/' for most sites)
  base: '/',
  
  // Configure Vite plugins and server settings
  vite: {
    plugins: [
      tailwindcss()
    ],
    server: {
      fs: {
        allow: [
          // Allow the project root (default)
          '.',
          // Allow the src/assets directory to fix the Vite serving error
          path.resolve('./src/assets'),
        ],
      },
    },
  },
  
  // Configure Astro integrations
  integrations: [mdx(), icon(), sitemap()]
});