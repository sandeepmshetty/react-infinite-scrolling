// Constants used throughout the application
export const VIRTUALIZATION_CONFIG = {
  ITEM_HEIGHT: 180,
  CONTAINER_HEIGHT: 600,
  OVERSCAN: 3,
  LOAD_MORE_BUFFER: 5,
} as const;

export const INTERSECTION_OBSERVER_CONFIG = {
  THRESHOLD: 0,
  ROOT_MARGIN: '100px',
} as const;

export const UI_MESSAGES = {
  LOADING: 'Loading more posts...',
  END_OF_LIST: (count: number) => `🎉 You've reached the end! Loaded all ${count} posts.`,
  ERROR_RETRY: 'Retry',
  SCROLL_TRIGGER: 'Scroll Trigger Element',
  SWITCH_TO_VIRTUALIZED: 'Switch to Virtualized Mode',
  SWITCH_TO_REGULAR: 'Switch to Regular Mode',
  VIRTUALIZED_DESCRIPTION: '🚀 Virtualized: Only visible items are rendered for better performance',
  REGULAR_DESCRIPTION: '📜 Regular: All loaded items are rendered in DOM',
} as const;

export const SKELETON_COUNT = 3;
