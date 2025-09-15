---
title: Authentication Sync Between Web App and Browser Extension
description: This guide implements seamless authentication synchronization between your Next.js web app and WXT browser extension using better-auth, ensuring users stay logged in across both platforms.
---

## Architecture

```
Web App (localhost:3001) ←→ Browser Extension
            ↓
    Backend API (localhost:3000)
```

## 1. Browser Extension Setup (WXT)

### `wxt.config.ts`

```typescript
import { defineConfig } from "wxt";

export default defineConfig({
  extensionApi: "chrome",
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: ["storage", "activeTab", "cookies", "identity"],
    host_permissions: ["http://localhost:3000/*", "http://localhost:3001/*"],
    content_security_policy: {
      extension_pages: "script-src 'self'; object-src 'self';",
    },
  },
});
```

### `entrypoints/background.ts`

```typescript
import { browser } from "wxt/browser";

// Types
interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  sessionToken: string | null;
}

class AuthSyncManager {
  private static instance: AuthSyncManager;
  private authState: AuthState = {
    isAuthenticated: false,
    user: null,
    sessionToken: null,
  };

  static getInstance(): AuthSyncManager {
    if (!AuthSyncManager.instance) {
      AuthSyncManager.instance = new AuthSyncManager();
    }
    return AuthSyncManager.instance;
  }

  async initialize() {
    // Load initial auth state from storage
    const stored = await browser.storage.local.get(["authState"]);
    if (stored.authState) {
      this.authState = stored.authState;
    }

    // Listen for storage changes (from web app)
    browser.storage.onChanged.addListener(this.handleStorageChange.bind(this));

    // Listen for cookie changes
    browser.cookies.onChanged.addListener(this.handleCookieChange.bind(this));

    // Check initial session
    await this.checkSession();

    // Periodic session validation
    setInterval(() => this.checkSession(), 30000); // Every 30 seconds
  }

  private async handleStorageChange(changes: any, areaName: string) {
    if (areaName === "local" && changes.authState) {
      this.authState = changes.authState.newValue || {
        isAuthenticated: false,
        user: null,
        sessionToken: null,
      };

      // Notify all extension pages
      this.broadcastAuthState();
    }
  }

  private async handleCookieChange(changeInfo: any) {
    // Monitor better-auth session cookies
    if (
      changeInfo.cookie.name.includes("better-auth") ||
      changeInfo.cookie.name.includes("session")
    ) {
      await this.checkSession();
    }
  }

  async checkSession() {
    try {
      // Get session cookie from web app domain
      const cookies = await browser.cookies.getAll({
        url: "http://localhost:3001",
      });

      const sessionCookie = cookies.find(
        (cookie) =>
          cookie.name.includes("better-auth") || cookie.name.includes("session")
      );

      if (sessionCookie) {
        // Validate session with backend
        const response = await fetch("http://localhost:3000/api/auth/session", {
          headers: {
            Cookie: `${sessionCookie.name}=${sessionCookie.value}`,
          },
        });

        if (response.ok) {
          const sessionData = await response.json();
          await this.updateAuthState({
            isAuthenticated: true,
            user: sessionData.user,
            sessionToken: sessionCookie.value,
          });
        } else {
          await this.clearAuthState();
        }
      } else {
        await this.clearAuthState();
      }
    } catch (error) {
      console.error("Session check failed:", error);
      await this.clearAuthState();
    }
  }

  async updateAuthState(newState: AuthState) {
    this.authState = newState;
    await browser.storage.local.set({ authState: newState });
    this.broadcastAuthState();
  }

  async clearAuthState() {
    await this.updateAuthState({
      isAuthenticated: false,
      user: null,
      sessionToken: null,
    });
  }

  private broadcastAuthState() {
    // Send message to all extension contexts
    browser.runtime
      .sendMessage({
        type: "AUTH_STATE_CHANGED",
        payload: this.authState,
      })
      .catch(() => {
        // Ignore errors if no listeners
      });
  }

  getAuthState(): AuthState {
    return this.authState;
  }
}

// Initialize on background script load
export default defineBackground(() => {
  const authManager = AuthSyncManager.getInstance();
  authManager.initialize();

  // Handle messages from popup/content scripts
  browser.runtime.onMessage.addListener(async (message, sender) => {
    switch (message.type) {
      case "GET_AUTH_STATE":
        return authManager.getAuthState();

      case "FORCE_SESSION_CHECK":
        await authManager.checkSession();
        return authManager.getAuthState();

      case "LOGOUT":
        await authManager.clearAuthState();
        // Clear cookies
        const cookies = await browser.cookies.getAll({
          url: "http://localhost:3001",
        });
        for (const cookie of cookies) {
          if (
            cookie.name.includes("better-auth") ||
            cookie.name.includes("session")
          ) {
            await browser.cookies.remove({
              url: "http://localhost:3001",
              name: cookie.name,
            });
          }
        }
        return { success: true };

      default:
        return null;
    }
  });
});
```

### `entrypoints/popup/main.tsx`

```tsx
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { browser } from "wxt/browser";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  sessionToken: string | null;
}

const App: React.FC = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    sessionToken: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeAuth();

    // Listen for auth state changes
    const messageListener = (message: any) => {
      if (message.type === "AUTH_STATE_CHANGED") {
        setAuthState(message.payload);
      }
    };

    browser.runtime.onMessage.addListener(messageListener);

    return () => {
      browser.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  const initializeAuth = async () => {
    try {
      const state = await browser.runtime.sendMessage({
        type: "GET_AUTH_STATE",
      });
      setAuthState(state);
    } catch (error) {
      console.error("Failed to get auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const state = await browser.runtime.sendMessage({
        type: "FORCE_SESSION_CHECK",
      });
      setAuthState(state);
    } catch (error) {
      console.error("Failed to refresh auth state:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await browser.runtime.sendMessage({ type: "LOGOUT" });
      // Optionally redirect to web app logout
      browser.tabs.create({
        url: "http://localhost:3001/logout",
      });
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const openWebApp = () => {
    browser.tabs.create({
      url: authState.isAuthenticated
        ? "http://localhost:3001/dashboard"
        : "http://localhost:3001/login",
    });
  };

  if (loading) {
    return (
      <div className="p-4 w-80">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="p-4 w-80">
      <div className="mb-4">
        <h2 className="text-lg font-bold">Your App Extension</h2>
      </div>

      {authState.isAuthenticated ? (
        <div className="space-y-4">
          <div className="p-3 bg-green-50 border border-green-200 rounded">
            <div className="text-sm text-green-800">
              ✅ Logged in as {authState.user?.name || authState.user?.email}
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={openWebApp}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Open Dashboard
            </button>

            <button
              onClick={handleRefresh}
              className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Refresh Status
            </button>

            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
            <div className="text-sm text-yellow-800">⚠️ Not logged in</div>
          </div>

          <div className="space-y-2">
            <button
              onClick={openWebApp}
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Login to Web App
            </button>

            <button
              onClick={handleRefresh}
              className="w-full p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Check Login Status
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Mount the app
const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
```

### `entrypoints/content.ts`

```typescript
import { browser } from "wxt/browser";

export default defineContentScript({
  matches: ["http://localhost:3001/*"],
  main() {
    // Listen for auth changes in the web app
    const handleAuthChange = () => {
      // Force background script to check session
      browser.runtime.sendMessage({ type: "FORCE_SESSION_CHECK" });
    };

    // Monitor for login/logout actions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          // Check if URL changed (SPA navigation)
          if (
            window.location.pathname.includes("/login") ||
            window.location.pathname.includes("/logout") ||
            window.location.pathname.includes("/dashboard")
          ) {
            setTimeout(handleAuthChange, 1000); // Delay to allow session to update
          }
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Listen for storage events (localStorage changes)
    window.addEventListener("storage", (e) => {
      if (e.key && (e.key.includes("auth") || e.key.includes("session"))) {
        handleAuthChange();
      }
    });

    // Initial check
    setTimeout(handleAuthChange, 1000);
  },
});
```

## 2. Web App Integration (Next.js)

### `lib/auth-sync.ts`

```typescript
"use client";

import { useEffect } from "react";

// Hook to notify extension of auth changes
export const useAuthSync = (isAuthenticated: boolean, user: any) => {
  useEffect(() => {
    // Store auth state in localStorage for extension to read
    const authState = {
      isAuthenticated,
      user,
      timestamp: Date.now(),
    };

    localStorage.setItem("extension-auth-state", JSON.stringify(authState));

    // Dispatch custom event for real-time updates
    window.dispatchEvent(
      new CustomEvent("authStateChanged", {
        detail: authState,
      })
    );
  }, [isAuthenticated, user]);
};
```

### Update your login/register pages

```tsx
// In your login/register pages
import { useAuthSync } from '@/lib/auth-sync';
import { useSession } from 'better-auth/react'; // or however you access session

export default function LoginPage() {
  const { data: session } = useSession();

  // Sync auth state with extension
  useAuthSync(!!session, session?.user);

  // Your existing login component
  return (
    // ... your login form
  );
}
```

## 3. Backend API Enhancement

### Add session validation endpoint

```typescript
// In your Hono backend (e.g., routes/auth.ts)
import { auth } from "../auth-config"; // your better-auth instance

app.get("/api/auth/session", async (c) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.headers,
    });

    if (session) {
      return c.json({
        user: session.user,
        session: session.session,
      });
    } else {
      return c.json({ error: "No active session" }, 401);
    }
  } catch (error) {
    return c.json({ error: "Session validation failed" }, 500);
  }
});
```

## 4. Security Considerations

1. **HTTPS in Production**: Always use HTTPS in production
2. **Cookie Security**: Configure better-auth cookies with proper security flags
3. **Token Validation**: Always validate sessions server-side
4. **Permission Scope**: Limit extension permissions to necessary domains
5. **Content Security Policy**: Implement proper CSP headers

## 5. Testing the Sync

1. Start your backend (`localhost:3000`)
2. Start your web app (`localhost:3001`)
3. Build and load your extension
4. Login on the web app
5. Check the extension popup - should show logged in state
6. Logout from web app - extension should reflect the change

## 6. Troubleshooting

- **Extension not detecting login**: Check console for CORS issues
- **Session validation failing**: Verify cookie domain and path settings
- **Sync delays**: Adjust polling intervals or add more event listeners
- **Storage permissions**: Ensure proper manifest permissions

This implementation provides robust, real-time authentication synchronization between your web app and browser extension while maintaining security best practices.
