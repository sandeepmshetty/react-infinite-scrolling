import React from 'react';
import type { ErrorMessageProps } from '@/types';

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => (
  <div className="error-message">
    <p>Error: {error}</p>
    <button onClick={onRetry} className="retry-button">
      Retry
    </button>
  </div>
);

export const LoadingIndicator: React.FC<{ message?: string }> = ({ 
  message = "Loading more..." 
}) => (
  <div className="loading-indicator">
    {message}
  </div>
);

export const EndMessage: React.FC<{ totalItems: number }> = ({ totalItems }) => (
  <div className="end-message">
    🎉 You've reached the end! Loaded all {totalItems} posts.
  </div>
);
