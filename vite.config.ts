import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [preact(), tailwindcss() as any],
  base: "./",
});
