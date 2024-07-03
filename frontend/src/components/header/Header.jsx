import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <div className="space-y-1 cursor-pointer" onClick={toggleMenu}>
          <div className="w-16 h-2 bg-button-gradient rounded-full"></div>
          <div className="w-8 h-2 bg-button-gradient rounded-full"></div>
          <div className="w-16 h-2 bg-button-gradient rounded-full"></div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-grow">
        <Link to="/">
          <img src="/public/img/header-logo.png" alt="HandPi Games" className="h-16" />
        </Link>
      </div>
      <div className="flex items-center">
        <Link to="/game" className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full">
          Game
        </Link>
      </div>
      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex flex-col items-start p-6 z-50" style={{ width: '20%' }}>
          <XMarkIcon className="h-6 w-6 self-end cursor-pointer" onClick={toggleMenu} />
          <nav className="mt-4 space-y-4">
            <Link to="/" className="block text-white hover:text-green-500">Home</Link>
            <Link to="/game" className="block text-white hover:text-green-500">Game</Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
