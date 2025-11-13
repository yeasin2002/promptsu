import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
});

// external: ["@neondatabase/serverless", "better-auth", "drizzle-orm"],
