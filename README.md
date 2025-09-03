# React Infinite Scrolling

A vanilla React implementation of infinite scrolling using the IntersectionObserver API and custom hooks. This project demonstrates how to implement infinite scroll functionality without third-party libraries like react-window or TanStack Query.

## Features

- ✅ **Vanilla React Implementation**: No third-party infinite scroll libraries
- ✅ **IntersectionObserver API**: Modern browser API for efficient scroll detection
- ✅ **Custom Hooks**: Modular, reusable hooks for data fetching and intersection observation
- ✅ **TypeScript**: Full type safety throughout the application
- ✅ **Skeleton Loading**: Optimized loading states to prevent Cumulative Layout Shift (CLS)
- ✅ **Error Handling**: Robust error handling with retry functionality
- ✅ **Performance Optimized**: Prevents multiple concurrent API requests

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
│   ├── InfiniteScrollList.tsx    # Main infinite scroll component
│   └── InfiniteScrollList.css    # Component styling with skeleton animations
├── hooks/
│   ├── useInfiniteData.ts        # Custom hook for data fetching and pagination
│   └── useIntersectionObserver.ts # Custom hook for scroll detection
├── App.tsx                       # Root component
└── main.tsx                      # Application entry point
```

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

**useInfiniteData Hook:**
- Manages paginated data fetching
- Handles loading states and error management
- Prevents multiple concurrent requests
- Implements pagination logic (10 posts per page, 100 total posts)

**useIntersectionObserver Hook:**
- Wraps the IntersectionObserver API in a React hook
- Provides intersection state management
- Configurable threshold and root margin options

### Key Components

**InfiniteScrollList Component:**
- Renders the list of posts with skeleton loading
- Manages the sentinel element for intersection detection
- Handles error states with retry functionality
- Optimized for performance and accessibility

## Performance Optimizations

- **Skeleton Loading**: Fixed-height skeleton components prevent layout shift
- **Intersection Observer**: Efficient scroll detection without scroll event listeners
- **Request Deduplication**: Prevents multiple API calls for the same page
- **CSS Optimizations**: Font display optimizations and smooth animations

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
