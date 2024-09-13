import React, { useState, useRef, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="text-white p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center justify-between w-full sm:w-auto mb-4 sm:mb-0">
          <div className="space-y-1 cursor-pointer" onClick={toggleMenu}>
            <div className="w-16 h-2 bg-button-gradient rounded-full"></div>
            <div className="w-8 h-2 bg-button-gradient rounded-full"></div>
            <div className="w-16 h-2 bg-button-gradient rounded-full"></div>
          </div>
          <Link to="/" className="sm:hidden">
            <img src="/public/img/header-logo.png" alt="HandPi Games" className="h-16" />
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-center flex-grow">
          <Link to="/">
            <img src="/public/img/header-logo.png" alt="HandPi Games" className="h-16" />
          </Link>
        </div>
        <div className="w-full sm:w-auto mt-4 sm:mt-0">
          <Link to="/game" className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full block text-center">
            Game
          </Link>
        </div>
      </div>
      {isOpen && (
        <div ref={menuRef} className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-start p-6 z-50" style={{ width: '80%', maxWidth: '300px' }}>
          <XMarkIcon className="h-6 w-6 self-end cursor-pointer" onClick={toggleMenu} />
          <nav className="mt-4 space-y-4">
            <Link to="/" className="block text-white hover:text-green-500" onClick={toggleMenu}>Home</Link>
            <Link to="/game" className="block text-white hover:text-green-500" onClick={toggleMenu}>Game</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
