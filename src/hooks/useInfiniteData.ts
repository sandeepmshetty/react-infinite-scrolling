import { useState, useCallback, useRef, useEffect } from 'react';

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface UseInfiniteDataReturn {
  data: Post[];
  loading: boolean;
  error: string | null;
  hasNextPage: boolean;
  loadNextPage: () => Promise<void>;
  reset: () => void;
}

const POSTS_PER_PAGE = 10;
const TOTAL_POSTS = 100; // JSONPlaceholder has 100 posts

export const useInfiniteData = (): UseInfiniteDataReturn => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const loadingRef = useRef(false);

  const hasNextPage = data.length < TOTAL_POSTS;

  const fetchPosts = async (startIndex: number): Promise<Post[]> => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${POSTS_PER_PAGE}&_start=${startIndex}`
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  };

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
      const startIndex = currentPage * POSTS_PER_PAGE;
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
