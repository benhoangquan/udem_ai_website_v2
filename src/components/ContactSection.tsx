import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ContactSection: React.FC = () => {
  return (
    <div className="bg-seth-coral">
      <div className="relative z-10 py-20 md:py-32 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col items-center text-center">
            {/* Social Media Icons */}
            <div className="flex gap-6 mb-12">
              <Link 
                href="https://www.instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-seth-coral transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link 
                href="https://www.linkedin.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-seth-coral transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>

            <h2 className="text-5xl md:text-6xl text-white font-medium mb-8">
              hey@getseth.com
            </h2>

            <div className="text-white opacity-80 mt-16">
              © UdeM AI
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
