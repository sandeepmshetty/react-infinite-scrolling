import React, { useEffect, useCallback } from 'react';
import type { Post } from '@/types';
import { useInfiniteData } from '@/hooks/useInfiniteData';
import { useVirtualization } from '@/hooks/useVirtualization';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import './VirtualizedInfiniteScrollList.css';

interface VirtualizedPostItemProps {
  post: Post;
  index: number;
  style: React.CSSProperties;
}

const VirtualizedPostItem: React.FC<VirtualizedPostItemProps> = ({ post, index, style }) => (
  <div className="virtualized-post-item" style={style}>
    <div className="post-header">
      <h3 className="post-title">{post.title}</h3>
      <span className="post-meta">Post #{index + 1} | User {post.userId}</span>
    </div>
    <p className="post-body">{post.body}</p>
  </div>
);

const VirtualizedPostSkeleton: React.FC<{ style: React.CSSProperties }> = ({ style }) => (
  <div className="virtualized-post-item post-skeleton" style={style}>
    <div className="post-header">
      <div className="skeleton-title"></div>
      <div className="skeleton-meta"></div>
    </div>
    <div className="skeleton-body">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  </div>
);

const ErrorMessage: React.FC<{ error: string; onRetry: () => void }> = ({ error, onRetry }) => (
  <div className="error-message">
    <p>Error: {error}</p>
    <button onClick={onRetry} className="retry-button">
      Retry
    </button>
  </div>
);

const VirtualizedInfiniteScrollList: React.FC = () => {
  const { data, loading, error, hasNextPage, loadNextPage, reset } = useInfiniteData();
  
  // Configuration for virtualization
  const ITEM_HEIGHT = 180; // Fixed height per item
  const CONTAINER_HEIGHT = 600; // Container height
  const OVERSCAN = 3; // Render 3 extra items outside viewport
  
  const { scrollTop, containerRef } = useScrollPosition();
  
  const { virtualizedItems, totalHeight, range } = useVirtualization({
    items: data,
    config: {
      itemHeight: ITEM_HEIGHT,
      containerHeight: CONTAINER_HEIGHT,
      overscan: OVERSCAN
    },
    scrollTop
  });

  // Load more data when approaching the end
  useEffect(() => {
    const buffer = 5; // Load when within 5 items of the end
    const shouldLoadMore = range.endIndex >= data.length - buffer && hasNextPage && !loading;
    
    if (shouldLoadMore && data.length > 0) {
      console.log('Virtualized: Loading more data');
      loadNextPage();
    }
  }, [range.endIndex, data.length, hasNextPage, loading, loadNextPage]);

  const handleRetry = useCallback(() => {
    if (data.length === 0) {
      loadNextPage();
    }
  }, [data.length, loadNextPage]);

  if (error && data.length === 0) {
    return (
      <div className="virtualized-infinite-scroll-container">
        <header className="header">
          <h1>Virtualized Infinite Scroll Posts</h1>
          <p>Error loading initial data</p>
        </header>
        <ErrorMessage error={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="virtualized-infinite-scroll-container">
      <header className="header">
        <h1>Virtualized Infinite Scroll Posts</h1>
        <p>Vanilla React implementation with Virtualization + IntersectionObserver</p>
        <p>
          Posts loaded: {data.length} | Rendering: {virtualizedItems.length} | 
          Range: {range.startIndex}-{range.endIndex}
        </p>
        <button onClick={reset} className="reset-button">
          Reset List
        </button>
      </header>

      <div 
        ref={containerRef}
        className="virtualized-scroll-container"
        style={{ height: CONTAINER_HEIGHT, overflow: 'auto' }}
      >
        {/* Virtual scroll area */}
        <div 
          className="virtual-scroll-area"
          style={{ 
            height: totalHeight, 
            position: 'relative',
            width: '100%'
          }}
        >
          {/* Render visible items */}
          {virtualizedItems.map((item) => (
            <VirtualizedPostItem
              key={item.data.id}
              post={item.data}
              index={item.index}
              style={item.style}
            />
          ))}

          {/* Loading skeletons for new items */}
          {loading && hasNextPage && (
            <>
              {Array.from({ length: 3 }, (_, i) => (
                <VirtualizedPostSkeleton
                  key={`skeleton-${data.length + i}`}
                  style={{
                    position: 'absolute',
                    top: (data.length + i) * ITEM_HEIGHT,
                    left: 0,
                    right: 0,
                    height: ITEM_HEIGHT
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Loading indicator at the bottom */}
        {loading && (
          <div className="loading-indicator">
            Loading more posts...
          </div>
        )}

        {/* End of list message */}
        {!hasNextPage && !loading && data.length > 0 && (
          <div className="end-message">
            🎉 You've reached the end! Loaded all {data.length} posts.
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <ErrorMessage error={error} onRetry={handleRetry} />
        )}
      </div>

      {/* Debug info */}
      <div className="debug-info">
        <small>
          Scroll: {scrollTop}px | 
          Total Height: {totalHeight}px | 
          Item Height: {ITEM_HEIGHT}px
        </small>
      </div>
    </div>
  );
};

export default VirtualizedInfiniteScrollList;
