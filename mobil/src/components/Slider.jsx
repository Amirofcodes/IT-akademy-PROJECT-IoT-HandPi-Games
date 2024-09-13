import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ChevronLeft, ChevronRight } from 'react-native-feather';

const { width } = Dimensions.get('window');

const Slider = ({ slides, currentSlide, setCurrentSlide }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{slides[currentSlide].title}</Text>
      <Text style={styles.description}>{slides[currentSlide].description}</Text>
      <View style={styles.navigation}>
        <TouchableOpacity
          onPress={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
          style={styles.navButton}
        >
          <ChevronLeft stroke="white" width={20} height={20} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
          style={styles.navButton}
        >
          <ChevronRight stroke="white" width={20} height={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1F2937',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: 'white',
    marginBottom: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 4,
  },
});

export default Slider;