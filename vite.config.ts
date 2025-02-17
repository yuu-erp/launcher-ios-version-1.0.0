import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  base: "./",
  server: {
    host: "0.0.0.0",
    open: true,
  },
  resolve: {
    alias: {
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
});
