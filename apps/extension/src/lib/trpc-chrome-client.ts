import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { trpcAppRouter } from "../../../server/src/routers";
import { authManager } from "./auth-manager";

// Get server URL with fallback
const getServerUrl = () => {
	const url = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
	return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const trpc = createTRPCProxyClient<trpcAppRouter>({
	links: [
		httpBatchLink({
			url: `${getServerUrl()}/trpc`,
			headers: async () => {
				const headers: Record<string, string> = {
					"Content-Type": "application/json",
				};

				// Add authorization header if user is authenticated
				try {
					const accessToken = await authManager.getAccessToken();
					if (accessToken) {
						headers.Authorization = `Bearer ${accessToken}`;
					}
				} catch (error) {
					console.warn("Failed to get access token for tRPC request:", error);
				}

				return headers;
			},
			fetch: async (url, options) => {
				// Custom fetch with better error handling for extension context
				try {
					const response = await fetch(url, {
						...options,
						mode: "cors",
						credentials: "omit", // Don't send cookies in extension context
					});

					// Handle 401 Unauthorized - trigger token refresh
					if (response.status === 401) {
						console.log("Received 401, attempting to refresh session...");
						const refreshed = await authManager.refreshSession();

						if (refreshed) {
							// Retry the request with new token
							const newToken = await authManager.getAccessToken();
							const retryHeaders = { ...options?.headers };
							if (newToken) {
								retryHeaders.Authorization = `Bearer ${newToken}`;
							}

							return fetch(url, {
								...options,
								headers: retryHeaders,
								mode: "cors",
								credentials: "omit",
							});
						} else {
							// Refresh failed, user needs to re-authenticate
							throw new Error("Authentication required");
						}
					}

					return response;
				} catch (error) {
					console.error("tRPC fetch error:", error);
					throw new Error(`Network error: ${error.message}`);
				}
			},
		}),
	],
});

// Helper function to check if tRPC server is available
export const checkServerHealth = async (): Promise<boolean> => {
	try {
		const response = await fetch(`${getServerUrl()}/health`, {
			method: "GET",
			mode: "cors",
		});
		return response.ok;
	} catch (error) {
		console.warn("tRPC server health check failed:", error);
		return false;
	}
};

// Export server URL for debugging
export const SERVER_URL = getServerUrl();
