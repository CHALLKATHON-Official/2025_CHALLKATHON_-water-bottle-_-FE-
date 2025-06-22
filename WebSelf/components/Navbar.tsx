import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import React from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50 px-6 py-3 bg-white shadow
        transform transition-all duration-500
        ${scrolled ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10 pointer-events-none'}
      `}
    >
      <div className="flex items-center justify-between max-w-5xl mx-auto">
        <Link to="/" className="flex items-center space-x-2">
          <img src="../public/WebSelf_logo_nobg.png" alt="WebSelf Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">WebSelf</span>
        </Link>
        <div className="space-x-4 text-sm">
          <Link to="/analysis1">분석1</Link>
          <Link to="/analysis2">분석2</Link>
          <Link to="/analysis3">분석3</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
