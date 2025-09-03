import type { Post } from './domain';

// Component prop types
export interface PostItemProps {
  post: Post;
  index: number;
  style?: React.CSSProperties;
}

export interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

export interface LoadingIndicatorProps {
  message?: string;
}

export interface EndMessageProps {
  totalItems: number;
}

// Configuration types
export interface IntersectionObserverConfig {
  threshold?: number;
  rootMargin?: string;
}
