import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from './Slider';

const HeroSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-start space-y-6 lg:w-1/2 mb-8 lg:mb-0">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent leading-tight">
          Apprentissage de l'Alphabet en Langue des Signes
        </h1>
        <p className="text-base md:text-lg text-white max-w-prose">
          Un jeu pour apprendre l'alphabet en langue des signes en utilisant une
          caméra et la technologie de reconnaissance des gestes. Pratiquez les
          positions des mains correspondant à chaque lettre de l'alphabet de
          manière interactive, idéal pour les personnes sourdes et tous ceux
          souhaitant apprendre la langue des signes. Imaginez vous et découvrez de
          nouvelles possibilités de communication!
        </p>
        <div className="relative inline-block group">
          <Link to="/game" className="block">
            <button className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full relative transition duration-300">
              <span>DÉCOUVRIR</span>
            </button>
            <div className="absolute right-[-30px] md:right-[-120px] top-1/2 transform -translate-y-1/2 transition-transform duration-300 group-hover:translate-x-2">
              <img 
                src="/public/img/arrow.png" 
                alt="Arrow" 
                className="w-6 h-6 md:w-20 md:h-4 animate-blink"
              />
            </div>
          </Link>
        </div>
      </div>
      <div className="lg:w-1/2 w-full max-w-xl mx-auto">
        <ImageSlider width="w-full" height="h-full" />
      </div>
    </section>
  );
};

export default HeroSection;