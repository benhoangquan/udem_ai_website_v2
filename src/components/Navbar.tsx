import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-cream w-full py-5 px-5 md:px-8 flex justify-between items-center">
      <Link href="/" className="text-seth-coral font-medium tracking-wide">
        UdeM AI
      </Link>

      <div className="h-8 w-8 rounded-full bg-seth-coral flex items-center justify-center">
        <span className="sr-only">Menu</span>
      </div>
    </nav>
  );
};

export default Navbar;
