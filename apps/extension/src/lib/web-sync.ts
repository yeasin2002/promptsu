/**
 * Web-to-Extension synchronization utilities
 * This handles communication between the web app and extension
 */

export class WebSync {
  private static readonly SYNC_EVENT = 'promptsu-auth-sync';
  private static isListening = false;

  /**
   * Initialize web synchronization listener
   * This should be called from content scripts
   */
  static initializeWebListener(): void {
    if (this.isListening) return;

    // Listen for custom events from the web app
    window.addEventListener(this.SYNC_EVENT, this.handleSyncEvent);
    
    // Also listen for storage events (for same-origin communication)
    window.addEventListener('storage', this.handleStorageEvent);
    
    this.isListening = true;
    console.log('Web sync listener initialized');
  }

  /**
   * Handle sync events from web app
   */
  private static handleSyncEvent = (event: CustomEvent) => {
    const { type, data } = event.detail;
    
    switch (type) {
      case 'AUTH_STATE_CHANGED':
        this.syncAuthStateFromWeb(data);
        break;
      case 'USER_SIGNED_IN':
        this.handleUserSignedIn(data);
        break;
      case 'USER_SIGNED_OUT':
        this.handleUserSignedOut();
        break;
      default:
        console.log('Unknown sync event type:', type);
    }
  };

  /**
   * Handle storage events for cross-tab communication
   */
  private static handleStorageEvent = (event: StorageEvent) => {
    if (event.key === 'promptsu_web_auth_sync' && event.newValue) {
      try {
        const syncData = JSON.parse(event.newValue);
        this.syncAuthStateFromWeb(syncData);
      } catch (error) {
        console.error('Failed to parse storage sync data:', error);
      }
    }
  };

  /**
   * Sync authentication state from web app
   */
  private static async syncAuthStateFromWeb(authData: any): Promise<void> {
    try {
      // Send message to background script to sync auth state
      await chrome.runtime.sendMessage({
        type: 'SYNC_AUTH_FROM_WEB',
        data: authData,
      });
    } catch (error) {
      console.error('Failed to sync auth state from web:', error);
    }
  }

  /**
   * Handle user signed in from web
   */
  private static async handleUserSignedIn(userData: any): Promise<void> {
    console.log('User signed in from web:', userData);
    
    // Trigger auth sync
    try {
      await chrome.runtime.sendMessage({ type: 'SYNC_AUTH' });
    } catch (error) {
      console.error('Failed to sync auth after web sign in:', error);
    }
  }

  /**
   * Handle user signed out from web
   */
  private static async handleUserSignedOut(): Promise<void> {
    console.log('User signed out from web');
    
    // Trigger sign out in extension
    try {
      await chrome.runtime.sendMessage({ type: 'SIGN_OUT' });
    } catch (error) {
      console.error('Failed to sign out after web sign out:', error);
    }
  }

  /**
   * Cleanup web sync listener
   */
  static cleanup(): void {
    if (this.isListening) {
      window.removeEventListener(this.SYNC_EVENT, this.handleSyncEvent);
      window.removeEventListener('storage', this.handleStorageEvent);
      this.isListening = false;
    }
  }
}