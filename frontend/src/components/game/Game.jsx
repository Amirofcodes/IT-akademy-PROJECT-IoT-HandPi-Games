import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ALPHABET = ['A', 'B', 'C', 'D'];

const Game = () => {
  const [message, setMessage] = useState('No game in progress');
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const interval = setInterval(checkGesture, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameCompleted, currentLetterIndex]);

  const startGame = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5001/api/game/start');
      setGameStarted(true);
      setCurrentLetterIndex(0);
      setScore(0);
      setGameCompleted(false);
      setMessage(`Game started! Show the letter: ${response.data.current_letter}`);
      setVideoError(false);
    } catch (error) {
      console.error('Error starting game:', error);
      setMessage('Error starting game');
    }
  };

  const checkGesture = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5001/api/game/check');
      const { message, new_letter, score, predicted_gesture } = response.data;

      setMessage(`Gesture detected: ${predicted_gesture}`);

      if (message === 'Correct!') {
        setScore(score);
        if (currentLetterIndex === ALPHABET.length - 1) {
          setGameCompleted(true);
          setMessage("Congratulations! You've completed the game!");
        } else {
          setCurrentLetterIndex(currentLetterIndex + 1);
          setMessage(`Show the letter: ${new_letter}`);
        }
      } else {
        setMessage('Incorrect, try again!');
      }
    } catch (error) {
      console.error('Error checking gesture:', error);
      setMessage('Error checking gesture');
    }
  };

  const handleVideoError = () => {
    setVideoError(true);
    setMessage('Error loading video feed. Please check your camera and refresh the page.');
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
          {gameCompleted ? "Replay" : "Start Game"}
        </button>
      ) : (
        <div className="flex flex-col items-center">
          {!videoError ? (
            <img 
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
          <p className="text-xl mb-2">{message}</p>
          <p className="text-2xl mb-2">Show the letter: {ALPHABET[currentLetterIndex]}</p>
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
