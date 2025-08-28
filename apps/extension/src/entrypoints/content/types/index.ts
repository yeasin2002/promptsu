/**
 * Type definitions for the enhanced prompt extension
 */

export interface EnhancementState {
	isLoading: boolean;
	error: string | null;
	success: boolean;
	message: string | null;
}

export interface EnhancementOptions {
	style?: "creative" | "professional" | "casual";
	length?: "short" | "medium" | "long";
	focus?: string[];
}

export interface EnhancementRequest {
	prompt: string;
	options?: EnhancementOptions;
}

export interface EnhancementResponse {
	data: string;
	confidence?: number;
	suggestions?: string[];
}

export interface UIComponentProps {
	onEnhance: (originalText: string, enhancedText: string) => void;
	onStateChange?: (state: EnhancementState) => void;
	className?: string;
}

export interface NotificationProps {
	type: "success" | "error" | "info" | "warning";
	message: string;
	duration?: number;
	onClose?: () => void;
}

export type EnhancementStatus = "idle" | "loading" | "success" | "error";
