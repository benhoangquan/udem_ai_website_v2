import React from 'react';
import { useTypeWriterList } from '@/hooks/useTypewriter';

interface Props {
  texts: string[];
  className?: string;
  speed?: number;
  startDelay?: number;
  tag?: 'span' | 'p' | 'div' | 'h1' | 'h2';
}

const TypeWriterLoop: React.FC<Props> = ({
  texts,
  className = '',
  speed = 40,
  startDelay = 0,
  tag = 'span',
}) => {
  const { displayText } = useTypeWriterList(texts, speed, startDelay, 1500, true);
  const Tag = tag;

  return (
    <Tag className={className}>
      {displayText}
      <span className="typing-cursor">|</span>
    </Tag>
  );
};

export default TypeWriterLoop;