import { useEffect } from 'react';
import { authClient } from '../lib/auth-client';
import { ExtensionSync } from '../lib/extension-sync';

// Define explicit types for the hook return that match Better Auth types
type AuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type AuthSession = {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
  ipAddress?: string | null;
  userAgent?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type SessionData = {
  user: AuthUser;
  session: AuthSession;
} | null;

type AuthHookReturn = {
  session: SessionData;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, name: string) => Promise<any>;
  signOut: () => Promise<void>;
};

/**
 * Custom hook that wraps Better Auth with extension synchronization
 */
export const useAuthWithExtensionSync = (): AuthHookReturn => {
  const { data: session, error, isPending } = authClient.useSession();

  // Sync with extension when session changes
  useEffect(() => {
    if (session?.user) {
      ExtensionSync.notifyUserSignedIn({
        user: session.user,
        session: session.session,
      });
    } else if (!isPending && !session?.user) {
      ExtensionSync.notifyUserSignedOut();
    }
  }, [session, isPending]);

  const signIn = async (email: string, password: string) => {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.data?.user) {
        // Get fresh session data after successful sign in
        const sessionData = await authClient.getSession();
        ExtensionSync.notifyUserSignedIn({
          user: result.data.user,
          session: sessionData.data?.session || null,
        });
      }

      return result;
    } catch (error) {
      console.error('Sign in failed:', error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.data?.user) {
        // Get fresh session data after successful sign up
        const sessionData = await authClient.getSession();
        ExtensionSync.notifyUserSignedIn({
          user: result.data.user,
          session: sessionData.data?.session || null,
        });
      }

      return result;
    } catch (error) {
      console.error('Sign up failed:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
      ExtensionSync.notifyUserSignedOut();
    } catch (error) {
      console.error('Sign out failed:', error);
      // Still notify extension even if server request fails
      ExtensionSync.notifyUserSignedOut();
      throw error;
    }
  };

  return {
    session,
    user: session?.user || null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
    error,
    signIn,
    signUp,
    signOut,
  };
};