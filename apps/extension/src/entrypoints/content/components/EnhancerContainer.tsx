import React, { useCallback, useState } from 'react';
import { EnhancementState, UIComponentProps } from '../types';
import { EnhancerButton } from './EnhancerButton';
import { LoadingSpinner } from './LoadingSpinner';
import { NotificationToast } from './NotificationToast';

/**
 * Main container component that orchestrates the enhancement UI
 * Handles state management and provides a clean interface
 */
export const EnhancerContainer: React.FC<UIComponentProps> = ({
  onEnhance,
  onStateChange,
  className = '',
}) => {
  const [state, setState] = useState<EnhancementState>({
    isLoading: false,
    error: null,
    success: false,
    message: null,
  });

  const updateState = useCallback((newState: Partial<EnhancementState>) => {
    setState(prev => {
      const updated = { ...prev, ...newState };
      onStateChange?.(updated);
      return updated;
    });
  }, [onStateChange]);

  const handleEnhanceStart = useCallback(() => {
    updateState({
      isLoading: true,
      error: null,
      success: false,
      message: 'Enhancing your prompt...',
    });
  }, [updateState]);

  const handleEnhanceSuccess = useCallback((originalText: string, enhancedText: string) => {
    updateState({
      isLoading: false,
      error: null,
      success: true,
      message: 'Prompt enhanced successfully!',
    });
    
    onEnhance(originalText, enhancedText);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      updateState({ success: false, message: null });
    }, 3000);
  }, [updateState, onEnhance]);

  const handleEnhanceError = useCallback((error: string) => {
    updateState({
      isLoading: false,
      error,
      success: false,
      message: null,
    });
    
    // Clear error message after 5 seconds
    setTimeout(() => {
      updateState({ error: null });
    }, 5000);
  }, [updateState]);

  const handleCloseNotification = useCallback(() => {
    updateState({
      error: null,
      success: false,
      message: null,
    });
  }, [updateState]);

  return (
    <div className={`enhancer-container relative ${className}`}>
      {/* Main enhancer button */}
      <EnhancerButton
        isLoading={state.isLoading}
        onEnhanceStart={handleEnhanceStart}
        onEnhanceSuccess={handleEnhanceSuccess}
        onEnhanceError={handleEnhanceError}
      />
      
      {/* Loading indicator */}
      {state.isLoading && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="bg-black/80 text-white px-3 py-2 rounded-lg text-sm flex items-center gap-2">
            <LoadingSpinner size="sm" />
            <span>{state.message}</span>
          </div>
        </div>
      )}
      
      {/* Success notification */}
      {state.success && state.message && (
        <NotificationToast
          type="success"
          message={state.message}
          duration={3000}
          onClose={handleCloseNotification}
        />
      )}
      
      {/* Error notification */}
      {state.error && (
        <NotificationToast
          type="error"
          message={state.error}
          duration={5000}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};