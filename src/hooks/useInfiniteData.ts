import { useState, useCallback, useRef, useEffect } from 'react';
import type { Post, UseInfiniteDataReturn } from '@/types';
import { fetchPosts, API_CONFIG } from '@/utils';

export const useInfiniteData = (): UseInfiniteDataReturn => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const loadingRef = useRef(false);

  const hasNextPage = data.length < API_CONFIG.TOTAL_POSTS;

  const loadNextPage = useCallback(async () => {
    // Prevent multiple concurrent requests
    if (loadingRef.current) {
      return;
    }
    
    // Check if we have more data to load
    if (!hasNextPage) {
      return;
    }
    
    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const startIndex = currentPage * API_CONFIG.POSTS_PER_PAGE;
      const newPosts = await fetchPosts(startIndex);
      
      setData(prevData => [...prevData, ...newPosts]);
      setCurrentPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [currentPage, hasNextPage]);

  // Initial load on mount
  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      loadNextPage();
    }
  }, [initialized, loadNextPage]);

  const reset = useCallback(() => {
    setData([]);
    setCurrentPage(0);
    setError(null);
    setLoading(false);
    setInitialized(false);
    loadingRef.current = false;
  }, []);

  return {
    data,
    loading,
    error,
    hasNextPage,
    loadNextPage,
    reset
  };
};
