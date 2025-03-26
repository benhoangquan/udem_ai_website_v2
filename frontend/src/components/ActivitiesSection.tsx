'use client';

import React, { useRef, useEffect, useState } from 'react';
import ActivitiesCarousel from "@/components/ActivitiesCarousel";
import { ActivityDisplay } from '@/types/activity';

interface ActivitiesCarouselProps {
  activities: ActivityDisplay[];
}

const ActivitiesSection: React.FC<ActivitiesCarouselProps> = ({ activities }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`transition-colors duration-700 py-16 md:py-24 text-white ${
        isVisible ? 'bg-seth-coral' : 'bg-seth-coral/30'
      }`}
    >
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="md:max-w-3xl">
          <p className="seth-heading leading-tight font-medium">
            Want to know what we're up to?
          </p>

          <p className="seth-heading-2 leading-snug font-medium mt-6">
            Check out our activities.
          </p>
        </div>
      </div>
      <ActivitiesCarousel activities={activities} />

    </div>
  );
};

export default ActivitiesSection;
