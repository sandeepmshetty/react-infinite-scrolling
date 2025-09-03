import React from 'react';
import { useVirtualizedInfiniteScroll } from '@/hooks/useVirtualizedInfiniteScroll';
import { VIRTUALIZATION_CONFIG, UI_MESSAGES, SKELETON_COUNT } from '@/utils/constants';
import { PostItem, PostSkeleton } from '@/components/common/PostComponents';
import { ErrorMessage, LoadingIndicator, EndMessage } from '@/components/common/StatusComponents';
import './VirtualizedInfiniteScrollList.css';

const VirtualizedInfiniteScrollList: React.FC = () => {
  const {
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
  } = useVirtualizedInfiniteScroll();

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
        style={{ height: VIRTUALIZATION_CONFIG.CONTAINER_HEIGHT, overflow: 'auto' }}
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
            <PostItem
              key={item.data.id}
              post={item.data}
              index={item.index}
              style={item.style}
            />
          ))}

          {/* Loading skeletons for new items */}
          {loading && hasNextPage && (
            <>
              {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <PostSkeleton
                  key={`skeleton-${data.length + i}`}
                  style={{
                    position: 'absolute',
                    top: (data.length + i) * VIRTUALIZATION_CONFIG.ITEM_HEIGHT,
                    left: 0,
                    right: 0,
                    height: VIRTUALIZATION_CONFIG.ITEM_HEIGHT
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Loading indicator at the bottom */}
        {loading && (
          <LoadingIndicator message={UI_MESSAGES.LOADING} />
        )}

        {/* End of list message */}
        {!hasNextPage && !loading && data.length > 0 && (
          <EndMessage totalItems={data.length} />
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
          Item Height: {VIRTUALIZATION_CONFIG.ITEM_HEIGHT}px
        </small>
      </div>
    </div>
  );
};

export default VirtualizedInfiniteScrollList;
