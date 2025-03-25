"use client";

import React, { useRef, useEffect, useState } from 'react';

const titleText =
  "For more than a decade, I've helped clients stand out through clear positioning, brand messaging and stories that move people.";

const ExperienceSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // progress: 0 (no color) to 1 (all primary color)
  const [progressIndex, setProgressIndex] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate the viewport's vertical midpoint.
        const viewportMid = window.innerHeight / 2;
        // Calculate the distance between the container's top and the viewport midpoint.
        const distance = viewportMid - rect.top;
        // Map that distance to a progress percentage relative to the container's height.
        const newProgress = Math.min(Math.max(distance / rect.height, 0), 1);
        // Split the title into words.
        const words = titleText.split(' ');
        // Map the progress to an index.
        const newProgressIndex = Math.floor(newProgress * words.length);
        setProgressIndex(newProgressIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial call to set progress
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split the title text into words
  const words = titleText.split(' ');

  return (
    <div className="bg-cream py-12 md:py-16 w-full" ref={containerRef}>
      <div className="container mx-auto px-6 max-w-full">
        <div className="w-full">
          <h1 className="seth-heading mb-8">
            {progressIndex}
          </h1>
          <h2 className="seth-heading mb-8 transition-colors duration-500">
            {words.map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-colors duration-500 mr-2 ${
                  index <= progressIndex ? "text-seth-coral" : "text-gray-400"
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