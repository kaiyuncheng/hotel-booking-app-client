import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteEslint from 'vite-plugin-eslint';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/hotel-booking-app-client/' : '/',
  plugins: [
    react(),
    tsconfigPaths(),
    viteEslint({
      failOnError: true,
    }),
  ],
});
