import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import TypeWriter from '@/components/common/TypeWriter';
import TypeWriterLoop from '../common/TypeWriterLoop';
import { useTranslations } from 'next-intl';

// Array of images for the carousel
// Images should be placed in: public/images/hero/
const carouselImages = [
  {
    src: "/images/hero/hero-1.jpg",
    alt: "UdeM AI Community"
  },
  {
    src: "/images/hero/hero-2.jpg",
    alt: "AI Programming"
  },
  {
    src: "/images/hero/hero-3.jpg",
    alt: "AI Workshop"
  },
  {
    src: "/images/hero/hero-4.jpg",
    alt: "AI Research"
  }
];

const HeroSection: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const t = useTranslations('hero');
  
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
          {/* <TypeWriter 
            text="We're UdeM AI,"
            className="block mb-2"
            tag="span"
            speed={40}
          /> */}
          <span className="block mb-1">{t('greeting')}</span>
          <TypeWriterLoop 
            texts={[t('club'), t('community'), t('group')]}
            className="block mb-1"
            tag="span"
            speed={60}
            startDelay={1600} // Start after first line finishes
          />
          <TypeWriter 
            text={t('location')}
            className="block mb-1"
            tag="span"
            speed={60}
            startDelay={1600} // Start after second line finishes
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
