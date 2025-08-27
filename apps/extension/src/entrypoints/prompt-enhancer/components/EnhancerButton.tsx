import { useCallback, useState } from "react";
import { PROMPT_ENHANCER_CONFIG } from "../config";
import { DOMManager } from "../core/dom-manager";
import { EnhancementService } from "../core/enhancement-service";

interface PromptEnhancerButtonProps {
	onEnhance?: (originalText: string, enhancedText: string) => void;
}

export const PromptEnhancerButton: React.FC<PromptEnhancerButtonProps> = ({
	onEnhance,
}) => {
	const [isEnhancing, setIsEnhancing] = useState(false);

	// Initialize services
	const domManager = new DOMManager();
	const enhancementService = new EnhancementService();

	const handleEnhanceClick = useCallback(async () => {
		if (isEnhancing) return;

		const editor = domManager.findEditor();
		if (!editor) {
			console.warn("Editor not found");
			return;
		}

		const currentText = domManager.getCurrentText(editor);
		if (!currentText) {
			console.warn("No text to enhance");
			return;
		}

		try {
			setIsEnhancing(true);
			await enhancementService.initialize();
			const enhancedText = await enhancementService.enhance(currentText);

			domManager.updateEditor(editor, enhancedText);
			onEnhance?.(currentText, enhancedText);
		} catch (error) {
			console.error("Error enhancing prompt:", error);
		} finally {
			setIsEnhancing(false);
		}
	}, [isEnhancing, domManager, enhancementService, onEnhance]);

	return (
		<button
			type="button"
			className={PROMPT_ENHANCER_CONFIG.ui.buttonClasses.join(" ")}
			aria-label="Enhance prompt"
			onClick={handleEnhanceClick}
			disabled={isEnhancing}
		>
			{isEnhancing ? (
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
					<title>Enhancing...</title>
					<circle cx="12" cy="12" r="3" opacity="0.4">
						<animate
							attributeName="r"
							values="3;6;3"
							dur="1s"
							repeatCount="indefinite"
						/>
						<animate
							attributeName="opacity"
							values="0.4;0.1;0.4"
							dur="1s"
							repeatCount="indefinite"
						/>
					</circle>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					viewBox="0 0 1024 1024"
				>
					<title>Enhance prompt</title>
					<path
						fill="currentColor"
						d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z"
					/>
				</svg>
			)}
		</button>
	);
};