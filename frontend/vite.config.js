import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure correct asset paths
  css: {
    //postcss: './postcss.config.cjs', // Ensure PostCSS config is linked
  },
  server: {
    historyApiFallback: true, // For React Router SPA
  },
  build: {
    outDir: 'dist',
  },
});
