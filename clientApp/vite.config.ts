import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'node:fs';
// import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4000,
    https: false,
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, '192.168.100.96-key.pem')),
    //   cert: fs.readFileSync(path.resolve(__dirname, '192.168.100.96.pem'))
    // },
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
});
