import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy WordPress REST API calls during development to avoid CORS issues.
    // Change the target to your local or staging WP instance.
    proxy: {
      '/wp-json': {
        target: 'https://YOUR-WP-DOMAIN.com',
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
