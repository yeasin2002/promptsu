import { useEffect, useState } from "react";
import type { AuthState } from "../lib/auth-client";
import { defaultAuthState } from "../lib/auth-client";

export interface UseAuthReturn {
	authState: AuthState;
	isLoading: boolean;
	login: (
		email: string,
		password: string,
	) => Promise<{ success: boolean; error?: string }>;
	register: (
		email: string,
		password: string,
		name?: string,
	) => Promise<{ success: boolean; error?: string }>;
	logout: () => Promise<void>;
	refreshSession: () => Promise<boolean>;
	isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
	const [authState, setAuthState] = useState<AuthState>(defaultAuthState);
	const [isLoading, setIsLoading] = useState(true);

	// Initialize auth state
	useEffect(() => {
		const initializeAuth = async () => {
			try {
				const response = await browser.runtime.sendMessage({
					type: "GET_AUTH_STATE",
				});
				if (response && !response.error) {
					setAuthState(response);
				}
			} catch (error) {
				console.error("Failed to initialize auth state:", error);
			} finally {
				setIsLoading(false);
			}
		};

		initializeAuth();
	}, []);

	// Listen for auth state changes
	useEffect(() => {
		const handleMessage = (message: any) => {
			if (message.type === "AUTH_STATE_CHANGED") {
				// Refresh auth state when storage changes
				browser.runtime
					.sendMessage({ type: "GET_AUTH_STATE" })
					.then((response) => {
						if (response && !response.error) {
							setAuthState(response);
						}
					})
					.catch(console.error);
			}
		};

		browser.runtime.onMessage.addListener(handleMessage);

		return () => {
			browser.runtime.onMessage.removeListener(handleMessage);
		};
	}, []);

	const login = async (
		email: string,
		password: string,
	): Promise<{ success: boolean; error?: string }> => {
		setIsLoading(true);
		try {
			const response = await browser.runtime.sendMessage({
				type: "LOGIN",
				email,
				password,
			});

			if (response.success) {
				// Refresh auth state after successful login
				const newAuthState = await browser.runtime.sendMessage({
					type: "GET_AUTH_STATE",
				});
				if (newAuthState && !newAuthState.error) {
					setAuthState(newAuthState);
				}
			}

			return response;
		} catch (error) {
			console.error("Login error:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Login failed",
			};
		} finally {
			setIsLoading(false);
		}
	};

	const register = async (
		email: string,
		password: string,
		name?: string,
	): Promise<{ success: boolean; error?: string }> => {
		setIsLoading(true);
		try {
			const response = await browser.runtime.sendMessage({
				type: "REGISTER",
				email,
				password,
				name,
			});

			if (response.success) {
				// Refresh auth state after successful registration
				const newAuthState = await browser.runtime.sendMessage({
					type: "GET_AUTH_STATE",
				});
				if (newAuthState && !newAuthState.error) {
					setAuthState(newAuthState);
				}
			}

			return response;
		} catch (error) {
			console.error("Registration error:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : "Registration failed",
			};
		} finally {
			setIsLoading(false);
		}
	};

	const logout = async (): Promise<void> => {
		setIsLoading(true);
		try {
			await browser.runtime.sendMessage({ type: "LOGOUT" });
			setAuthState(defaultAuthState);
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const refreshSession = async (): Promise<boolean> => {
		try {
			const response = await browser.runtime.sendMessage({
				type: "REFRESH_SESSION",
			});

			if (response.success) {
				// Refresh auth state after successful refresh
				const newAuthState = await browser.runtime.sendMessage({
					type: "GET_AUTH_STATE",
				});
				if (newAuthState && !newAuthState.error) {
					setAuthState(newAuthState);
				}
			}

			return response.success;
		} catch (error) {
			console.error("Session refresh error:", error);
			return false;
		}
	};

	return {
		authState,
		isLoading,
		login,
		register,
		logout,
		refreshSession,
		isAuthenticated: authState.isAuthenticated,
	};
};