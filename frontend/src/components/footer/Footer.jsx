import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-white p-4 bg-dark-blue">
      <div className="flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="max-w-[215px] sm:w-auto mb-4 sm:mb-0 order-2 sm:order-1">
          <Link to="/game" className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-12 md:px-20 rounded-full block text-center">
            Game
          </Link>
        </div>
        
        <div className="mb-4 sm:mb-0 order-1 sm:order-2">
          <img src="/public/img/footer-logo.png" alt="Logo" className="h-15 md:h-22" />
        </div>
        
        <div className="w-full sm:w-auto order-3">
          <form className="flex items-center justify-center sm:justify-end">
            <div className="relative">
              <input
                type="email"
                placeholder="Votre email"
                className="bg-gradient-to-r from-[#70DD4A] to-[#FFFFFF] text-gray-800 rounded-full py-2 pl-4  pr-28 focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full bg-transparent px-4"
              >
                <img src="/public/img/arrow-small.png" alt="Submit" className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;