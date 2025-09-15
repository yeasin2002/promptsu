// scripts/gen-openapi.ts
import { OpenAPIGenerator } from '@orpc/openapi';
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4';
import fs from 'fs';
import { appRouter } from '../src/routers';

async function main() {
  const gen = new OpenAPIGenerator({
    schemaConverters: [new ZodToJsonSchemaConverter()],
  });

  const spec = await gen.generate(appRouter, {
    info: { title: 'promptsu API', version: '0.0.1' },
    servers: [{ description: 'oRPC', url: 'http://localhost:3000/rpc' }],
  });

  fs.writeFileSync('openapi.json', JSON.stringify(spec, null, 2));
  console.log('openapi.json generated');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
