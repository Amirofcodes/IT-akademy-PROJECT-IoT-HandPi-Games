import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ALPHABET = ['A', 'B', 'C', 'D'];

const Game = () => {
  const [gameState, setGameState] = useState({
    message: 'No game in progress',
    currentLetterIndex: 0,
    score: 0,
    gameStarted: false,
    gameCompleted: false,
    videoError: false,
    detectedGesture: '',
  });

  const imgRef = useRef(null);

  useEffect(() => {
    let interval;
    if (gameState.gameStarted && !gameState.gameCompleted) {
      interval = setInterval(checkGesture, 1000);
    }
    return () => clearInterval(interval);
  }, [gameState.gameStarted, gameState.gameCompleted, gameState.currentLetterIndex]);

  const startGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/game/start');
      setGameState({
        ...gameState,
        gameStarted: true,
        currentLetterIndex: 0,
        score: 0,
        gameCompleted: false,
        message: `Game started! Show the letter: ${response.data.current_letter}`,
        videoError: false,
      });
    } catch (error) {
      console.error('Error starting game:', error);
      setGameState(prevState => ({
        ...prevState,
        message: 'Error starting game. Please try again.',
      }));
    }
  };

  const checkGesture = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/game/check');
      const { message, new_letter, score, predicted_gesture, expected_letter } = response.data;

      setGameState(prevState => {
        const newState = { ...prevState, detectedGesture: predicted_gesture };

        if (message === 'Correct!') {
          newState.score = score;
          if (prevState.currentLetterIndex === ALPHABET.length - 1) {
            newState.gameCompleted = true;
            newState.message = "Congratulations! You've completed the game!";
          } else {
            newState.currentLetterIndex = prevState.currentLetterIndex + 1;
            newState.message = `Correct! Now show the letter: ${new_letter}`;
          }
        } else if (message === 'Incorrect, try again') {
          newState.message = `Incorrect. Expected: ${expected_letter}, Detected: ${predicted_gesture}. Try again!`;
        } else if (message === 'No game in progress') {
          newState.gameStarted = false;
          newState.message = 'Game session expired. Please start a new game.';
        }

        return newState;
      });
    } catch (error) {
      console.error('Error checking gesture:', error);
      setGameState(prevState => ({
        ...prevState,
        message: 'Error checking gesture. Please ensure your camera is working.',
      }));
    }
  };

  const handleVideoError = () => {
    setGameState(prevState => ({
      ...prevState,
      videoError: true,
      message: 'Error loading video feed. Please check your camera and refresh the page.',
    }));
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
      {!gameState.gameStarted || gameState.gameCompleted ? (
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
            {gameState.gameCompleted ? "Play Again" : "Start Game"}
          </motion.button>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {!gameState.videoError ? (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              ref={imgRef}
              src="http://127.0.0.1:5001/video_feed"
              className="mb-4 rounded-lg"
              alt="Video feed"
              onError={handleVideoError}
            />
          ) : (
            <div className="mb-4 p-4 bg-red-500 text-white rounded-lg">
              Video feed unavailable. Please check your camera and refresh the page.
            </div>
          )}
          <p className="text-xl mb-2">{gameState.message}</p>
          <p className="text-2xl mb-2">Show the letter: {ALPHABET[gameState.currentLetterIndex]}</p>
          <p className="text-xl mb-2">Detected gesture: {gameState.detectedGesture}</p>
          <p className="text-xl mb-4">Score: {gameState.score} / {ALPHABET.length}</p>
          <div className="flex space-x-2 mb-4">
            {ALPHABET.map((letter, index) => (
              <motion.span
                key={letter}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  index < gameState.currentLetterIndex ? 'bg-green-500' :
                  index === gameState.currentLetterIndex ? 'bg-yellow-500' : 'bg-gray-500'
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

export default Game;