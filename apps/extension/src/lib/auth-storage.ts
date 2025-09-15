import type { AuthState } from './auth-client';

const AUTH_STORAGE_KEY = 'promptsu_auth_state';

export class AuthStorage {
  /**
   * Save authentication state to Chrome storage
   */
  static async saveAuthState(authState: AuthState): Promise<void> {
    try {
      await browser.storage.local.set({
        [AUTH_STORAGE_KEY]: {
          ...authState,
          timestamp: Date.now(),
        },
      });
    } catch (error) {
      console.error('Failed to save auth state:', error);
    }
  }

  /**
   * Get authentication state from Chrome storage
   */
  static async getAuthState(): Promise<AuthState | null> {
    try {
      const result = await browser.storage.local.get(AUTH_STORAGE_KEY);
      const storedState = result[AUTH_STORAGE_KEY];
      
      if (!storedState) {
        return null;
      }

      // Check if the stored state is not too old (24 hours)
      const isExpired = Date.now() - storedState.timestamp > 24 * 60 * 60 * 1000;
      if (isExpired) {
        await this.clearAuthState();
        return null;
      }

      return {
        user: storedState.user,
        session: storedState.session,
        isAuthenticated: storedState.isAuthenticated,
        isLoading: false,
      };
    } catch (error) {
      console.error('Failed to get auth state:', error);
      return null;
    }
  }

  /**
   * Clear authentication state from Chrome storage
   */
  static async clearAuthState(): Promise<void> {
    try {
      await browser.storage.local.remove(AUTH_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear auth state:', error);
    }
  }

  /**
   * Listen for auth state changes
   */
  static onAuthStateChange(callback: (authState: AuthState | null) => void): () => void {
    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes[AUTH_STORAGE_KEY]) {
        const newValue = changes[AUTH_STORAGE_KEY].newValue;
        if (newValue) {
          callback({
            user: newValue.user,
            session: newValue.session,
            isAuthenticated: newValue.isAuthenticated,
            isLoading: false,
          });
        } else {
          callback(null);
        }
      }
    };

    browser.storage.onChanged.addListener(listener);
    
    // Return cleanup function
    return () => {
      browser.storage.onChanged.removeListener(listener);
    };
  }
}