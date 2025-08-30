// Content script for syncing authentication between web app and extension

export default defineContentScript({
	matches: [
		"http://localhost:3001/*", // Development
		"https://your-domain.com/*", // Production - replace with your actual domain
	],
	main() {
		console.log("Auth sync content script loaded");

		// Function to extract session data from web app
		const extractWebSessionData = async (): Promise<any> => {
			try {
				// Method 1: Try to get session from Better Auth client if available
				if (window.__BETTER_AUTH_SESSION__) {
					return window.__BETTER_AUTH_SESSION__;
				}

				// Method 2: Try to call the web app's auth client directly
				if (window.authClient?.session) {
					const session = await window.authClient.session();
					return session.data;
				}

				// Method 3: Check for session in localStorage/sessionStorage
				const storedSession =
					localStorage.getItem("better-auth-session") ||
					sessionStorage.getItem("better-auth-session");
				if (storedSession) {
					return JSON.parse(storedSession);
				}

				// Method 4: Make a direct API call to check session
				const response = await fetch("/api/auth/session", {
					credentials: "include",
				});

				if (response.ok) {
					return await response.json();
				}

				return null;
			} catch (error) {
				console.error("Failed to extract web session data:", error);
				return null;
			}
		};

		// Function to sync session with extension
		const syncSessionWithExtension = async () => {
			try {
				const sessionData = await extractWebSessionData();

				// Send session data to background script
				await browser.runtime.sendMessage({
					type: "SYNC_WEB_SESSION",
					sessionData,
				});

				console.log("Session synced with extension:", !!sessionData);
			} catch (error) {
				console.error("Failed to sync session with extension:", error);
			}
		};

		// Initial sync when content script loads
		syncSessionWithExtension();

		// Listen for auth state changes in the web app
		const observeAuthChanges = () => {
			// Method 1: Listen for storage events
			window.addEventListener("storage", (event) => {
				if (event.key?.includes("auth") || event.key?.includes("session")) {
					syncSessionWithExtension();
				}
			});

			// Method 2: Listen for custom auth events from web app
			window.addEventListener("auth-state-changed", () => {
				syncSessionWithExtension();
			});

			// Method 3: Observe DOM changes that might indicate auth state changes
			const observer = new MutationObserver((mutations) => {
				mutations.forEach((mutation) => {
					// Look for changes that might indicate login/logout
					if (mutation.type === "childList") {
						const addedNodes = Array.from(mutation.addedNodes);
						const removedNodes = Array.from(mutation.removedNodes);

						// Check if login/logout related elements were added/removed
						const authRelatedChange = [...addedNodes, ...removedNodes].some(
							(node) => {
								if (node.nodeType === Node.ELEMENT_NODE) {
									const element = node as Element;
									return (
										element.querySelector("[data-auth]") ||
										element.classList.contains("auth-") ||
										element.id?.includes("auth")
									);
								}
								return false;
							},
						);

						if (authRelatedChange) {
							setTimeout(syncSessionWithExtension, 1000); // Debounce
						}
					}
				});
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		};

		// Start observing after DOM is ready
		if (document.readyState === "loading") {
			document.addEventListener("DOMContentLoaded", observeAuthChanges);
		} else {
			observeAuthChanges();
		}

		// Periodic sync (every 30 seconds) as fallback
		setInterval(syncSessionWithExtension, 30000);

		// Listen for messages from extension popup/background
		browser.runtime.onMessage.addListener((message) => {
			if (message.type === "REQUEST_SESSION_SYNC") {
				syncSessionWithExtension();
			}
		});
	},
});

// Extend window interface for TypeScript
declare global {
	interface Window {
		__BETTER_AUTH_SESSION__?: any;
		authClient?: any;
	}
}