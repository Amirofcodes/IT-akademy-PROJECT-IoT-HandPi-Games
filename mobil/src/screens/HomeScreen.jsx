import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Slider from '../components/Slider';
import GameCard from '../components/GameCard';

const sliderImages = [
  require('../../assets/slider-1.png'),
  require('../../assets/slider-2.png'),
];

const gamesData = [
  {
    image: require('../../assets/alphabet.png'),
    title: "ALPHABET",
    description: "Pratiquez les gestes de l'alphabet avec notre jeu. La caméra reconnaît vos gestes et fournit un retour instantané pour améliorer vos compétences.",
    buttonText: "ESSAYEZ"
  },
  {
    image: require('../../assets/pierre-papier-ciseaux.png'),
    title: "PIERRE, PAPIER, CISEAUX",
    description: "Un classique avec une touche moderne ! Utilisez des gestes de la main pour jouer à Pierre, papier, ciseaux.",
    buttonText: "ESSAYEZ"
  },
  {
    image: require('../../assets/pendu.png'),
    title: "PENDU",
    description: "Devinez les lettres et sauvez le personnage dans notre jeu Pendu avec reconnaissance des gestes.",
    buttonText: "ESSAYEZ"
  },
  {
    image: require('../../assets/jeu-de-cartes.png'),
    title: "JEU DE CARTES",
    description: "Jouez aux cartes en utilisant des gestes de la main. Notre jeu reconnaît vos mouvements.",
    buttonText: "ESSAYEZ"
  }
];

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider images={sliderImages} />
      </View>
      <TouchableOpacity 
        onPress={() => navigation.navigate('Jeux')} // Изменено на 'Jeux'
        style={styles.buttonContainer}
      >
        <LinearGradient
          colors={['#70DD4A', '#43B226']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.startButton}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Nos jeux</Text>
      <View style={styles.gamesGrid}>
        {gamesData.map((game, index) => (
          <View key={index} style={styles.gameCardWrapper}>
            <GameCard
              image={game.image}
              title={game.title}
              description={game.description}
              buttonText={game.buttonText}
              onPress={() => navigation.navigate('Jeux')} // Изменено на 'Jeux'
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  sliderContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  startButton: {
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  startButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  gameCardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});

export default HomeScreen;