import { useEffect, useState } from 'react';
import type { AuthState } from '../lib/auth-client';
import { AuthStorage } from '../lib/auth-storage';
import { AuthSync } from '../lib/auth-sync';

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    let cleanup: (() => void) | null = null;

    const initializeAuth = async () => {
      try {
        // Initialize auth sync
        await AuthSync.initialize();
        
        // Get current auth state
        const currentState = await AuthSync.getCurrentAuthState();
        setAuthState(currentState);

        // Listen for auth state changes
        cleanup = AuthStorage.onAuthStateChange((newState) => {
          if (newState) {
            setAuthState(newState);
          } else {
            setAuthState({
              user: null,
              session: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        });
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();

    return () => {
      if (cleanup) {
        cleanup();
      }
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await AuthSync.signIn(email, password);
    
    if (!result.success) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
    
    return result;
  };

  const signUp = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const result = await AuthSync.signUp(email, password, name);
    
    if (!result.success) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }
    
    return result;
  };

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    await AuthSync.signOut();
  };

  const refreshAuth = async () => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    const newState = await AuthSync.syncAuthState();
    setAuthState(newState);
  };

  return {
    ...authState,
    signIn,
    signUp,
    signOut,
    refreshAuth,
  };
};