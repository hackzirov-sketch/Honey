import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      // Barcha /api/v1/ so'rovlar Django backend ga
      "/api/v1": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      // /api/auth/ — SimpleJWT token/refresh uchun (fallback)
      "/api/auth": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
      // Swagger
      "/swagger": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

