import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ALPHABET = ['A', 'B', 'C', 'D'];  // Our target letters for the mini-game

const Game = () => {
  const [message, setMessage] = useState('No game in progress');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);  // Track the current letter
  const [score, setScore] = useState(0);  // Track the score
  const [gameStarted, setGameStarted] = useState(false);  // Track if the game is started
  const [gameCompleted, setGameCompleted] = useState(false);  // Track if the game is completed
  const imgRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(checkGesture, 1000);  // Check gesture every second
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted, currentLetterIndex]);

  // Function to start the game
  const startGame = () => {
    setGameStarted(true);
    setCurrentLetterIndex(0);  // Reset to the first letter (A)
    setScore(0);  // Reset the score
    setGameCompleted(false);  // Game isn't completed
    setMessage("Game started! Show the letter: A");  // Prompt the user
  };

  // Function to check the current gesture with the expected one
  const checkGesture = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/game/check', {
        gesture: ALPHABET[currentLetterIndex]  // Send the expected letter (A, B, C, or D)
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      const { message, new_letter, score } = response.data;

      // If the gesture is correct, proceed to the next letter or complete the game
      if (message === 'Correct!') {
        setScore(score);
        if (currentLetterIndex === ALPHABET.length - 1) {
          setGameCompleted(true);
          setMessage("Félicitations ! Vous avez terminé le jeu !");
        } else {
          setCurrentLetterIndex(currentLetterIndex + 1);
          setMessage(`Show the letter: ${ALPHABET[currentLetterIndex + 1]}`);
        }
      } else {
        setMessage('Incorrect, try again!');
      }
    } catch (error) {
      console.error('Error checking gesture:', error);
      setMessage('Erreur lors de la vérification du geste');
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen text-white container">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent">
        COMMENCER l'ALPHABET
      </h1>
      {!gameStarted || gameCompleted ? (
        <button
          onClick={startGame}
          className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full"
        >
          {gameCompleted ? "Rejouer" : "Démarrer le jeu"}
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <img 
            ref={imgRef}
            src="http://127.0.0.1:5001/video_feed"  // Ensure video feed from the backend
            className="mb-4 rounded-lg"
            alt="Video feed"
          />
          <p className="text-xl mb-2">{message}</p>
          <p className="text-2xl mb-2">Montrez la lettre: {ALPHABET[currentLetterIndex]}</p>
          <p className="text-xl mb-4">Score: {score} / {ALPHABET.length}</p>
          <div className="flex space-x-2 mb-4">
            {ALPHABET.map((letter, index) => (
              <span 
                key={letter} 
                className={`w-8 h-8 flex items-center justify-center rounded-full ${
                  index < currentLetterIndex ? 'bg-green-500' : 
                  index === currentLetterIndex ? 'bg-yellow-500' : 'bg-gray-500'
                }`}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
