import React from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useTypewriter } from '@/hooks/useTypewriter';

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  tag?: keyof JSX.IntrinsicElements;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  className = '',
  speed = 30,
  startDelay = 0,
  tag = 'p',
}) => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const { displayText, hasTyped } = useTypewriter({
    text,
    speed,
    startDelay,
    onComplete: () => console.log('Typing completed'),
  });

  const Component = tag as keyof JSX.IntrinsicElements;

  return (
    <div ref={elementRef}>
      <Component className={className}>
        {isVisible ? displayText : ''}
        {isVisible && !hasTyped && <span className="typing-cursor">|</span>}
      </Component>
    </div>
  );
};

export default TypeWriter; 