import type { Post } from '@/types';

// API configuration
export const API_CONFIG = {
  BASE_URL: 'https://jsonplaceholder.typicode.com',
  POSTS_PER_PAGE: 10,
  TOTAL_POSTS: 100,
} as const;

// API utilities
export const fetchPosts = async (startIndex: number): Promise<Post[]> => {
  const url = `${API_CONFIG.BASE_URL}/posts?_limit=${API_CONFIG.POSTS_PER_PAGE}&_start=${startIndex}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// API error handling
export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
};
