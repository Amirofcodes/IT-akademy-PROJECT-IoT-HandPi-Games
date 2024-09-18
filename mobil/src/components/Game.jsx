import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const videoRef = useRef(null);

  const startGame = async () => {
    setIsGameStarted(true);
    if (videoRef.current) {
      await videoRef.current.playAsync();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>COMMENCER l'ALPHABET</Text>
      {!isGameStarted ? (
        <>
          <Text style={styles.description}>
            Pratiquez l'alphabet en langue des signes avec notre jeu interactif. Montrez les gestes devant la caméra et voyez si vous pouvez compléter tout l'alphabet !
          </Text>
          <TouchableOpacity onPress={startGame}>
            <LinearGradient
              colors={['#70DD4A', '#43B226']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Start Game</Text>
            </LinearGradient>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.gameContainer}>
          <Video
            ref={videoRef}
            style={styles.video}
            source={{
              uri: 'http://127.0.0.1:5001/video_feed'
            }}
            useNativeControls={false}
            resizeMode="contain"
            isLooping
            shouldPlay={false}
          />
          <Text style={styles.message}>Game started! Video stream is active.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: 'white',
  },
  button: {
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameContainer: {
    width: '100%',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
});

export default Game;