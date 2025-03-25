'use client';

import React, { useRef, useEffect, useState } from 'react';

const SpecializationSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-cream text-seth-coral py-12 md:py-16 w-full">
      <div className="container mx-auto px-6 max-w-full">
        <div className="w-full">
          <h2 
            ref={titleRef}
            className={`seth-heading mb-8 transition-colors duration-500 ${isVisible ? 'text-seth-coral' : 'text-gray-400'}`}
          >
            I specialise in brand language — partnering with founders, company teams and other creatives to build new brands and evolve existing ones.
          </h2>
        </div>
      </div>
    </div>
  );
};

export default SpecializationSection;
