import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GameCard = ({ image, title, description, buttonText, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image source={image} style={styles.image} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#70DD4A', '#43B226']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#433D60',
    borderRadius: 12,
    padding: 16,
    height: 400, 
    justifyContent: 'space-between',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#d1d5db',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 'auto', 
    marginBottom: 5, 
  },
  button: {
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default GameCard;