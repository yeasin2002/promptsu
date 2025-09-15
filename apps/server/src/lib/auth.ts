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
  trustedOrigins: [
    process.env.CORS_ORIGIN || 'http://localhost:3001',
    'http://localhost:3001',
    'chrome-extension://*', // Allow all Chrome extensions for development
    'moz-extension://*', // Allow all Firefox extensions for development
    '*', // Allow all origins for development (remove in production)
  ],
  emailAndPassword: { enabled: true },
  advanced: {
    defaultCookieAttributes: {
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  },
  plugins: [expo(), openAPI()],
}) as ReturnType<typeof betterAuth>;
