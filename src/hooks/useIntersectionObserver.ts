import { useEffect, useRef, useState } from 'react';
import type { UseIntersectionObserverReturn, IntersectionObserverConfig } from '@/types';

export const useIntersectionObserver = ({
  threshold = 0.1,
  rootMargin = '0px'
}: IntersectionObserverConfig = {}): UseIntersectionObserverReturn => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    // Clean up existing observer if any
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin
      }
    );

    observerRef.current = observer;
    observer.observe(target);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [threshold, rootMargin]);
  
  const reset = () => {
    setIsIntersecting(false);
  };

  return {
    targetRef,
    isIntersecting,
    reset
  };
};
