// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite"
import analogjsangular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
    vite: {
      plugins: [tailwindcss()],
    },
  integrations: [analogjsangular()],
});