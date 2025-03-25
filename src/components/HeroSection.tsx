import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-cream py-16 md:py-24">
      <div className="container mx-auto px-5 md:px-8 max-w-full">
        <h1 className="seth-heading text-seth-coral mb-8 w-full">
          We're UdeM AI,<br/>
          a community of AI enthusiasts <br/>
          @ the University of Montreal.
        </h1>

        <div className="mt-12">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=900&q=80"
              alt="UdeM AI Community"
              width={1600}
              height={900}
              className="w-full h-auto object-cover aspect-video"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
