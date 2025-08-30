// Helper functions to sync authentication state with browser extension

export const notifyExtensionAuthChange = (authData?: any) => {
  // Dispatch custom event that the extension content script can listen to
  const event = new CustomEvent('auth-state-changed', {
    detail: authData,
  });
  window.dispatchEvent(event);

  // Also store in a global variable that the extension can access
  (window as any).__BETTER_AUTH_SESSION__ = authData;
};

export const clearExtensionAuthState = () => {
  notifyExtensionAuthChange(null);
};

// Hook to automatically sync auth state changes
export const useExtensionSync = (authState: any) => {
  // Notify extension whenever auth state changes
  React.useEffect(() => {
    if (authState) {
      notifyExtensionAuthChange(authState);
    } else {
      clearExtensionAuthState();
    }
  }, [authState]);
};