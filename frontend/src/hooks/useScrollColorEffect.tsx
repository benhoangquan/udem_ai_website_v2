import { useRef, useEffect, useState } from "react";

interface ScrollColorEffectOptions {
  text: string;
  threshold?: number;
}

export const useScrollColorEffect = ({
  text,
  threshold = 0,
}: ScrollColorEffectOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progressIndex, setProgressIndex] = useState<number>(0);
  const words = text.split(" ");

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate the viewport's vertical midpoint.
        const viewportMid = window.innerHeight / 2;
        // Calculate the distance between the container's top and the viewport midpoint.
        const distance = viewportMid - rect.top;
        // Map that distance to a progress percentage relative to the container's height.
        const newProgress = Math.min(Math.max(distance / rect.height, 0), 1);
        // Map the progress to an index.
        const newProgressIndex = Math.floor(newProgress * words.length * 2);
        setProgressIndex(newProgressIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set progress
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [words.length]);

  return { containerRef, progressIndex, words };
};
