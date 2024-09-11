import React, { useState, useRef, useEffect } from "react";

import { motion } from "framer-motion";

const ALPHABET = ['A', 'B', 'C', 'D']; // Только 4 буквы

const Game = () => {
  const [message] = useState('');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(checkGesture, 1000); // Проверять жест каждую секунду
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted]);

  const startGame = () => {
    setGameStarted(true);
    setCurrentLetterIndex(0);
    setScore(0);
    setGameCompleted(false);
  };

  const checkGesture = async () => {
    // ... (оставить как есть)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white container mx-auto px-4">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent"
      >
        COMMENCER l'ALPHABET
      </motion.h1>
      {!gameStarted || gameCompleted ? (
        <>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg mb-4 text-center max-w-2xl"
          >
            Pratiquez l'alphabet en langue des signes avec notre jeu interactif. Montrez les gestes devant la caméra et voyez si vous pouvez compléter tout l'alphabet !
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={startGame}
            className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full"
          >
            {gameCompleted ? "Rejouer" : "Démarrer le jeu"}
          </motion.button>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            ref={imgRef}
            src="http://127.0.0.1:5001/video_feed"
            className="mb-4 rounded-lg"
            alt="Video feed"
          />
          <p className="text-xl mb-2">{message}</p>
          <p className="text-2xl mb-2">Montrez la lettre: {ALPHABET[currentLetterIndex]}</p>
          <p className="text-xl mb-4">Score: {score} / {ALPHABET.length}</p>
          <div className="flex space-x-2 mb-4">
            {ALPHABET.map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  index < currentLetterIndex ? 'bg-green-500' :
                  index === currentLetterIndex ? 'bg-yellow-500' : 'bg-gray-500'
                }`}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Game