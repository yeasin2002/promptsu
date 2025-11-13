import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  bundle: true,
  outDir: 'dist',
  format: 'esm',
  treeshake: true,
  // splitting: false, // Disable code splitting for serverless
  dts: false,
});

// external: ["@neondatabase/serverless", "better-auth", "drizzle-orm"],
