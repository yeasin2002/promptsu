import { AuthSync } from '../lib/auth-sync';

export default defineBackground(() => {
	console.log("Background script initialized", { id: browser.runtime.id });

	// Initialize authentication synchronization
	AuthSync.initialize().catch(error => {
		console.error('Failed to initialize auth sync in background:', error);
	});

	// Listen for extension startup
	chrome.runtime.onStartup.addListener(() => {
		console.log('Extension started, syncing auth state...');
		AuthSync.syncAuthState().catch(error => {
			console.error('Failed to sync auth state on startup:', error);
		});
	});

	// Listen for extension install
	chrome.runtime.onInstalled.addListener(() => {
		console.log('Extension installed, initializing auth sync...');
		AuthSync.initialize().catch(error => {
			console.error('Failed to initialize auth sync on install:', error);
		});
	});

	// Listen for messages from content scripts or popup
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.type === 'SYNC_AUTH') {
			AuthSync.syncAuthState()
				.then(authState => {
					sendResponse({ success: true, authState });
				})
				.catch(error => {
					console.error('Failed to sync auth state:', error);
					sendResponse({ success: false, error: error.message });
				});
			return true; // Keep message channel open for async response
		}
		
		if (message.type === 'SYNC_AUTH_FROM_WEB') {
			console.log('Syncing auth state from web app:', message.data);
			AuthSync.syncAuthState()
				.then(authState => {
					sendResponse({ success: true, authState });
				})
				.catch(error => {
					console.error('Failed to sync auth state from web:', error);
					sendResponse({ success: false, error: error.message });
				});
			return true;
		}
		
		if (message.type === 'SIGN_OUT') {
			AuthSync.signOut()
				.then(() => {
					sendResponse({ success: true });
				})
				.catch(error => {
					console.error('Failed to sign out:', error);
					sendResponse({ success: false, error: error.message });
				});
			return true;
		}
	});

	// Cleanup on extension shutdown
	chrome.runtime.onSuspend.addListener(() => {
		console.log('Extension suspending, cleaning up...');
		AuthSync.cleanup();
	});

	// Set uninstall URL
	// browser.runtime.setUninstallURL("http://localhost:3001/extension-uninstall");
});
