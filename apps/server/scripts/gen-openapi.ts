// scripts/gen-openapi.ts
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import fs from 'fs';
import { appRouter } from '../src/routers/oRPC-router';

async function main() {
  const gen = new OpenAPIGenerator({
    schemaConverters: [new ZodToJsonSchemaConverter()],
  });

  const spec = await gen.generate(appRouter, {
    info: { title: 'My API', version: '1.0.0' },
    // optionally add servers: [{ url: "http://localhost:3000" }]
  });

  fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 2));
  console.log('openapi.json generated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
