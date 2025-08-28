import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { trpcAppRouter } from "../../../server/src/routers";

// Get server URL with fallback
const getServerUrl = () => {
	const url = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
	return url.endsWith("/") ? url.slice(0, -1) : url;
};

export const trpc = createTRPCProxyClient<trpcAppRouter>({
	links: [
		httpBatchLink({
			url: `${getServerUrl()}/trpc`,
			headers: () => {
				return {
					"Content-Type": "application/json",
					// Add any auth headers if needed
					// 'Authorization': `Bearer ${getAuthToken()}`,
				};
			},
			fetch: (url, options) => {
				// Custom fetch with better error handling for extension context
				return fetch(url, {
					...options,
					mode: "cors",
					credentials: "omit", // Don't send cookies in extension context
				}).catch((error) => {
					console.error("tRPC fetch error:", error);
					throw new Error(`Network error: ${error.message}`);
				});
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
