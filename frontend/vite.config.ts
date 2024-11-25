import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      include: '**/*.tsx',
    }),
  ],
  define: {
    'process.env': process.env,
  },
  server: {
    port: 3000,
    watch: {
      usePolling: true,
    },
  },
});
