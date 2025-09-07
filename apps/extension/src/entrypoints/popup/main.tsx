import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import "../../assets/tailwind.css";
import App from "./App.tsx";

// biome-ignore lint/style/noNonNullAssertion: <>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Toaster position="bottom-center" />
		<App />
	</React.StrictMode>,
);
