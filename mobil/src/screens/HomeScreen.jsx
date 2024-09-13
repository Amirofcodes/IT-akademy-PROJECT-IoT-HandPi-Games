import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Slider from '../components/Slider';
import GameCard from '../components/GameCard';

const slides = [
  { title: "Apprenez la langue des signes", description: "De manière interactive et amusante" },
  { title: "Progressez à votre rythme", description: "Des exercices adaptés à tous les niveaux" },
  { title: "Jouez et apprenez", description: "Développez vos compétences tout en vous amusant" }
];

const games = [
  { title: "Alphabet", description: "Apprenez les signes de l'alphabet" },
  { title: "Mots", description: "Élargissez votre vocabulaire" },
  { title: "Phrases", description: "Construisez des phrases complètes" },
  { title: "Quiz", description: "Testez vos connaissances" }
];

const HomeScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <ScrollView style={styles.container}>
      <Slider 
        slides={slides} 
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
      />
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Commencer</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Nos jeux</Text>
      <View style={styles.gamesGrid}>
        {games.map((game, index) => (
          <View key={index} style={styles.gameCardWrapper}>
            <GameCard title={game.title} description={game.description} />
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
    padding: 16,
  },
  startButton: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 24,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  gamesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gameCardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});

export default HomeScreen;