/**
 * Web app utility to sync authentication state with browser extension
 */

export class ExtensionSync {
  private static readonly SYNC_EVENT = 'promptsu-auth-sync';
  private static readonly STORAGE_KEY = 'promptsu_web_auth_sync';

  /**
   * Notify extension about authentication state change
   */
  static notifyAuthStateChange(data?: any): void {
    try {
      // Dispatch custom event for content script
      const event = new CustomEvent(this.SYNC_EVENT, {
        detail: {
          type: 'AUTH_STATE_CHANGED',
          data: data || { timestamp: Date.now() },
        },
      });
      window.dispatchEvent(event);

      // Also use localStorage for cross-tab communication
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        type: 'AUTH_STATE_CHANGED',
        data: data || { timestamp: Date.now() },
        timestamp: Date.now(),
      }));

      // Clean up storage after a short delay
      setTimeout(() => {
        localStorage.removeItem(this.STORAGE_KEY);
      }, 1000);

    } catch (error) {
      console.error('Failed to notify extension about auth state change:', error);
    }
  }

  /**
   * Notify extension about user sign in
   */
  static notifyUserSignedIn(userData: any): void {
    try {
      const event = new CustomEvent(this.SYNC_EVENT, {
        detail: {
          type: 'USER_SIGNED_IN',
          data: userData,
        },
      });
      window.dispatchEvent(event);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        type: 'USER_SIGNED_IN',
        data: userData,
        timestamp: Date.now(),
      }));

      setTimeout(() => {
        localStorage.removeItem(this.STORAGE_KEY);
      }, 1000);

    } catch (error) {
      console.error('Failed to notify extension about user sign in:', error);
    }
  }

  /**
   * Notify extension about user sign out
   */
  static notifyUserSignedOut(): void {
    try {
      const event = new CustomEvent(this.SYNC_EVENT, {
        detail: {
          type: 'USER_SIGNED_OUT',
          data: null,
        },
      });
      window.dispatchEvent(event);

      localStorage.setItem(this.STORAGE_KEY, JSON.stringify({
        type: 'USER_SIGNED_OUT',
        data: null,
        timestamp: Date.now(),
      }));

      setTimeout(() => {
        localStorage.removeItem(this.STORAGE_KEY);
      }, 1000);

    } catch (error) {
      console.error('Failed to notify extension about user sign out:', error);
    }
  }

  /**
   * Initialize extension sync (call this in your app root)
   */
  static initialize(): void {
    // Listen for Better Auth session changes
    if (typeof window !== 'undefined') {
      // Monitor auth-related API calls
      const originalFetch = window.fetch;
      window.fetch = function(...args) {
        const promise = originalFetch.apply(this, args);
        
        const url = args[0];
        if (typeof url === 'string' && (url.includes('/api/auth') || url.includes('/auth'))) {
          promise.then(response => {
            if (response.ok) {
              // Small delay to ensure auth state is updated
              setTimeout(() => {
                ExtensionSync.notifyAuthStateChange();
              }, 100);
            }
          }).catch(() => {
            // Handle errors silently
          });
        }
        
        return promise;
      };

      console.log('Extension sync initialized');
    }
  }
}