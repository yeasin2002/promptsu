import { authClient, type AuthState } from './auth-client';
import { AuthStorage } from './auth-storage';

export class AuthSync {
  private static syncInterval: NodeJS.Timeout | null = null;
  private static isInitialized = false;

  /**
   * Initialize authentication synchronization
   */
  static async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Check current auth state from server
      await this.syncAuthState();
      
      // Set up periodic sync (every 5 minutes)
      this.syncInterval = setInterval(() => {
        this.syncAuthState();
      }, 5 * 60 * 1000);

      this.isInitialized = true;
      console.log('Auth sync initialized');
    } catch (error) {
      console.error('Failed to initialize auth sync:', error);
    }
  }

  /**
   * Sync authentication state with server
   */
  static async syncAuthState(): Promise<AuthState> {
    try {
      // Get current session from server
      const session = await authClient.getSession();
      
      const authState: AuthState = {
        user: session.data?.user || null,
        session: session.data?.session || null,
        isAuthenticated: !!session.data?.user,
        isLoading: false,
      };

      // Save to storage
      await AuthStorage.saveAuthState(authState);
      
      return authState;
    } catch (error) {
      console.error('Failed to sync auth state:', error);
      
      // Return default state on error
      const defaultState: AuthState = {
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      };
      
      await AuthStorage.saveAuthState(defaultState);
      return defaultState;
    }
  }

  /**
   * Sign in user
   */
  static async signIn(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      // Sync state after successful sign in
      await this.syncAuthState();
      
      return { success: true };
    } catch (error) {
      console.error('Sign in failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign in failed' 
      };
    }
  }

  /**
   * Sign up user
   */
  static async signUp(email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> {
    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result.error) {
        return { success: false, error: result.error.message };
      }

      // Sync state after successful sign up
      await this.syncAuthState();
      
      return { success: true };
    } catch (error) {
      console.error('Sign up failed:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Sign up failed' 
      };
    }
  }

  /**
   * Sign out user
   */
  static async signOut(): Promise<void> {
    try {
      await authClient.signOut();
      await AuthStorage.clearAuthState();
    } catch (error) {
      console.error('Sign out failed:', error);
      // Clear storage even if server request fails
      await AuthStorage.clearAuthState();
    }
  }

  /**
   * Get current authentication state
   */
  static async getCurrentAuthState(): Promise<AuthState> {
    const storedState = await AuthStorage.getAuthState();
    
    if (storedState) {
      return storedState;
    }

    // If no stored state, sync with server
    return await this.syncAuthState();
  }

  /**
   * Cleanup sync interval
   */
  static cleanup(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
    this.isInitialized = false;
  }
}