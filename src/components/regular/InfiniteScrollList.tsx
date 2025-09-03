import React, { useEffect } from 'react';
import type { Post } from '@/types';
import { useInfiniteData } from '@/hooks/useInfiniteData';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import './InfiniteScrollList.css';

interface PostItemProps {
  post: Post;
  index: number;
}

const PostItem: React.FC<PostItemProps> = ({ post, index }) => (
  <div className="post-item" data-index={index}>
    <div className="post-header">
      <h3 className="post-title">{post.title}</h3>
      <span className="post-meta">Post #{post.id} | User {post.userId}</span>
    </div>
    <p className="post-body">{post.body}</p>
  </div>
);

const PostSkeleton: React.FC = () => (
  <div className="post-item post-skeleton">
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

const InfiniteScrollList: React.FC = () => {
  const { data, loading, error, hasNextPage, loadNextPage, reset } = useInfiniteData();
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 0,
    rootMargin: '100px'
  });

  // Backup scroll-based loading in case intersection observer fails
  useEffect(() => {
    const handleScroll = () => {
      if (!hasNextPage || loading || data.length === 0) return;
      
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Trigger when user is within 200px of bottom
      if (scrollTop + windowHeight >= docHeight - 200) {
        loadNextPage();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasNextPage, loading, loadNextPage, data.length]);

  // Load more data when the sentinel element comes into view
  useEffect(() => {
    if (isIntersecting && hasNextPage && !loading && data.length > 0) {
      loadNextPage();
    }
  }, [isIntersecting, hasNextPage, loading, loadNextPage, data.length]);

  const handleRetry = () => {
    if (data.length === 0) {
      loadNextPage();
    }
  };

  // Show initial loading state without layout shifts
  if (data.length === 0 && loading) {
    return (
      <div className="infinite-scroll-container">
        <header className="header">
          <h1>Infinite Scroll Posts</h1>
          <p>Vanilla React implementation with Intersection Observer</p>
          <button onClick={reset} className="reset-button">
            Reset List
          </button>
        </header>
        <div className="posts-container">
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="infinite-scroll-container">
      <header className="header">
        <h1>Infinite Scroll Posts</h1>
        <p>Vanilla React implementation with Intersection Observer</p>
        <button onClick={reset} className="reset-button">
          Reset List
        </button>
      </header>

      <div className="posts-container">
        {data.map((post, index) => (
          <PostItem key={post.id} post={post} index={index} />
        ))}

        {/* Show skeleton loaders while loading */}
        {loading && (
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        )}

        {/* Sentinel element for intersection observer */}
        {hasNextPage && (
          <div 
            ref={targetRef} 
            className="sentinel"
            style={{ 
              backgroundColor: 'lightblue', 
              padding: '10px', 
              textAlign: 'center',
              border: '2px dashed blue'
            }}
          >
            <small>Scroll Trigger Element</small>
            {loading && <div className="loading-indicator">Loading more...</div>}
            {error && !loading && (
              <ErrorMessage error={error} onRetry={handleRetry} />
            )}
          </div>
        )}

        {/* End of list message */}
        {!hasNextPage && data.length > 0 && (
          <div className="end-message">
            🎉 You've reached the end! Loaded {data.length} posts.
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="stats">
        <span>Loaded: {data.length} posts</span>
        <span>Has more: {hasNextPage ? 'Yes' : 'No'}</span>
        <span>Loading: {loading ? 'Yes' : 'No'}</span>
      </div>
    </div>
  );
};

export default InfiniteScrollList;
