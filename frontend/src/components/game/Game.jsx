import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ALPHABET = ['A', 'B', 'C', 'D']; // Только 4 буквы

const Game = () => {
  const [message, setMessage] = useState('');
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
    try {
      const response = await axios.post('http://127.0.0.1:5001/check_gesture', {}, {
        headers: { 'Content-Type': 'application/json' }
      });
      console.log('Response from server:', response.data);
      setMessage(response.data.message || 'Geste vérifié');
      if (response.data.predicted_character === ALPHABET[currentLetterIndex]) {
        setScore(prevScore => prevScore + 1);
        if (currentLetterIndex === ALPHABET.length - 1) {
          setGameCompleted(true);
          setMessage("Félicitations ! Vous avez terminé le jeu !");
        } else {
          setCurrentLetterIndex(prevIndex => prevIndex + 1);
        }
      }
    } catch (error) {
      console.error('Error checking gesture:', error);
      setMessage('Erreur lors de la vérification du geste');
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen text-white container">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent">COMMENCER l'ALPHABET</h1>
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
            src="http://127.0.0.1:5001/video_feed"
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