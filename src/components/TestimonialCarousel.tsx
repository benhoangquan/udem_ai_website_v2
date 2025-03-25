"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Monty Berrow',
    role: 'Co-Founder',
    company: 'at Berrow',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: '"Seth produced a narrative that literally gave me goosebumps. It was so refreshing to work with someone who truly listened and understood what we wanted to achieve. Seth is the most talented brand writer I have seen in action."'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'CEO',
    company: 'at Acme Inc',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: '"Working with Seth was transformative for our brand. He captured our essence and translated it into words that resonated with our audience on a deep level."'
  },
  {
    id: 3,
    name: 'John Davis',
    role: 'Marketing Director',
    company: 'at TechFlow',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    quote: '"Seth has an extraordinary ability to distill complex ideas into compelling narratives. His strategic approach to brand messaging helped us redefine our market position."'
  },
];

const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-seth-coral text-white py-16 md:py-24 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.id}
            className={`transition-opacity duration-500 absolute inset-0 flex flex-col justify-center px-6 ${
              index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ display: index === activeIndex ? 'flex' : 'none' }}
          >
            <div className="flex items-center mb-8">
              <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                <Image
                  src={testimonial.avatarUrl}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-xl">{testimonial.name}</h3>
                <p className="text-white/80">{testimonial.role} {testimonial.company}</p>
              </div>
            </div>

            <div className="testimonial mb-8">
              <p className="text-3xl md:text-4xl lg:text-5xl leading-tight font-medium">
                {testimonial.quote}
              </p>
            </div>
          </div>
        ))}

        <div className="nav-dots mt-12 relative z-20">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`nav-dot bg-white ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;
