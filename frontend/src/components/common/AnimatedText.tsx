"use client";

import React from "react";
import { useScrollColorEffect } from "@/hooks/useScrollColorEffect";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
}) => {
  const { containerRef, progressIndex, words } = useScrollColorEffect({ text });

  return (
    <h2 className={className} ref={containerRef}>
      {words.map((word: string, index: number) => (
        <span
          key={index}
          className={`inline-block transition-colors duration-500 mr-2 ${
            index <= progressIndex ? "text-seth-coral" : "text-seth-coral/30"
          }`}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
    </h2>
  );
};

export default AnimatedText;
