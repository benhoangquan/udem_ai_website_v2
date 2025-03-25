"use client";

import React from 'react';
import { useScrollColorEffect } from '../hooks/useScrollColorEffect';

const titleText =
  "For more than a decade, I've helped clients stand out through clear positioning, brand messaging and stories that move people.";

const ExperienceSection: React.FC = () => {
  const { containerRef, progressIndex, words } = useScrollColorEffect({ text: titleText });

  return (
    <div className="bg-cream py-16 md:py-24 w-full" ref={containerRef}>
      <div className="container mx-auto px-8 max-w-full">
        <div className="w-full">
          <h2 className="seth-heading mb-8 transition-colors duration-500">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-colors duration-500 mr-2 ${
                  index <= progressIndex ? "text-seth-coral" : "text-seth-coral/30"
                }`}
              >
                {word}{index < words.length - 1 ? " " : ""}
              </span>
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;