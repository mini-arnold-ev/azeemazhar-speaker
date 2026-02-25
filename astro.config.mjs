import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://mini-arnold-ev.github.io',
  base: '/azeemazhar-speaker',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
