'use client';

import React, { useRef, useEffect, useState } from 'react';

const ServicesList: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`transition-colors duration-700 py-16 md:py-24 text-white ${
        isVisible ? 'bg-seth-coral' : 'bg-gray-500'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="md:max-w-3xl">
          <p className="text-3xl md:text-4xl lg:text-5xl leading-tight font-medium">
            Verbal identities, naming, brand narratives, impact statements, culture and values, tone of voice, website language, product launch, marketing campaigns.
          </p>

          <p className="text-3xl md:text-4xl lg:text-5xl leading-tight font-medium mt-8 font-bold">
            Anything that's core to your brand.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesList;
