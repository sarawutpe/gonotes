import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  build: {
    rollupOptions: {
      external: ['debounce'],
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
});
