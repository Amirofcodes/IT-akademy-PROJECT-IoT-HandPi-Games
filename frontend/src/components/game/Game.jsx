import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const ALPHABET = ['A', 'B', 'C', 'D'];
const API_BASE_URL = 'http://192.168.1.90:5001';  // Ensure this matches your Raspberry Pi's IP

const Game = () => {
  const [message, setMessage] = useState('No game in progress');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('');

  const imgRef = useRef(null);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameCompleted) {
      interval = setInterval(checkGesture, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameCompleted, currentLetterIndex]);

  const startGame = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/game/start`);
      setGameStarted(true);
      setCurrentLetterIndex(0);
      setScore(0);
      setGameCompleted(false);
      setMessage(`Game started! Show the letter: ${response.data.current_letter}`);
    } catch (error) {
      console.error('Error starting game:', error);
      setMessage(`Error starting game: ${error.response?.data?.message || error.message}`);
    }
  };

  const checkGesture = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/game/check`);
      const { message, new_letter, score, predicted_gesture, expected_letter } = response.data;

      setDetectedGesture(predicted_gesture);
      setScore(score);

      if (message === 'Correct!') {
        if (currentLetterIndex === ALPHABET.length - 1) {
          setGameCompleted(true);
          setMessage("Congratulations! You've completed the game!");
        } else {
          setCurrentLetterIndex(prev => prev + 1);
          setMessage(`Correct! Now show the letter: ${new_letter}`);
        }
      } else if (message === 'Incorrect, try again') {
        setMessage(`Incorrect. Expected: ${expected_letter}, Detected: ${predicted_gesture}. Try again!`);
      } else if (message === 'Game ended') {
        setGameCompleted(true);
        setMessage(`Game ended. Final score: ${score}`);
      } else {
        setMessage(message);
      }
    } catch (error) {
      console.error('Error checking gesture:', error);
      setMessage(`Error checking gesture: ${error.response?.data?.message || error.message}`);
    }
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
            {gameCompleted ? "Play Again" : "Start Game"}
          </motion.button>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <img
            src={`${API_BASE_URL}/video_feed`}
            className="mb-4 rounded-lg"
            alt="Video feed"
          />
          <p className="text-xl mb-2">{message}</p>
          <p className="text-2xl mb-2">Show the letter: {ALPHABET[currentLetterIndex]}</p>
          <p className="text-xl mb-2">Detected gesture: {detectedGesture}</p>
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

export default Game;
