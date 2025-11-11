import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  dts: false,
  outDir: "dist",
  platform: "node",
  target: "esnext",
  bundle: true,
  external: ["@neondatabase/serverless", "better-auth", "drizzle-orm"],
});
