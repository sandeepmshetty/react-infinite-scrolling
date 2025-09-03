import type { VirtualizedRange } from '@/types';

// Virtualization utilities
export const calculateVisibleRange = (
  scrollTop: number,
  itemHeight: number,
  containerHeight: number,
  totalItems: number,
  overscan: number = 3
): VirtualizedRange => {
  if (totalItems === 0) {
    return {
      startIndex: 0,
      endIndex: 0,
      visibleStartIndex: 0,
      visibleEndIndex: 0
    };
  }

  // Calculate visible range
  const visibleStartIndex = Math.floor(scrollTop / itemHeight);
  const visibleEndIndex = Math.min(
    Math.ceil((scrollTop + containerHeight) / itemHeight),
    totalItems - 1
  );

  // Add overscan
  const startIndex = Math.max(0, visibleStartIndex - overscan);
  const endIndex = Math.min(totalItems - 1, visibleEndIndex + overscan);

  return {
    startIndex,
    endIndex,
    visibleStartIndex,
    visibleEndIndex
  };
};

// Style utilities for virtualized items
export const createVirtualItemStyle = (
  index: number, 
  itemHeight: number
): React.CSSProperties => ({
  position: 'absolute',
  top: index * itemHeight,
  left: 0,
  right: 0,
  height: itemHeight
});

// Calculate total height for virtual scroll area
export const calculateTotalHeight = (itemCount: number, itemHeight: number): number => {
  return itemCount * itemHeight;
};

// Check if should load more data based on current range
export const shouldLoadMore = (
  endIndex: number,
  totalLoaded: number,
  hasNextPage: boolean,
  loading: boolean,
  buffer: number = 5
): boolean => {
  return endIndex >= totalLoaded - buffer && hasNextPage && !loading && totalLoaded > 0;
};
