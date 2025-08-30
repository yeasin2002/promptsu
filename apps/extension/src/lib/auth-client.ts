import { createAuthClient } from "better-auth/react";

// Extension-specific auth client configuration
export const authClient = createAuthClient({
	baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:3000",
	// Disable automatic cookie handling since extensions can't access httpOnly cookies
	fetchOptions: {
		credentials: "omit",
	},
});

// Auth state management for extension
export interface AuthState {
	isAuthenticated: boolean;
	user: any | null;
	accessToken: string | null;
	refreshToken: string | null;
	expiresAt: number | null;
}

export const defaultAuthState: AuthState = {
	isAuthenticated: false,
	user: null,
	accessToken: null,
	refreshToken: null,
	expiresAt: null,
};

// Storage keys for extension auth data
export const AUTH_STORAGE_KEYS = {
	AUTH_STATE: "auth_state",
	ACCESS_TOKEN: "access_token",
	REFRESH_TOKEN: "refresh_token",
	USER_DATA: "user_data",
	EXPIRES_AT: "expires_at",
} as const;

// Helper to check if token is expired
export const isTokenExpired = (expiresAt: number | null): boolean => {
	if (!expiresAt) return true;
	return Date.now() >= expiresAt - 60000; // 1 minute buffer
};

// Helper to get stored auth state
export const getStoredAuthState = async (): Promise<AuthState> => {
	try {
		const result = await browser.storage.local.get([
			AUTH_STORAGE_KEYS.AUTH_STATE,
			AUTH_STORAGE_KEYS.ACCESS_TOKEN,
			AUTH_STORAGE_KEYS.REFRESH_TOKEN,
			AUTH_STORAGE_KEYS.USER_DATA,
			AUTH_STORAGE_KEYS.EXPIRES_AT,
		]);

		return {
			isAuthenticated: result[AUTH_STORAGE_KEYS.AUTH_STATE] || false,
			user: result[AUTH_STORAGE_KEYS.USER_DATA] || null,
			accessToken: result[AUTH_STORAGE_KEYS.ACCESS_TOKEN] || null,
			refreshToken: result[AUTH_STORAGE_KEYS.REFRESH_TOKEN] || null,
			expiresAt: result[AUTH_STORAGE_KEYS.EXPIRES_AT] || null,
		};
	} catch (error) {
		console.error("Failed to get stored auth state:", error);
		return defaultAuthState;
	}
};

// Helper to store auth state
export const storeAuthState = async (authState: AuthState): Promise<void> => {
	try {
		await browser.storage.local.set({
			[AUTH_STORAGE_KEYS.AUTH_STATE]: authState.isAuthenticated,
			[AUTH_STORAGE_KEYS.ACCESS_TOKEN]: authState.accessToken,
			[AUTH_STORAGE_KEYS.REFRESH_TOKEN]: authState.refreshToken,
			[AUTH_STORAGE_KEYS.USER_DATA]: authState.user,
			[AUTH_STORAGE_KEYS.EXPIRES_AT]: authState.expiresAt,
		});
	} catch (error) {
		console.error("Failed to store auth state:", error);
		throw error;
	}
};

// Helper to clear auth state
export const clearAuthState = async (): Promise<void> => {
	try {
		await browser.storage.local.remove([
			AUTH_STORAGE_KEYS.AUTH_STATE,
			AUTH_STORAGE_KEYS.ACCESS_TOKEN,
			AUTH_STORAGE_KEYS.REFRESH_TOKEN,
			AUTH_STORAGE_KEYS.USER_DATA,
			AUTH_STORAGE_KEYS.EXPIRES_AT,
		]);
	} catch (error) {
		console.error("Failed to clear auth state:", error);
		throw error;
	}
};
