'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Project = {
  id: number;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  categories: string[];
  tags: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: 'Dancing',
    slug: 'dancing',
    description: 'Mother-daughter vineyard in Sonoma celebrating life through the senses.',
    imageUrl: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    categories: ['LIFESTYLE'],
    tags: ['Brand Strategy', 'Verbal Identity', 'Tone of Voice', 'Website Language', 'Naming', 'Packaging', 'Marketing']
  },
  {
    id: 2,
    title: 'Söller Tennis Club',
    slug: 'soller-tennis-club',
    description: 'A wellness and lifestyle community perched in the mountains of Söller.',
    imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    categories: ['TOURISM'],
    tags: ['Verbal Identity', 'Tone of Voice', 'Website Language']
  },
  {
    id: 3,
    title: 'Silco',
    slug: 'silco',
    description: 'A Cornish drinks harbour-side bar.',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    categories: ['FOOD & DRINK'],
    tags: ['Verbal Identity', 'Tone of Voice', 'Naming', 'Website Language', 'Packaging']
  },
  {
    id: 4,
    title: 'Dancing',
    slug: 'dancing',
    description: 'Mother-daughter vineyard in Sonoma celebrating life through the senses.',
    imageUrl: 'https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80',
    categories: ['LIFESTYLE'],
    tags: ['Brand Strategy', 'Verbal Identity', 'Tone of Voice', 'Website Language', 'Naming', 'Packaging', 'Marketing']
  },
];

const PortfolioSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="bg-seth-coral text-white py-16 md:py-24 w-full overflow-hidden">
      <div className="container mx-auto px-0 max-w-full relative">
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className="flex-shrink-0 w-full snap-center px-8"
            >
              <div className="bg-white rounded-lg overflow-hidden project-card max-w-4xl mx-auto">
                <div className="aspect-square relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 text-seth-coral">
                  <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                  <p className="text-dark-gray mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-xs text-dark-gray/70">
                        {tag}{idx < project.tags.length - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4">
                    {project.categories.map((category, idx) => (
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
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <div className="flex gap-2 items-center">
            <button 
              className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <span className="sr-only">Previous</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="flex gap-2 mx-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-3 rounded-full transition-all ${
                    currentIndex === index ? 'w-8 bg-white' : 'w-3 bg-white opacity-50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button 
              className="h-12 w-12 rounded-full border-2 border-white flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-colors"
              onClick={handleNext}
              disabled={currentIndex === projects.length - 1}
            >
              <span className="sr-only">Next</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L15 12L9 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSection;
