import { expo } from '@better-auth/expo';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '../db';
import { schema } from '../db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  trustedOrigins: [
    'http://localhost:3001', // Development web app
    'http://localhost:3000', // Development server
    'my-better-t-app://', // Mobile app
    ...(process.env.CORS_ORIGIN ? [process.env.CORS_ORIGIN] : []),
  ],
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  secret: process.env.BETTER_AUTH_SECRET || 'fallback-secret-for-development',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: false, // Set to true if using subdomains
    },
    generateId: false, // Use default ID generation
  },
  plugins: [expo()],
});
