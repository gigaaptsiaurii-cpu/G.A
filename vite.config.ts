import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],

    // 🔥 აუცილებელია GitHub Pages-ზე (/GA/)
    base: '/GA/',

    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});
