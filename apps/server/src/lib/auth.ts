import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { db } from '../db';
import { schema } from '../db/schema';


export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  // trustedOrigins: [process.env.CORS_ORIGIN || '', 'my-better-t-app://'],
  trustedOrigins: ['*'],
  emailAndPassword: { enabled: true },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [expo(), openAPI()],
}) as ReturnType<typeof betterAuth>;
