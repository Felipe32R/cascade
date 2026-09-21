import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  build: {
    // Static pages: the home page, the full gallery at /gallery/ and the leads dashboard at /admin/.
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        gallery: resolve(__dirname, "gallery/index.html"),
        admin: resolve(__dirname, "admin/index.html"),
      },
    },
  },
});
