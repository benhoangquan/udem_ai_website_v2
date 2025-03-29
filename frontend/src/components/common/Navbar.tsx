'use client';

import React from 'react';
import Link from 'next/link';
import { useMenuToggle } from '@/hooks/useMenuToggle';
import MobileMenu from './MobileMenu';

const Navbar: React.FC = () => {
  const { isOpen, toggleMenu, closeMenu } = useMenuToggle();

  return (
    <>
      <nav className="bg-cream w-full py-5 px-5 md:px-8 flex justify-between items-center fixed top-0 left-0 z-50">
        <Link href="/" className="text-seth-coral font-medium text-2xl tracking-wide">
          UdeM AI_
        </Link>

        <button
          onClick={toggleMenu}
          className="h-8 w-8 rounded-full bg-seth-coral flex items-center justify-center"
          aria-label="Open menu"
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Menu</span>
        </button>
      </nav>

      <MobileMenu isOpen={isOpen} onClose={closeMenu} />
    </>
  );
};



export default Navbar;