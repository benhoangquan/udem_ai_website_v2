import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  className = '',
  speed = 30,
  startDelay = 0,
  tag = 'p',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set up intersection observer to detect when element is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasTyped) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the element is visible
    );

    // Store ref value in a variable inside the effect
    const currentElement = elementRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [hasTyped]);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;

    // Initial delay before starting typing
    const startTyping = setTimeout(() => {
      // Type out text character by character
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setHasTyped(true);
        }
      }, speed);

      return () => clearInterval(intervalId);
    }, startDelay);

    return () => clearTimeout(startTyping);
  }, [text, speed, isVisible, startDelay]);

  // Dynamically create the component based on the tag prop
  const Component = tag as keyof JSX.IntrinsicElements;

  return (
    <div ref={elementRef}>
      <Component className={className}>
        {displayText}
        {!hasTyped && <span className="typing-cursor">|</span>}
        {/* <span className="typing-cursor">|</span> */}
      </Component>
    </div>
  );
};

export default TypeWriter; 