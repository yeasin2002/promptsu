import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./style.css";

// biome-ignore lint/style/noNonNullAssertion: <>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toaster position="bottom-center" />
    <App />
  </React.StrictMode>
);
