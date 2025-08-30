import { authManager } from "../lib/auth-manager";

export default defineBackground(() => {
	console.log("Background script initialized", { id: browser.runtime.id });

	// Listen for messages from content scripts and popup
	browser.runtime.onMessage.addListener(
		async (message, sender, sendResponse) => {
			try {
				switch (message.type) {
					case "GET_AUTH_STATE":
						return authManager.getAuthState();

					case "LOGIN": {
						const loginResult = await authManager.login(
							message.email,
							message.password,
						);
						return loginResult;
					}

					case "REGISTER": {
						const registerResult = await authManager.register(
							message.email,
							message.password,
							message.name,
						);
						return registerResult;
					}

					case "LOGOUT":
						await authManager.logout();
						return { success: true };

					case "REFRESH_SESSION": {
						const refreshed = await authManager.refreshSession();
						return { success: refreshed };
					}

					case "SYNC_WEB_SESSION":
						await authManager.syncWithWebSession(message.sessionData);
						return { success: true };

					case "GET_ACCESS_TOKEN": {
						const token = await authManager.getAccessToken();
						return { token };
					}

					default:
						console.warn("Unknown message type:", message.type);
						return { error: "Unknown message type" };
				}
			} catch (error) {
				console.error("Background script error:", error);
				return {
					error: error instanceof Error ? error.message : "Unknown error",
				};
			}
		},
	);

	// Periodic session validation (every 5 minutes)
	setInterval(
		async () => {
			try {
				if (authManager.isAuthenticated()) {
					await authManager.refreshSession();
				}
			} catch (error) {
				console.error("Periodic session refresh failed:", error);
			}
		},
		5 * 60 * 1000,
	); // 5 minutes

	// Listen for storage changes to sync across extension contexts
	browser.storage.onChanged.addListener((changes, areaName) => {
		if (areaName === "local") {
			// Notify all extension contexts about auth state changes
			browser.runtime
				.sendMessage({
					type: "AUTH_STATE_CHANGED",
					changes,
				})
				.catch(() => {
					// Ignore errors if no listeners
				});
		}
	});
});
