import { useMemo } from 'react';

export interface VirtualizationConfig {
  itemHeight: number;
  containerHeight: number;
  overscan: number; // Number of items to render outside viewport
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

interface UseVirtualizationProps<T> {
  items: T[];
  config: VirtualizationConfig;
  scrollTop: number;
}

export const useVirtualization = <T>({
  items,
  config,
  scrollTop
}: UseVirtualizationProps<T>) => {
  const { itemHeight, containerHeight, overscan } = config;

  const range = useMemo((): VirtualizedRange => {
    const totalItems = items.length;
    
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
  }, [items.length, itemHeight, containerHeight, scrollTop, overscan]);

  const virtualizedItems = useMemo((): VirtualizedItem<T>[] => {
    const result: VirtualizedItem<T>[] = [];
    
    for (let i = range.startIndex; i <= range.endIndex; i++) {
      if (items[i]) {
        result.push({
          index: i,
          data: items[i],
          style: {
            position: 'absolute',
            top: i * itemHeight,
            left: 0,
            right: 0,
            height: itemHeight
          }
        });
      }
    }
    
    return result;
  }, [items, range, itemHeight]);

  const totalHeight = items.length * itemHeight;
  const offsetY = range.startIndex * itemHeight;

  return {
    virtualizedItems,
    totalHeight,
    offsetY,
    range
  };
};

export default useVirtualization;
