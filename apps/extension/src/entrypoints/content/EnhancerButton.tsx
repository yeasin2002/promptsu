import { CONTENT_SCRIPT_CONFIG } from '@/config/content-script';
import React, { useCallback, useState } from 'react';

interface EnhancerButtonProps {
    onEnhance?: (originalText: string, enhancedText: string) => void;
}

export const EnhancerButton: React.FC<EnhancerButtonProps> = ({ onEnhance }) => {
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [lastEnhanced, setLastEnhanced] = useState<string>('');

    const findEditor = useCallback((): HTMLElement | null => {
        return document.querySelector("#prompt-textarea.ProseMirror") as HTMLElement;
    }, []);

    const getCurrentText = useCallback((editor: HTMLElement): string => {
        return editor.textContent?.trim() || "";
    }, []);

    const updateEditor = useCallback((editor: HTMLElement, enhancedText: string) => {
        editor.focus();
        editor.innerHTML = "";

        const paragraph = document.createElement("p");
        paragraph.textContent = enhancedText;
        editor.appendChild(paragraph);

        // Set cursor to end
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(paragraph);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);

        // Trigger events
        const inputEvent = new Event("input", { bubbles: true });
        const changeEvent = new Event("change", { bubbles: true });
        editor.dispatchEvent(inputEvent);
        editor.dispatchEvent(changeEvent);
    }, []);

    const getEnhancedText = useCallback(async (currentText: string): Promise<string> => {
        try {
            // Try to use tRPC for enhancement
            // Uncomment and modify this when your tRPC endpoint is ready
            // const result = await trpc.enhancePrompts.mutate({ prompt: currentText });
            // return result.enhancedPrompt;

            // Fallback: double the text for now
            return `${currentText} ${currentText}`;
        } catch (error) {
            console.error("tRPC enhancement failed, using fallback:", error);
            return `${currentText} ${currentText}`;
        }
    }, []);

    const handleEnhanceClick = useCallback(async () => {
        if (isEnhancing) return;

        const editor = findEditor();
        if (!editor) {
            console.log("Editor not found");
            return;
        }

        const currentText = getCurrentText(editor);
        if (!currentText) {
            console.log("No text to enhance");
            return;
        }

        try {
            setIsEnhancing(true);
            const enhancedText = await getEnhancedText(currentText);

            updateEditor(editor, enhancedText);
            setLastEnhanced(enhancedText);

            onEnhance?.(currentText, enhancedText);
            console.log("Prompt enhanced:", enhancedText);
        } catch (error) {
            console.error("Error enhancing prompt:", error);
        } finally {
            setIsEnhancing(false);
        }
    }, [isEnhancing, findEditor, getCurrentText, getEnhancedText, updateEditor, onEnhance]);

    return (
        <button
            type="button"
            className={CONTENT_SCRIPT_CONFIG.UI.BUTTON_CLASSES.join(" ")}
            aria-label="Enhance prompt"
            onClick={handleEnhanceClick}
            disabled={isEnhancing}
        >
            {isEnhancing ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="3" opacity="0.4">
                        <animate attributeName="r" values="3;6;3" dur="1s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1s" repeatCount="indefinite" />
                    </circle>
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1024 1024">
                    <path fill="currentColor" d="M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7M378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211z" />
                </svg>
            )}
        </button>
    );
};