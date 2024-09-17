import React from 'react';
import { Link } from 'react-router-dom';
import ImageSlider from '../hero/Slider';

const ProcessSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between p-4 md:p-8 max-w-7xl mx-auto gap-20">
        <div className="lg:max-w-[620px] w-full max-w-xl mx-auto">
        <ImageSlider width="w-full" height="h-full" />
      </div>
      <div className="flex flex-col items-start space-y-6 lg:w-1/2 mb-8 lg:mb-0">
        <h2 className="text-2xl md:text-4xl font-bold">
        A PROPOS
        </h2>
        <h3 className="text-xl md:text-2xl  text-light-blue">DES JEUX </h3>
        <p className="text-base md:text-lg text-white max-w-prose">
        Découvrez notre projet innovant de jeux éducatifs basés sur la reconnaissance des gestes. En utilisant une technologie de pointe, nos jeux permettent d apprendre l alphabet en langue des signes, de jouer à Pierre, papier, ciseaux, de résoudre des énigmes dans le jeu Pendu et de s amuser avec des jeux de cartes, tout cela grâce à la reconnaissance des gestes par caméra. Nos jeux offrent une expérience interactive et immersive, idéale pour les personnes sourdes et les apprenants de la langue des signes. Rejoignez-nous et explorez de nouvelles façons de jouer et de communiquer grâce à nos jeux de reconnaissance des gestes.
        </p>
        <div className="relative inline-block group">
          <Link to="/game" className="block">
            <button className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full relative transition duration-300">
              <span>ESSAYER MAINTENANT</span>
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
      
    </section>
  );
};

export default ProcessSection;