import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import GameCard from './GameCard';

const gamesData = [
  {
    image: "/public/img/alphabet.png",
    title: "ALPHABET",
    description: "Pratiquez les gestes de l'alphabet avec notre jeu. La caméra reconnaît vos gestes et fournit un retour instantané pour améliorer vos compétences. Idéal pour les personnes sourdes et ceux qui souhaitent apprendre la langue des signes.",
    buttonText: "ESSAYEZ"
  },
  {
    image: "/public/img/pierre-papier-ciseaux.png",
    title: "PIERRE, PAPIER, CISEAUX",
    description: "Un classique avec une touche moderne ! Utilisez des gestes de la main pour jouer à Pierre, papier, ciseaux. La caméra reconnaît vos mouvements et affiche les résultats à l'écran. Parfait pour le divertissement et l'entraînement des réflexes.",
    buttonText: "ESSAYEZ"
  },
  {
    image: "/public/img/pendu.png",
    title: "PENDU",
    description: "Devinez les lettres et sauvez le personnage dans notre jeu Pendu avec reconnaissance des gestes. Utilisez des gestes pour choisir les lettres et recevez un retour en temps réel. Un excellent moyen d'améliorer vos compétences en langue des signes.",
    buttonText: "ESSAYEZ"
  },
  {
    image: "/public/img/jeu-de-cartes.png",
    title: "JEU DE CARTES",
    description: "Jouez aux cartes en utilisant des gestes de la main. Notre jeu reconnaît vos mouvements et affiche les cartes sélectionnées à l'écran. Idéal pour les amateurs de jeux de cartes et ceux qui veulent essayer quelque chose de nouveau.",
    buttonText: "ESSAYEZ"
  }
];

const GameCardsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="bg-darker-blue py-12 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {gamesData.map((game, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, delay: index * 0.5 }}
          >
            <GameCard
              image={game.image}
              title={game.title}
              description={game.description}
              buttonText={game.buttonText}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default GameCardsSection;