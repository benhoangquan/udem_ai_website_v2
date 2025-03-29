'use client';

import React from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  return (
    <div 
      className={`fixed inset-0 bg-seth-coral z-50 flex items-center justify-center transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <Link 
        href="/" 
        className="absolute top-5 left-5 md:left-8 text-white font-medium text-2xl tracking-wide"
        onClick={onClose}
      >
        UdeM AI_
      </Link>

      <button 
        onClick={onClose}
        className="absolute top-5 right-5 md:right-8 h-8 w-8 rounded-full bg-white flex items-center justify-center"
        aria-label="Close menu"
      >
        <span className="sr-only">Close</span>
        <X className="text-seth-coral" size={18} strokeWidth={3} />
      </button>

      <nav className="flex flex-col items-center space-y-4 md:space-y-6">
        {[
          { href: '/team', label: 'Meet the Team' },
          { href: '/#activities', label: 'Activities' },
          { href: '/resources', label: 'Resources' },
          { href: '/blog', label: 'Blog' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="seth-heading text-white text-3xl md:text-4xl lg:text-5xl font-bold hover:opacity-80 transition-opacity"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-5 right-5 md:bottom-8 md:right-8 flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0 items-end md:items-center">
        {[
          { href: 'mailto:hey@udemai.ca', label: 'EMAIL' },
          { href: 'https://instagram.com/udem.ai', label: 'IG' },
          { href: 'https://discord.gg/2Ttnw8p2Hy', label: 'DISCORD' },
          { href: 'https://linkedin.com/company/udem-ai', label: 'LINKEDIN' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:opacity-80 transition-opacity text-sm md:text-base"
          >
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MobileMenu;