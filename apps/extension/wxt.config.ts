import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
	modules: ["@wxt-dev/module-react"],
	outDir: "dist",
	srcDir: "src",

	manifest: {
		permissions: ["storage", "activeTab"],
		host_permissions: [
			"http://localhost:3000/*", // Development server
			"http://localhost:3001/*", // Development web app
			"https://your-domain.com/*", // Production - replace with your actual domain
		],
		content_security_policy: {
			extension_pages: "script-src 'self'; object-src 'self';",
		},
	},

	vite: () => ({
		plugins: [tailwindcss()],
		server: {
			cors: false,
		},
		define: {
			// Ensure environment variables are available
			"import.meta.env.VITE_SERVER_URL": JSON.stringify(
				process.env.VITE_SERVER_URL || "http://localhost:3000",
			),
		},
	}),
});
