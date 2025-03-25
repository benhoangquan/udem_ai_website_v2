'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';

const ServicesSection: React.FC = () => {
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
    <div className="bg-off-white py-16 md:py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 
          ref={titleRef}
          className={`seth-heading mb-8 transition-colors duration-500 ${
            isVisible ? 'text-seth-coral' : 'text-gray-400'
          }`}
        >
          Let's create something incredible together.
        </h2>

        <p className="text-xl text-dark-gray mb-16">
          There are two ways to work with me.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Projects Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">
              Projects
            </h3>

            <p className="text-dark-gray mb-8 flex-grow">
              The standard approach for most engagements. Whether it's a verbal identity, tone of voice, website or campaign, we'll define a scope of work with a fixed price to help you reach your goals.
            </p>

            <Link
              href="/contact"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              Schedule a chat
            </Link>
          </div>

          {/* Partnerships Card */}
          <div className="border border-seth-coral/30 p-8 md:p-10 rounded-lg flex flex-col">
            <h3 className="text-seth-coral text-3xl md:text-4xl mb-6">
              Partnerships
            </h3>

            <p className="text-dark-gray mb-8 flex-grow">
              A flexible approach for clients who need ongoing support. We'll decide on a number of days per month and then dial up or down my time as needed. Ideal for marketing copy and content strategy.
            </p>

            <Link
              href="/contact"
              className="bg-seth-coral text-white py-3 px-6 rounded-full inline-block w-max text-center hover:bg-seth-coral/90 transition-colors"
            >
              Schedule a chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;
