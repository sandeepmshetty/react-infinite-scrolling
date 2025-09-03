# React Infinite Scrolling with Virtualization

A vanilla React implementation of infinite scrolling using the IntersectionObserver API, custom hooks, and **virtualization** for optimal performance. This project demonstrates how to implement both regular and virtualized infinite scroll functionality without third-party libraries.

## 🚀 Key Features

- ✅ **Dual Implementation**: Regular and Virtualized infinite scrolling modes
- ✅ **Vanilla React**: No third-party infinite scroll libraries (react-window, react-virtualized)
- ✅ **IntersectionObserver API**: Modern browser API for efficient scroll detection
- ✅ **Custom Virtualization**: Only renders visible items for massive performance gains
- ✅ **Advanced Custom Hooks**: Modular, reusable hooks with composition patterns
- ✅ **Separation of Concerns**: Clean architecture with focused components and hooks
- ✅ **Centralized Configuration**: All constants and settings in dedicated files
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Reusable Components**: Shared UI components across different implementations
- ✅ **Skeleton Loading**: Optimized loading states to prevent Cumulative Layout Shift (CLS)
- ✅ **Error Handling**: Robust error handling with retry functionality
- ✅ **Performance Optimized**: Prevents multiple concurrent API requests

## ⚡ Performance Comparison

| Feature | Regular Mode | Virtualized Mode |
|---------|-------------|------------------|
| **DOM Nodes** | All loaded items | Only visible items (~10) |
| **Memory Usage** | Grows with data | Constant (~50KB) |
| **Scroll Performance** | Degrades with data | Always smooth |
| **Rendering Speed** | Slower with large lists | Always fast |
| **Browser DevTools** | Heavy DOM tree | Lightweight DOM |

## Tech Stack

- **React 19.1.1** with TypeScript
- **Vite 7.1.4** for build tooling
- **JSONPlaceholder API** for demo data
- **IntersectionObserver API** for scroll detection
- **CSS3** for styling and animations

## Project Structure

```
src/
├── components/
│   ├── regular/
│   │   ├── InfiniteScrollList.tsx       # Regular infinite scroll component
│   │   └── InfiniteScrollList.css       # Regular component styling
│   ├── virtualized/
│   │   ├── VirtualizedInfiniteScrollList.tsx # Virtualized infinite scroll component
│   │   └── VirtualizedInfiniteScrollList.css # Virtualized component styling
│   ├── common/
│   │   ├── PostComponents.tsx           # Shared post item and skeleton components
│   │   ├── StatusComponents.tsx         # Shared error and loading components
│   │   └── index.ts                     # Common components barrel export
│   └── index.ts                         # Components barrel export
├── hooks/
│   ├── useInfiniteData.ts               # Custom hook for data fetching and pagination
│   ├── useIntersectionObserver.ts       # Custom hook for scroll detection
│   ├── useVirtualization.ts             # Custom hook for virtualization logic
│   ├── useScrollPosition.ts             # Custom hook for scroll position tracking
│   ├── useVirtualizedInfiniteScroll.ts  # 🆕 Combined hook for virtualized infinite scroll
│   └── index.ts                         # Hooks barrel export
├── types/
│   ├── domain.ts                        # Core business domain types (Post, etc.)
│   ├── hooks.ts                         # Hook-specific type definitions
│   ├── components.ts                    # Component prop type definitions
│   └── index.ts                         # Types barrel export
├── utils/
│   ├── api.ts                           # API utilities and configuration
│   ├── virtualization.ts               # Virtualization helper functions
│   ├── constants.ts                     # 🆕 Centralized configuration constants
│   └── index.ts                         # Utils barrel export
├── assets/
│   └── react.svg                        # React logo asset
├── App.tsx                              # Root component with mode switching
├── App.css                              # Root component styling
├── main.tsx                             # Application entry point
└── vite-env.d.ts                        # Vite TypeScript environment types
```

## 🎯 How Virtualization Works

### Regular Mode
```
DOM: [Item1][Item2][Item3]...[Item1000] ← All items in DOM
Memory: High ↗️
Performance: Degrades with more items
```

### Virtualized Mode
```
DOM: [Spacer][Item15][Item16][Item17][Spacer] ← Only visible items
Memory: Constant 📊
Performance: Always optimal ⚡
```

The virtualization implementation:
1. **Calculates visible range** based on scroll position and container height
2. **Renders only visible items** plus a small buffer (overscan)
3. **Uses absolute positioning** to place items at correct scroll positions
4. **Maintains total scroll height** with spacer elements
5. **Updates on scroll** for smooth performance

## Getting Started

### Prerequisites
- Node.js (v22.19.0 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sandeepmshetty/react-infinite-scrolling.git
cd react-infinite-scrolling
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Implementation Details

### Custom Hooks

**useVirtualizedInfiniteScroll Hook:** 🆕
- Combines data fetching, virtualization, and scroll logic
- Implements composition pattern for complex functionality
- Provides clean interface for virtualized infinite scroll components
- Handles load-more logic and error recovery automatically

**useInfiniteData Hook:**
- Manages paginated data fetching with TypeScript generics
- Handles loading states and error management
- Prevents multiple concurrent requests
- Implements pagination logic (10 posts per page, 100 total posts)

**useIntersectionObserver Hook:**
- Wraps the IntersectionObserver API in a React hook
- Provides intersection state management
- Configurable threshold and root margin options

**useVirtualization Hook:**
- Calculates visible item ranges based on scroll position
- Manages item positioning and container dimensions
- Optimizes rendering performance for large datasets

**useScrollPosition Hook:**
- Tracks scroll position changes efficiently
- Provides scroll callbacks for virtualization
- Debounced for optimal performance

### Key Components

**InfiniteScrollList Component:**
- Regular infinite scroll implementation
- Renders all loaded posts with skeleton loading
- Manages the sentinel element for intersection detection
- Handles error states with retry functionality

**VirtualizedInfiniteScrollList Component:**
- High-performance virtualized infinite scroll using composition
- Uses `useVirtualizedInfiniteScroll` hook for all logic
- Leverages shared components from common folder
- Focused solely on UI rendering with clean separation of concerns
- Uses absolute positioning for smooth scrolling
- Maintains constant memory usage regardless of data size

**Common Components:**
- `PostItem`: Reusable post display component with consistent styling
- `PostSkeleton`: Loading skeleton with fixed dimensions to prevent CLS
- `ErrorMessage`: Error display with retry functionality
- `LoadingIndicator`: Consistent loading states across components
- `EndMessage`: End-of-list message with item count

## Architecture & Best Practices

### 🏗️ Separation of Concerns
- **Custom Hooks**: Business logic separated from UI components
- **Composition Pattern**: `useVirtualizedInfiniteScroll` combines multiple hooks
- **Reusable Components**: Shared UI components in `common/` folder
- **Centralized Configuration**: All constants in `utils/constants.ts`

### ⚙️ Configuration Management
```typescript
// All configuration centralized
export const VIRTUALIZATION_CONFIG = {
  ITEM_HEIGHT: 180,
  CONTAINER_HEIGHT: 600,
  OVERSCAN: 3,
  LOAD_MORE_BUFFER: 5,
} as const;

export const UI_MESSAGES = {
  LOADING: 'Loading more posts...',
  END_OF_LIST: (count: number) => `🎉 You've reached the end! Loaded all ${count} posts.`,
} as const;
```

### 🔧 Hook Composition Pattern
```typescript
// Complex functionality through composition
const useVirtualizedInfiniteScroll = () => {
  const dataLogic = useInfiniteData();
  const virtualizationLogic = useVirtualization();
  const scrollLogic = useScrollPosition();
  
  // Combine and return unified interface
  return { ...dataLogic, ...virtualizationLogic, ...scrollLogic };
};
```
- **Virtualization**: Only renders visible items, maintaining constant memory usage
- **Skeleton Loading**: Fixed-height skeleton components prevent layout shift
- **Intersection Observer**: Efficient scroll detection without scroll event listeners
- **Request Deduplication**: Prevents multiple API calls for the same page
- **Hook Composition**: Efficient combination of related logic
- **Reusable Components**: Consistent UI patterns reduce bundle size
- **Centralized Configuration**: Easy tuning without code changes
- **TypeScript**: Full type safety prevents runtime errors and improves DX
- **Modular Architecture**: Separation of concerns with organized folder structure
- **CSS Optimizations**: Font display optimizations and smooth animations

## 🎉 Recent Improvements

### ✨ Architecture Refactoring (Latest Update)
- **New Combined Hook**: `useVirtualizedInfiniteScroll` for better composition
- **Centralized Configuration**: All constants moved to `utils/constants.ts`
- **Enhanced Separation of Concerns**: Components focused only on UI rendering
- **Reusable Component Library**: Shared components in `common/` folder
- **Improved Type Safety**: Better TypeScript interfaces throughout
- **Cleaner Imports**: Path aliases for maintainable import statements

### 🔧 Key Architectural Benefits
- **Maintainability**: Changes to configuration affect entire app from one place
- **Reusability**: Components can be used across different implementations
- **Testability**: Separated logic makes unit testing easier
- **Performance**: Optimized hook composition reduces re-renders
- **Developer Experience**: Clean, focused components are easier to understand

## API Integration

The project uses [JSONPlaceholder](https://jsonplaceholder.typicode.com/) API:
- **Endpoint**: `/posts?_limit=10&_start=X`
- **Pagination**: 10 posts per request
- **Total Posts**: 100 posts available

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Browser Support

- Modern browsers with IntersectionObserver support
- Fallback scroll detection for older browsers (if needed)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
