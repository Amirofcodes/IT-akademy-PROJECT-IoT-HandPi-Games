import React, { useState, useRef } from "react";
import axios from "axios";
import Webcam from "react-webcam";

const instructions = `Instructions:
1. Cliquez sur le bouton "Démarrer le jeu" pour lancer le jeu.
2. Après le début du jeu, la caméra s'allumera.
3. Montrez les gestes correspondant aux lettres de l'alphabet des sourds-muets devant la caméra.
4. Le système reconnaîtra les gestes et affichera la lettre actuelle et le score.
5. Continuez à montrer les gestes jusqu'à ce que vous ayez terminé l'alphabet.
`;

const Game = () => {
  const [message, setMessage] = useState('');
  const [currentLetter, setCurrentLetter] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const webcamRef = useRef(null);

  const startGame = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://127.0.0.1:5000/video_feed', {
        responseType: 'blob'
      });
      setMessage('Game started');
      setCurrentLetter('A');  // Start with the first letter
      setGameStarted(true);
    } catch (error) {
      console.error('Error starting the game:', error);
      setMessage('Error starting the game');
    } finally {
      setLoading(false);
    }
  };

  const checkGesture = async () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      try {
        const response = await axios.post('http://127.0.0.1:5000/check_gesture', { gesture: imageSrc }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setMessage(response.data.message);
        setCurrentLetter(response.data.predicted_character);
        setScore(prevScore => prevScore + 1);  // Increment score on correct gesture
      } catch (error) {
        console.error('Error checking the gesture:', error);
        setMessage('Error checking the gesture');
      }
    }
  };

  return (
    <div className="flex flex-col items-start justify-start min-h-screen text-white container">
      <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gradientStart to-gradientEnd bg-clip-text text-transparent">COMMENCER l'ALPHABET</h1>
      {!gameStarted && (
        <div className="text-start">
          <pre className="mb-6">{instructions}</pre>
          <button
            onClick={startGame}
            className="bg-button-gradient hover:bg-green-700 text-black font-bold py-3 px-20 rounded-full"
          >
            Démarrer le jeu
          </button>
        </div>
      )}
      {loading && <p className="text-3xl">Chargement...</p>}
      {!loading && gameStarted && (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="mb-4 rounded-lg"
          />
          <p className="text-xl mb-2">{message}</p>
          {currentLetter && <p className="text-2xl mb-2">Montrez la lettre: {currentLetter}</p>}
          <p className="text-xl mb-4">Score: {score}</p>
          <button
            onClick={checkGesture}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Vérifier le geste
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;