import React from "react";
import { useIsVisible } from "@/hooks/useIsVisible";
import { useTypeWriter } from "@/hooks/useTypewriter";

interface TypeWriterProps {
  text: string;
  className?: string;
  speed?: number;
  startDelay?: number;
  tag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  typingCursor?: string;
  typingCursorPersistence?: boolean;
}

const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  className = "",
  speed = 30,
  startDelay = 0,
  tag = "p",
  typingCursor = "|",
  typingCursorPersistence = false,
}) => {
  const { isVisible, ref } = useIsVisible(0.2);
  const { displayText, hasTyped } = useTypeWriter(
    text,
    speed,
    startDelay,
    isVisible,
  );

  const Component = tag as keyof JSX.IntrinsicElements;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>}>
      <Component className={className}>
        {displayText}
        {(typingCursorPersistence || !hasTyped) && (
          <span className="typing-cursor">{typingCursor}</span>
        )}
      </Component>
    </div>
  );
};

export default TypeWriter;
