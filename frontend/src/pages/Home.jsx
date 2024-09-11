import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import HeroSection from '../components/hero/HeroSection';
import InfoSection from '../components/introductionSection/IntroductionSection';
import GameCardsSection from '../components/cardSection/GameCardSection';
import ProcessSection from '../components/processSection/ProcessSection';
import AboutSection from '../components/aboutSection/AboutSection';

const BackgroundLine = ({ imagePath, className }) => (
  <img src={imagePath} alt="Background line" className={`absolute w-full ${className}`} />
);

BackgroundLine.propTypes = {
  imagePath: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

const AnimatedSection = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      <BackgroundLine
        imagePath="/public/img/line-bg.png"
        className="top-1/2 left-0 z-10 translate-y-1/2"
      />
      <BackgroundLine
        imagePath="/public/img/line-2.png"
        className="top-80 left-20 z-10"
      />

      <div className="relative z-20">
        <AnimatedSection>
          <HeroSection />
        </AnimatedSection>
        <AnimatedSection>
          <InfoSection
            mainTitle="POURQUOI UTILISER"
            subTitle="NOTRE JEU?"
            text="Notre jeu pour apprendre l'alphabet en langue des signes offre une opportunité unique de pratiquer grâce à la technologie de reconnaissance des gestes. Améliorez vos compétences en langue des signes de manière interactive et amusante. Parfait pour les personnes sourdes, les apprenants de la langue des signes, et tous ceux qui souhaitent découvrir de nouvelles possibilités de communication."
            arrowImagePath="/public/img/arrow-long.png"
          />
        </AnimatedSection>
        <AnimatedSection>
          <GameCardsSection />
        </AnimatedSection>
        <AnimatedSection>
          <InfoSection
            mainTitle="INTRODUCTION"
            subTitle="AUX NOS JEUX"
            text="Découvrez notre collection innovante de jeux utilisant la reconnaissance des gestes pour une expérience interactive unique. Utilisez vos mains pour interagir avec le jeu, que ce soit pour apprendre l'alphabet en langue des signes, jouer à Pierre, papier, ciseaux, résoudre des énigmes dans le jeu Pendu ou défier vos amis dans des jeux de cartes. Rejoignez-nous et explorez de nouvelles façons de jouer et de communiquer grâce à la technologie de reconnaissance des gestes."
            arrowImagePath="/public/img/arrow-long.png"
          />
        </AnimatedSection>
        <AnimatedSection>
          <ProcessSection />
        </AnimatedSection>
        <AnimatedSection>
          <InfoSection
            mainTitle="COMMENT NOUS CREONS"
            subTitle="NOS JEUS?"
            text="Découvrez notre processus de création de jeux basés sur la reconnaissance des gestes. Nous utilisons une technologie avancée pour vous offrir une expérience interactive et engageante. Nos jeux vous permettent d'apprendre l'alphabet en langue des signes, de jouer à Pierre, papier, ciseaux, de résoudre des énigmes dans le jeu Pendu et de s'amuser avec des jeux de cartes, tout cela grâce à la reconnaissance des gestes par caméra"
            arrowImagePath="/public/img/arrow-long.png"
          />
        </AnimatedSection>
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Home;