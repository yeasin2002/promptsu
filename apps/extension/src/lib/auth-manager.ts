import type { AuthState } from "./auth-client";
import {
	authClient,
	clearAuthState,
	defaultAuthState,
	getStoredAuthState,
	isTokenExpired,
	storeAuthState,
} from "./auth-client";

export class AuthManager {
	private static instance: AuthManager;
	private authState: AuthState = defaultAuthState;
	private listeners: Set<(state: AuthState) => void> = new Set();
	private refreshPromise: Promise<boolean> | null = null;

	private constructor() {
		this.initialize();
	}

	public static getInstance(): AuthManager {
		if (!AuthManager.instance) {
			AuthManager.instance = new AuthManager();
		}
		return AuthManager.instance;
	}

	private async initialize(): Promise<void> {
		try {
			this.authState = await getStoredAuthState();

			// Check if token needs refresh on initialization
			if (
				this.authState.isAuthenticated &&
				isTokenExpired(this.authState.expiresAt)
			) {
				await this.refreshSession();
			}
		} catch (error) {
			console.error("Failed to initialize auth manager:", error);
			await this.logout();
		}
	}

	// Subscribe to auth state changes
	public subscribe(listener: (state: AuthState) => void): () => void {
		this.listeners.add(listener);
		// Immediately call with current state
		listener(this.authState);

		return () => {
			this.listeners.delete(listener);
		};
	}

	private notifyListeners(): void {
		this.listeners.forEach((listener) => listener(this.authState));
	}

	// Get current auth state
	public getAuthState(): AuthState {
		return { ...this.authState };
	}

	// Check if user is authenticated
	public isAuthenticated(): boolean {
		return (
			this.authState.isAuthenticated &&
			this.authState.accessToken !== null &&
			!isTokenExpired(this.authState.expiresAt)
		);
	}

	// Login with email and password
	public async login(
		email: string,
		password: string,
	): Promise<{ success: boolean; error?: string }> {
		try {
			const result = await authClient.signIn.email({
				email,
				password,
			});

			if (result.error) {
				return { success: false, error: result.error.message };
			}

			if (result.data) {
				await this.handleAuthSuccess(result.data);
				return { success: true };
			}

			return { success: false, error: "Unknown error occurred" };
		} catch (error) {
			console.error("Login failed:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Login failed",
			};
		}
	}

	// Register new user
	public async register(
		email: string,
		password: string,
		name?: string,
	): Promise<{ success: boolean; error?: string }> {
		try {
			const result = await authClient.signUp.email({
				email,
				password,
				name,
			});

			if (result.error) {
				return { success: false, error: result.error.message };
			}

			if (result.data) {
				await this.handleAuthSuccess(result.data);
				return { success: true };
			}

			return { success: false, error: "Unknown error occurred" };
		} catch (error) {
			console.error("Registration failed:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Registration failed",
			};
		}
	}

	// Handle successful authentication
	private async handleAuthSuccess(authData: any): Promise<void> {
		const newAuthState: AuthState = {
			isAuthenticated: true,
			user: authData.user,
			accessToken: authData.token || authData.accessToken,
			refreshToken: authData.refreshToken,
			expiresAt: authData.expiresAt
				? new Date(authData.expiresAt).getTime()
				: Date.now() + 24 * 60 * 60 * 1000, // 24 hours default
		};

		this.authState = newAuthState;
		await storeAuthState(newAuthState);
		this.notifyListeners();
	}

	// Refresh session
	public async refreshSession(): Promise<boolean> {
		// Prevent multiple simultaneous refresh attempts
		if (this.refreshPromise) {
			return this.refreshPromise;
		}

		this.refreshPromise = this.performRefresh();
		const result = await this.refreshPromise;
		this.refreshPromise = null;

		return result;
	}

	private async performRefresh(): Promise<boolean> {
		try {
			if (!this.authState.refreshToken) {
				await this.logout();
				return false;
			}

			// Use Better Auth's session refresh
			const result = await authClient.session();

			if (result.error || !result.data) {
				await this.logout();
				return false;
			}

			await this.handleAuthSuccess(result.data);
			return true;
		} catch (error) {
			console.error("Session refresh failed:", error);
			await this.logout();
			return false;
		}
	}

	// Logout
	public async logout(): Promise<void> {
		try {
			// Call server logout if we have a session
			if (this.authState.isAuthenticated) {
				await authClient.signOut();
			}
		} catch (error) {
			console.error("Server logout failed:", error);
		} finally {
			// Always clear local state
			this.authState = defaultAuthState;
			await clearAuthState();
			this.notifyListeners();
		}
	}

	// Get access token for API calls
	public async getAccessToken(): Promise<string | null> {
		if (!this.authState.accessToken) {
			return null;
		}

		// Check if token needs refresh
		if (isTokenExpired(this.authState.expiresAt)) {
			const refreshed = await this.refreshSession();
			if (!refreshed) {
				return null;
			}
		}

		return this.authState.accessToken;
	}

	// Sync with web app session (called from content script)
	public async syncWithWebSession(sessionData: any): Promise<void> {
		try {
			if (sessionData && sessionData.user) {
				await this.handleAuthSuccess(sessionData);
			} else {
				await this.logout();
			}
		} catch (error) {
			console.error("Failed to sync with web session:", error);
		}
	}
}

// Export singleton instance
export const authManager = AuthManager.getInstance();