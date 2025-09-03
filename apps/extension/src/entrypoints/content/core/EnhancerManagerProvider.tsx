import type React from "react";
import { createContext, type ReactNode, useContext } from "react";
import { useAutoEnhancerManager } from "./useEnhancerManager";

/**
 * Context for sharing enhancer manager state across components
 */
interface EnhancerManagerContextType {
	initialize: () => Promise<boolean>;
	destroy: () => void;
	getPlatform: () => any;
	isReady: boolean;
	platform: any;
	isInitialized: boolean;
}

const EnhancerManagerContext = createContext<EnhancerManagerContextType | null>(
	null,
);

/**
 * Provider component for the enhancer manager
 */
export const EnhancerManagerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const manager = useAutoEnhancerManager();

	return (
		<EnhancerManagerContext.Provider value={manager}>
			{children}
		</EnhancerManagerContext.Provider>
	);
};

/**
 * Hook to access the enhancer manager context
 */
export function useEnhancerManagerContext(): EnhancerManagerContextType {
	const context = useContext(EnhancerManagerContext);

	if (!context) {
		throw new Error(
			"useEnhancerManagerContext must be used within an EnhancerManagerProvider",
		);
	}

	return context;
}
