import type { Post } from './domain';

// Hook return types
export interface UseInfiniteDataReturn {
  data: Post[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadNextPage: () => Promise<void>;
  reset: () => void;
}

export interface UseIntersectionObserverReturn {
  targetRef: React.RefObject<HTMLDivElement | null>;
  isIntersecting: boolean;
  reset: () => void;
}

export interface UseScrollPositionReturn {
  scrollTop: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export interface UseVirtualizationReturn<T> {
  virtualizedItems: VirtualizedItem<T>[];
  totalHeight: number;
  range: VirtualizedRange;
}

// Virtualization types
export interface VirtualizationConfig {
  itemHeight: number;
  containerHeight: number;
  overscan: number;
}

export interface VirtualizedRange {
  startIndex: number;
  endIndex: number;
  visibleStartIndex: number;
  visibleEndIndex: number;
}

export interface VirtualizedItem<T> {
  index: number;
  data: T;
  style: React.CSSProperties;
}
