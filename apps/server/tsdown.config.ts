import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  bundle: true,
  outDir: 'dist',
  format: 'esm',
});



// external: ["@neondatabase/serverless", "better-auth", "drizzle-orm"],
