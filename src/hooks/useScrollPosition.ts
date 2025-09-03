import { useState, useEffect, useRef } from 'react';

interface UseScrollPositionProps {
  onScroll?: (scrollTop: number) => void;
}

export const useScrollPosition = ({ onScroll }: UseScrollPositionProps = {}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const newScrollTop = container.scrollTop;
      setScrollTop(newScrollTop);
      onScroll?.(newScrollTop);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll position
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [onScroll]);

  return {
    scrollTop,
    containerRef
  };
};

export default useScrollPosition;
