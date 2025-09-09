import type React from "react";
import { useCallback } from "react";
import { detectPlatform } from "@/config/platforms";
import { trpcBrowserClient } from "@/lib/trpc-chrome-client";
import { LoadingSpinner } from "./LoadingSpinner";

interface EnhancerButtonProps {
	isLoading: boolean;
	onEnhanceStart: () => void;
	onEnhanceSuccess: (originalText: string, enhancedText: string) => void;
	onEnhanceError: (error: string) => void;
}

/**
 * Enhanced button component with loading states and error handling
 * Platform-agnostic implementation that adapts to different AI interfaces
 */
export const EnhancerButton: React.FC<EnhancerButtonProps> = ({
	isLoading,
	onEnhanceStart,
	onEnhanceSuccess,
	onEnhanceError,
}) => {
	const handleClick = useCallback(async () => {
		if (isLoading) return;

		const platform = detectPlatform();
		if (!platform) {
			onEnhanceError("Unsupported platform");
			return;
		}

		const editor = document.querySelector(
			platform.selectors.editor,
		) as HTMLElement;
		if (!editor) {
			onEnhanceError("Editor not found");
			return;
		}

		const currentText = platform.textHandling.getContent(editor);
		if (!currentText) {
			onEnhanceError("No text to enhance");
			return;
		}

		try {
			onEnhanceStart();

			// Try tRPC enhancement first
			const result = await trpcBrowserClient.enhancePrompts.mutate({
				prompt: currentText,
			});
			const enhancedText = result.data || currentText;

			// Update the editor with enhanced text
			platform.textHandling.setContent(editor, enhancedText);

			// Trigger platform-specific events
			if (platform.textHandling.triggerEvents) {
				platform.textHandling.triggerEvents.forEach((eventType) => {
					editor.dispatchEvent(new Event(eventType, { bubbles: true }));
				});
			}

			onEnhanceSuccess(currentText, enhancedText);
		} catch (error) {
			console.error("Enhancement failed:", error);

			// Fallback enhancement
			try {
				const fallbackText = `${currentText} ${currentText}`;
				platform.textHandling.setContent(editor, fallbackText);

				if (platform.textHandling.triggerEvents) {
					platform.textHandling.triggerEvents.forEach((eventType) => {
						editor.dispatchEvent(new Event(eventType, { bubbles: true }));
					});
				}

				onEnhanceSuccess(currentText, fallbackText);
			} catch (_fallbackError) {
				onEnhanceError("Enhancement failed. Please try again.");
			}
		}
	}, [isLoading, onEnhanceStart, onEnhanceSuccess, onEnhanceError]);

	return (
		<button
			type="button"
			onClick={handleClick}
			disabled={isLoading}
			className="flex items-center justify-center w-9 h-9 ml-1 rounded-full border border-white/10 bg-transparent text-current transition-all duration-200 hover:bg-white/10 hover:opacity-80 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
			aria-label={isLoading ? "Enhancing prompt..." : "Enhance prompt"}
			title={isLoading ? "Enhancing prompt..." : "Enhance your prompt with AI"}
		>
			{isLoading ? (
				<LoadingSpinner size="sm" />
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 1024 1024"
					className="transition-transform duration-200 hover:scale-110"
				>
					<title>Enhance</title>
					<path
						fill="currentColor"
						d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z"
					/>
				</svg>
			)}
		</button>
	);
};
