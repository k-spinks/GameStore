import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/games': 'http://localhost:5001',
      '/genres': 'http://localhost:5001',
    },
  },
});
