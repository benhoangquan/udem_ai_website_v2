import { useState, useEffect, DependencyList } from "react";

export function useLoadingDelay(deps: DependencyList, delay = 300) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timer);
  }, [...deps, delay]);

  return isLoading;
}