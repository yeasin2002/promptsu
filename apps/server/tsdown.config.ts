import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/**/*.ts",
  format: "esm",
  banner: { js: "import 'dotenv/config';" },
});
