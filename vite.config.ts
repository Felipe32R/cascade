import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, open: false },
  build: {
    // Two static pages: the home page and the full gallery at /gallery/.
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        gallery: resolve(__dirname, "gallery/index.html"),
      },
    },
  },
});
