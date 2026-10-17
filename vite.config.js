import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import cibelesMedia from './plugins/cibelesMedia.js';

export default defineConfig({
  plugins: [react(), cibelesMedia()],
  build: {
    rollupOptions: {
      input: {
        // experiencia original: 21 de septiembre (/)
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        // regalo de cumpleaños (/cumple/)
        cumple: fileURLToPath(new URL('./cumple/index.html', import.meta.url)),
      },
    },
  },
});
