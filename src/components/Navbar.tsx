'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="bg-cream w-full py-5 px-5 md:px-8 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link href="/" className="text-seth-coral font-medium text-2xl tracking-wide">
          UdeM AI_
        </Link>

        <button 
          onClick={toggleMenu} 
          className="h-8 w-8 rounded-full bg-seth-coral flex items-center justify-center cursor-pointer"
          aria-expanded={isMenuOpen}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          {/* <Menu className="text-white" size={18} strokeWidth={2} /> */}
        </button>
      </nav>

      {/* Full-page menu overlay */}
      <div 
        className={`fixed inset-0 bg-seth-coral z-50 flex items-center justify-center transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* UdeM AI_ branding in top-left */}
        <Link 
          href="/" 
          className="absolute top-5 left-5 md:left-8 text-white font-medium text-2xl tracking-wide"
          onClick={toggleMenu}
        >
          UdeM AI_
        </Link>
        
        <button 
          onClick={toggleMenu} 
          className="absolute top-5 right-5 md:right-8 h-8 w-8 rounded-full bg-white flex items-center justify-center cursor-pointer"
          aria-label="Close menu"
        >
          <span className="sr-only">Close</span>
          <X className="text-seth-coral" size={18} strokeWidth={3} />
        </button>

        <nav className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
          <Link 
            href="/team" 
            className="seth-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity"
            onClick={toggleMenu}
          >
            Meet the Team
          </Link>
          <Link 
            href="/activities" 
            className="seth-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity"
            onClick={toggleMenu}
          >
            Activities
          </Link>
          <Link 
            href="/resources" 
            className="seth-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity"
            onClick={toggleMenu}
          >
            Resources
          </Link>
          <Link 
            href="/blog" 
            className="seth-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity"
            onClick={toggleMenu}
          >
            Blog
          </Link>

        </nav>
        
        {/* Social links at bottom right */}
        <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 items-end md:items-center">
          <a 
            href="mailto:contact@udem.ai" 
            className="text-white hover:opacity-80 transition-opacity text-sm md:text-base"
          >
            EMAIL
          </a>
          <a 
            href="https://instagram.com/udem.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:opacity-80 transition-opacity text-sm md:text-base"
          >
            IG
          </a>
          <a 
            href="https://discord.gg/udemai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:opacity-80 transition-opacity text-sm md:text-base"
          >
            DISCORD
          </a>
          <a 
            href="https://linkedin.com/company/udem-ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-white hover:opacity-80 transition-opacity text-sm md:text-base"
          >
            LINKEDIN
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
