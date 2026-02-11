// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import analogjsangular from '@analogjs/astro-angular';
import netlify from '@astrojs/netlify'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  integrations: [analogjsangular({

  })],
  vite: {
    plugins: [tailwindcss()],
  },
});