import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  outDir: "dist",
  srcDir: "src",
  entrypointsDir: "app",
  manifest: {
    permissions: ["storage"],
  },

  vite: () => ({
    plugins: [tailwindcss()],
    server: {
      cors: false,
    },
  }),
});
