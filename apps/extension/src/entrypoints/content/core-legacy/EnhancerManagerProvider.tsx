import type React from "react";
import { createContext, type ReactNode, useContext } from "react";
import type { EnhancerManagerContextType } from "./types";
import { useEnhancerManager } from "./useEnhancerManager";

const EnhancerManagerContext = createContext<EnhancerManagerContextType | null>(
	null,
);

/**
 * Provider component for the enhancer manager
 */
export const EnhancerManagerProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const manager = useEnhancerManager();

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
