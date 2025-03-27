'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivityDisplay } from '@/types/activity';
import ActivityCard from '@/components/activities/ActivityCard';

// Mock data for fallback with correct typing
const fallbackProjects: ActivityDisplay[] = [
  {
    _id: '1',
    title: 'Intro to Machine Learning Workshop',
    slug: 'ml-workshop-1',
    description: 'Hands-on beginner workshop exploring supervised learning basics.',
    mainImageUrl: 'https://images.unsplash.com/photo-1559028012-dae1b1ee2496?auto=format&fit=crop&w=600&q=80',
    type: 'workshop',
    categories: ['Supervised Learning', 'Scikit-learn', 'Hands-on', 'Beginner'],
    startDateTime: new Date().toISOString(),
    location: {
      type: 'in_person',  
      address: '123 Main St, Anytown, USA',
    },
  },
  // ... more fallback items if needed
];

interface ActivitiesCarouselProps {
  activities?: ActivityDisplay[];
  cardClassName?: string;
  imageContainerClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dateClassName?: string;
  tagClassName?: string;
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({ 
  activities,
  cardClassName,
  imageContainerClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
  dateClassName,
  tagClassName,
}) => {
  // Use provided activities or fallback to mock data
  const projects = activities && activities.length > 0 ? activities : fallbackProjects;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      scrollToIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < projects.length - 1) {
      setCurrentIndex(prev => prev + 1);
      scrollToIndex(currentIndex + 1);
    } else {
      // Loop back to the first slide
      setCurrentIndex(0);
      scrollToIndex(0);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const items = container.querySelectorAll('.snap-center');
      
      if (items[index]) {
        const item = items[index] as HTMLElement;
        const containerLeft = container.getBoundingClientRect().left;
        const itemLeft = item.getBoundingClientRect().left;
        const scrollPosition = container.scrollLeft + (itemLeft - containerLeft);
        
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    scrollToIndex(index);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(prev => !prev);
  };

  useEffect(() => {
    if (isAutoScrolling) {
      // Start auto-scrolling at 3-second intervals
      autoScrollIntervalRef.current = setInterval(() => {
        if (currentIndex < projects.length - 1) {
          setCurrentIndex(prev => prev + 1);
          scrollToIndex(currentIndex + 1);
        } else {
          // Loop back to the first slide
          setCurrentIndex(0);
          scrollToIndex(0);
        }
      }, 3000);
    } else if (autoScrollIntervalRef.current) {
      // Stop auto-scrolling if it's disabled
      clearInterval(autoScrollIntervalRef.current);
    }

    // Clean up interval on component unmount or when dependencies change
    return () => {
      if (autoScrollIntervalRef.current) {
        clearInterval(autoScrollIntervalRef.current);
      }
    };
  }, [isAutoScrolling, currentIndex, projects.length]);

  // Stop auto-scrolling when user interacts with navigation
  const handleUserInteraction = (callback: () => void) => {
    return () => {
      if (isAutoScrolling) {
        setIsAutoScrolling(false);
      }
      callback();
    };
  };

  return (
    <div className="w-full  relative">
      <div className="w-full">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide h-full"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className="flex-shrink-0 w-full md:w-[400px] h-[500px] snap-center px-2"
            >
              <ActivityCard 
                activity={project}
                className={cardClassName}
                imageContainerClassName={imageContainerClassName}
                contentClassName={contentClassName}
                titleClassName={titleClassName}
                descriptionClassName={descriptionClassName}
                dateClassName={dateClassName}
                tagClassName={tagClassName}
              />
            </div>
          ))}
        </div>
        {/* Navigation row container */}
        <div className="relative w-full flex items-center justify-between mt-4">
          {/* Navigation controls */}
          <div className="flex-1">
            {/* This empty div helps maintain center alignment for dots */}
          </div>

          {/* Dot indicators - centered */}
          <div className="flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? 'w-8 bg-cream' : 'w-2 bg-gray-300'
                }`}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollToIndex(index);
                  if (isAutoScrolling) {
                    setIsAutoScrolling(false);
                  }
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation controls - right aligned */}
          <div className="flex-1 flex justify-end gap-2">
            <button 
              className="h-10 w-10 rounded-full bg-cream text-seth-coral flex items-center justify-center hover:bg-opacity-90 transition-colors"
              onClick={handleUserInteraction(handlePrevious)}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              className="h-10 w-10 rounded-full bg-cream text-seth-coral flex items-center justify-center hover:bg-opacity-90 transition-colors"
              onClick={handleUserInteraction(handleNext)}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};


export default ActivitiesCarousel;
