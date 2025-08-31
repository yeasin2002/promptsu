// Helper functions to sync authentication state with browser extension

// Define types for better type safety
interface AuthData {
  user?: {
    id: string;
    email: string;
    name?: string;
  };
  session?: {
    token: string;
    expiresAt: string;
  };
  [key: string]: unknown;
}

interface ExtendedWindow extends Window {
  __BETTER_AUTH_SESSION__?: AuthData | null;
}

// Declare global window extension
declare global {
  interface Window {
    __BETTER_AUTH_SESSION__?: AuthData | null;
  }
}

export const notifyExtensionAuthChange = (authData?: AuthData | null) => {
  try {
    // Dispatch custom event that the extension content script can listen to
    const event = new CustomEvent('auth-state-changed', {
      detail: authData,
    });
    window.dispatchEvent(event);

    // Store in a global variable that the extension can access
    (window as ExtendedWindow).__BETTER_AUTH_SESSION__ = authData;

    console.log('Notified extension of auth change:', !!authData);
  } catch (error) {
    console.warn('Failed to notify extension of auth change:', error);
  }
};

export const clearExtensionAuthState = () => {
  notifyExtensionAuthChange(null);
};

// Hook to automatically sync auth state changes
export const useExtensionSync = (authState: AuthData | null) => {
  // This would need React import, but keeping it simple for now
  // You can implement this if needed in components that use it
  // Example implementation:
  // React.useEffect(() => {
  //   notifyExtensionAuthChange(authState);
  // }, [authState]);
};
