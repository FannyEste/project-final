import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.cjs', // Ensure PostCSS config is linked
  },
  server: {
    // Fallback for React Router
    historyApiFallback: true,
  },
  build: {
    // Optionally, you can add output dir customization or optimizations
    outDir: 'dist',
  },
});
