import { useState, useEffect } from "react";

export function useLoadingDelay(deps: any[], delay = 300) {
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), delay);
      return () => clearTimeout(timer);
    }, deps);
  
    return isLoading;
  }