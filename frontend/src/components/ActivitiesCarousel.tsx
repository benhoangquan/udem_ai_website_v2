'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { ActivityDisplay } from '@/types/activity';

// Mock data for fallback with correct typing
const fallbackProjects: ActivityDisplay[] = [
  {
    _id: '1',
    title: 'Intro to Machine Learning Workshop',
    slug: 'ml-workshop-1',
    description: 'Hands-on beginner workshop exploring supervised learning basics.',
    imageUrl: 'https://images.unsplash.com/photo-1559028012-dae1b1ee2496?auto=format&fit=crop&w=600&q=80',
    categories: ['WORKSHOP'],
    tags: ['Supervised Learning', 'Scikit-learn', 'Hands-on', 'Beginner'],
    startDateTime: new Date().toISOString(),
    type: 'workshop'
  },
  // ... more fallback items if needed
];

interface ActivitiesCarouselProps {
  activities?: ActivityDisplay[];
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({ activities }) => {
  // Use provided activities or fallback to mock data
  const projects = activities && activities.length > 0 ? activities : fallbackProjects;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
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
      const itemWidth = scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
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

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Helper function to get description text safely
  const getDescriptionText = (project: ActivityDisplay): string => {
    if (typeof project.description === 'string') {
      if (project.description.length > 200) {
        return project.description.slice(0, 200) + '...';
      }
      return project.description;
    }
    return '';
  };

  return (
    <div className="text-white py-16 md:py-24 w-full overflow-hidden">
      <div className="container mx-auto px-0 max-w-full relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div 
              key={project._id} 
              className="flex-shrink-0 w-[85%] sm:w-[70%] md:w-[40%] lg:w-[30%] snap-center px-4"
            >
              <div className="bg-white rounded-lg overflow-hidden project-card w-full h-full mx-auto">
                <div className="aspect-square relative">
                  <Image
                    src={project.imageUrl || '/placeholder-image.jpg'}
                    alt={project.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex flex-col h-full p-6 text-seth-coral">
                  <div>
                    <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                    <p className="text-dark-gray mb-4">{getDescriptionText(project)}</p>
                    <p className="text-dark-gray mb-4">
                      {project.startDateTime && formatDate(project.startDateTime)}
                    </p>
                  </div>
                  <div className="">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tags && project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs text-dark-gray/70">
                          {tag}{idx < (project.tags?.length || 0) - 1 ? ',' : ''}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4">
                      {project.categories && project.categories.map((category, idx) => (
                        <span
                          key={idx}
                          className="inline-block bg-seth-coral text-white px-4 py-1 rounded-full text-sm mr-2"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2 items-center">
            <button 
              className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={handleUserInteraction(handlePrevious)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={handleUserInteraction(toggleAutoScroll)}
            >
              {isAutoScrolling ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </button>
            
            <button 
              className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={handleUserInteraction(handleNext)}
              disabled={currentIndex === projects.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-8 bg-white' : 'w-2 bg-white bg-opacity-50'
              }`}
              onClick={handleUserInteraction(() => goToSlide(index))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};


export default ActivitiesCarousel;
