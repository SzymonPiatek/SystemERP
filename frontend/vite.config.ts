import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
