import type { Context as HonoContext } from 'hono';
import { auth } from './auth';

export type CreateContextOptions = {
  context: HonoContext;
};

export async function createContext({ context }: CreateContextOptions) {
  // First try to get session from cookies (web app)
  let session = await auth.api.getSession({
    headers: context.req.raw.headers,
  });

  // If no session from cookies, try Authorization header (extension)
    const authHeader = context.req.header('Authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      try {
        // Verify the token and get session
        session = await auth.api.getSession({
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        });
      } catch (error) {
        console.warn('Failed to verify bearer token:', error);
      }
    }
  }

  return {
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
