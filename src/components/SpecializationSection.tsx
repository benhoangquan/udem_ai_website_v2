'use client';

import React from 'react';
import { useScrollColorEffect } from '../hooks/useScrollColorEffect';

const titleText = "Get Real with AI.";

const descriptionText = "Hands-on workshops. Cool projects. Expert mentors. Join us and level up your AI skills.";

const SpecializationSection: React.FC = () => {
  const { containerRef, progressIndex, words } = useScrollColorEffect({ text: titleText });
  const { containerRef: descRef, progressIndex: descProgressIndex, words: descWords } = useScrollColorEffect({ text: descriptionText });

  return (
    <div className="bg-cream text-seth-coral py-16 md:py-24 w-[80%] mx-auto" >
      <div className="container mx-auto px-8 max-w-full">
        <div className="w-full">
          <h2 className="seth-heading mb-8 transition-colors duration-500 " ref={containerRef}>
            {words.map((word: string, index: number) => (
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
          <h3 className="seth-heading-2 mb-8" ref={descRef}>
            {descWords.map((word: string, index: number) => (
              <span
                key={index}
                className={`inline-block transition-colors duration-500 mr-2 ${
                  index <= descProgressIndex ? "text-seth-coral" : "text-seth-coral/30"
                }`}
              >
                {word}{index < descWords.length - 1 ? " " : ""}
              </span>
            ))}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default SpecializationSection;
