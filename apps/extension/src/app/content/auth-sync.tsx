import { WebSync } from '../../lib/web-sync';

/**
 * Content script for authentication synchronization
 * This runs on web pages to listen for auth state changes
 */
export default defineContentScript({
  matches: ['http://localhost:3001/*', 'https://your-domain.com/*'],
  main() {
    console.log('Auth sync content script loaded');
    
    // Initialize web synchronization
    WebSync.initializeWebListener();
    
    // Inject sync script into the page
    const script = document.createElement('script');
    script.textContent = `
      (function() {
        // Listen for Better Auth events
        const originalFetch = window.fetch;
        window.fetch = function(...args) {
          const promise = originalFetch.apply(this, args);
          
          // Check if this is an auth-related request
          const url = args[0];
          if (typeof url === 'string' && url.includes('/api/auth')) {
            promise.then(response => {
              if (response.ok) {
                // Trigger sync event
                window.dispatchEvent(new CustomEvent('promptsu-auth-sync', {
                  detail: {
                    type: 'AUTH_STATE_CHANGED',
                    data: { timestamp: Date.now() }
                  }
                }));
              }
            }).catch(() => {
              // Handle errors silently
            });
          }
          
          return promise;
        };
        
        // Also listen for localStorage changes (Better Auth might use this)
        const originalSetItem = localStorage.setItem;
        localStorage.setItem = function(key, value) {
          const result = originalSetItem.apply(this, arguments);
          
          if (key.includes('auth') || key.includes('session')) {
            window.dispatchEvent(new CustomEvent('promptsu-auth-sync', {
              detail: {
                type: 'AUTH_STATE_CHANGED',
                data: { key, value, timestamp: Date.now() }
              }
            }));
          }
          
          return result;
        };
        
        console.log('Promptsu auth sync injected');
      })();
    `;
    
    document.documentElement.appendChild(script);
    script.remove();
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
      WebSync.cleanup();
    });
  },
});