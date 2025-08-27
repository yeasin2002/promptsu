import ReactDOM from 'react-dom/client';
import '../assets/tailwind.css';
import { EnhancerButton } from './content/EnhancerButton';

export default defineContentScript({
    matches: ["*://chatgpt.com/*", "*://chat.openai.com/*"],
    cssInjectionMode: 'ui',
    async main(ctx) {
        console.log("React Prompt Enhancer extension loaded");

        // Create UI using shadow root for better isolation
        const ui = await createShadowRootUi(ctx, {
            name: 'prompt-enhancer-ui',
            position: 'inline',
            anchor: () => {
                // Find the trailing area where buttons are located
                const trailingArea = document.querySelector(
                    '[data-testid="composer-speech-button-container"]'
                )?.parentElement;
                return trailingArea;
            },
            onMount: (container) => {
                // Create React root and render component
                const root = ReactDOM.createRoot(container);
                root.render(
                    <EnhancerButton
                        onEnhance={(original, enhanced) => {
                            console.log('Enhancement completed:', { original, enhanced });
                        }}
                    />
                );
                return root;
            },
            onRemove: (root) => {
                root?.unmount();
            },
        });

        // Function to mount the UI when the target area is available
        const mountUI = () => {
            const trailingArea = document.querySelector(
                '[data-testid="composer-speech-button-container"]'
            )?.parentElement;

            if (trailingArea && !document.querySelector('[data-wxt-shadow-root="prompt-enhancer-ui"]')) {
                // Position the UI before the speech button
                const speechContainer = trailingArea.querySelector(
                    '[data-testid="composer-speech-button-container"]'
                );

                if (speechContainer) {
                    ui.mount();
                    console.log('React Enhancer UI mounted');
                }
            }
        };

        // Initial mount attempt
        setTimeout(mountUI, 1000);

        // Watch for DOM changes to mount UI when needed
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    setTimeout(mountUI, 100);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // Cleanup on context invalidation
        ctx.onInvalidated(() => {
            observer.disconnect();
            ui.remove();
        });
    },
});