import { useEffect, useCallback } from 'react';
import type { Post } from '@/types';
import { useInfiniteData } from '@/hooks/useInfiniteData';
import { useVirtualization } from '@/hooks/useVirtualization';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { VIRTUALIZATION_CONFIG } from '@/utils/constants';
import type { VirtualizedItem } from '@/hooks/useVirtualization';

export interface UseVirtualizedInfiniteScrollConfig {
  itemHeight?: number;
  containerHeight?: number;
  overscan?: number;
  loadMoreBuffer?: number;
}

export interface UseVirtualizedInfiniteScrollReturn {
  data: Post[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  virtualizedItems: VirtualizedItem<Post>[];
  totalHeight: number;
  range: { startIndex: number; endIndex: number };
  scrollTop: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  reset: () => void;
  handleRetry: () => void;
}

export const useVirtualizedInfiniteScroll = (
  config: UseVirtualizedInfiniteScrollConfig = {}
): UseVirtualizedInfiniteScrollReturn => {
  const {
    itemHeight = VIRTUALIZATION_CONFIG.ITEM_HEIGHT,
    containerHeight = VIRTUALIZATION_CONFIG.CONTAINER_HEIGHT,
    overscan = VIRTUALIZATION_CONFIG.OVERSCAN,
    loadMoreBuffer = VIRTUALIZATION_CONFIG.LOAD_MORE_BUFFER,
  } = config;

  const { data, loading, error, hasNextPage, loadNextPage, reset } = useInfiniteData();
  const { scrollTop, containerRef } = useScrollPosition();

  const { virtualizedItems, totalHeight, range } = useVirtualization({
    items: data,
    config: {
      itemHeight,
      containerHeight,
      overscan
    },
    scrollTop
  });

  // Load more data when approaching the end
  useEffect(() => {
    const shouldLoadMore = range.endIndex >= data.length - loadMoreBuffer && hasNextPage && !loading;

    if (shouldLoadMore && data.length > 0) {
      loadNextPage();
    }
  }, [range.endIndex, data.length, hasNextPage, loading, loadNextPage, loadMoreBuffer]);

  const handleRetry = useCallback(() => {
    if (data.length === 0) {
      loadNextPage();
    }
  }, [data.length, loadNextPage]);

  return {
    data,
    loading,
    error,
    hasNextPage,
    virtualizedItems,
    totalHeight,
    range,
    scrollTop,
    containerRef,
    reset,
    handleRetry,
  };
};
