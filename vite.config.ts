import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteEslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/hotel-booking-app-client/' : '/',
  plugins: [
    react(),
    viteEslint({
      failOnError: true,
    }),
  ],
});
