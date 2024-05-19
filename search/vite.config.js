import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        //target:"http://127.0.0.1:4523/m1/4509217-0-default",
        target: "http://127.0.0.1:5000", //接口地址
        changeOrigin: true,
        rewrite: (path) => {
          const newPath = path.replace(/^\/api/, "/api");
          console.log(`Rewriting path from ${path} to ${newPath}`);
          return newPath;
        }
      },
    },
  },
});
