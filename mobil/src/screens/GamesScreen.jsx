import React from 'react';
import { View, StyleSheet } from 'react-native';
import Game from '../components/Game';

const GamesScreen = () => {
  return (
    <View style={styles.container}>
      <Game />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827', 
  },
});

export default GamesScreen;