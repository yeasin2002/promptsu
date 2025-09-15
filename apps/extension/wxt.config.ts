import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	outDir: "dist",
	srcDir: "src",
	entrypointsDir: "app",
	manifest: {
		permissions: [
			"storage",
			"activeTab",
			"scripting",
		],
		host_permissions: [
			"http://localhost:3000/*",
			"http://localhost:3001/*",
			"https://your-domain.com/*",
		],
		content_security_policy: {
			extension_pages: "script-src 'self'; object-src 'self';"
		},
	},
	vite: () => ({
		plugins: [tailwindcss()],
		server: {
			cors: false,
		},
	}),
});
