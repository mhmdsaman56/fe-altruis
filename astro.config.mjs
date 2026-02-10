// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import analogjsangular from '@analogjs/astro-angular';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  
  integrations: [analogjsangular({

  })],
  vite: {
    plugins: [tailwindcss()],
  },
});