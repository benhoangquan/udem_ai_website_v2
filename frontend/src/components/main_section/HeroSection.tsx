import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TypeWriter from '@/components/ui/TypeWriter';

// Array of images for the carousel
const carouselImages = [
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "UdeM AI Community"
  },
  {
    src: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "AI Programming"
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "AI Workshop"
  },
  {
    src: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80",
    alt: "AI Research"
  }
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  useEffect(() => {
    // Set up automatic image rotation every 3 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    
    // Clean up the interval when component is unmounted
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-8 max-w-full">
        <div className="seth-heading text-seth-coral mb-8 w-full">
          <TypeWriter 
            text="We're UdeM AI,"
            className="block mb-2"
            tag="span"
            speed={40}
          />
          <TypeWriter 
            text="club of AI builders"
            className="block mb-2"
            tag="span"
            speed={40}
            startDelay={1600} // Start after first line finishes
          />
          <TypeWriter 
            text="@ University of Montreal."
            className="block"
            tag="span"
            speed={40}
            startDelay={3200} // Start after second line finishes
          />
        </div>

        <div className="mt-12">
          <div className="rounded-lg overflow-hidden relative">
            {carouselImages.map((image, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1600}
                  height={900}
                  className="w-full h-auto object-cover aspect-video"
                  priority={index === 0}
                />
              </div>
            ))}
            {/* This empty div maintains the aspect ratio */}
            <div className="relative w-full pb-[56.25%]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
