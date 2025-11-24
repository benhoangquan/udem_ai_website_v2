import { useEffect, useRef, useState, useCallback } from "react";

export function useAutoCarousel(totalItems: number, delay = 3000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  useEffect(() => {
    if (isAutoScrolling) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalItems);
      }, delay);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoScrolling, delay, totalItems]);

  const stopAutoScroll = () => setIsAutoScrolling(false);
  const startAutoScroll = () => setIsAutoScrolling(true);
  const toggleAutoScroll = () => setIsAutoScrolling((prev) => !prev);

  return {
    currentIndex,
    setCurrentIndex,
    scrollTo,
    next,
    prev,
    isAutoScrolling,
    startAutoScroll,
    stopAutoScroll,
    toggleAutoScroll,
  };
}
