import ReactDOM from "react-dom/client";
import "../../assets/tailwind.css";
import { PromptEnhancerButton } from "./components/EnhancerButton";
import { PROMPT_ENHANCER_CONFIG } from "./config";

export default defineContentScript({
	matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
	cssInjectionMode: "ui",

	async main(ctx) {
		console.log("React Prompt Enhancer extension loaded");

		const ui = await createShadowRootUi(ctx, {
			name: "prompt-enhancer-ui",
			position: "inline",
			anchor: () => {
				return document.querySelector(
					PROMPT_ENHANCER_CONFIG.selectors.trailingArea,
				)?.parentElement;
			},
			onMount: (container) => {
				const root = ReactDOM.createRoot(container);
				root.render(
					<PromptEnhancerButton
						onEnhance={(original, enhanced) => {
							if (PROMPT_ENHANCER_CONFIG.debug.logEnhancements) {
								console.log("Enhancement completed:", { original, enhanced });
							}
						}}
					/>,
				);
				return root;
			},
			onRemove: (root) => {
				root?.unmount();
			},
		});

		const mountUI = () => {
			const trailingArea = document.querySelector(
				PROMPT_ENHANCER_CONFIG.selectors.trailingArea,
			)?.parentElement;

			if (
				trailingArea &&
				!document.querySelector('[data-wxt-shadow-root="prompt-enhancer-ui"]')
			) {
				const speechContainer = trailingArea.querySelector(
					PROMPT_ENHANCER_CONFIG.selectors.trailingArea,
				);
				if (speechContainer) {
					ui.mount();
					console.log("React Enhancer UI mounted");
				}
			}
		};

		// Initial mount attempt
		setTimeout(mountUI, PROMPT_ENHANCER_CONFIG.ui.injectionDelay);

		// Watch for DOM changes
		const observer = new MutationObserver(() => {
			setTimeout(mountUI, PROMPT_ENHANCER_CONFIG.ui.observerThrottle);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		// Cleanup
		ctx.onInvalidated(() => {
			observer.disconnect();
			ui.remove();
		});
	},
});