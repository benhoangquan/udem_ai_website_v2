import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  speed?: number;
  startDelay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 30,
  startDelay = 0,
  onComplete
}: UseTypewriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const startTyping = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setHasTyped(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, startDelay);

    return () => clearTimeout(startTyping);
  }, [text, speed, startDelay, onComplete]);

  return { displayText, hasTyped };
} 