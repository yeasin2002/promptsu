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

// Export server URL for debugging
export const SERVER_URL = getServerUrl();
