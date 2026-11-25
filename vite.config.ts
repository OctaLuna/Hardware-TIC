import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            const normalizedId = id.replaceAll('\\', '/');
            if (/\/node_modules\/(react|react-dom|scheduler|react-router|react-router-dom)\//.test(normalizedId)) return 'react-vendor';
            if (/\/node_modules\/(recharts|victory-vendor|d3-[^/]+)\//.test(normalizedId)) return 'charts-vendor';
            if (/\/node_modules\/(gsap|@gsap\/react)\//.test(normalizedId)) return 'motion-vendor';
          },
        },
      },
    },
  };
});
