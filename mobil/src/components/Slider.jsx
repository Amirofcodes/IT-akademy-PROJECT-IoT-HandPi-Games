import React, { useState, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronLeft, ChevronRight } from 'react-native-feather';

const SLIDER_WIDTH = 320;
const SLIDER_HEIGHT = 300;

const Slider = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / SLIDER_WIDTH);
    setActiveIndex(newIndex);
  };

  const scrollToIndex = (index) => {
    scrollViewRef.current.scrollTo({ x: index * SLIDER_WIDTH, animated: true });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={styles.image}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.paginationDot,
              index === activeIndex && styles.paginationDotActive,
            ]}
            onPress={() => scrollToIndex(index)}
          />
        ))}
      </View>
      <TouchableOpacity
        style={[styles.navButton, styles.navButtonLeft]}
        onPress={() => scrollToIndex(Math.max(0, activeIndex - 1))}
      >
        <ChevronLeft stroke="white" width={24} height={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.navButton, styles.navButtonRight]}
        onPress={() => scrollToIndex(Math.min(images.length - 1, activeIndex + 1))}
      >
        <ChevronRight stroke="white" width={24} height={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    alignSelf: 'center',
  },
  image: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: 'white',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  navButtonLeft: {
    left: 8,
  },
  navButtonRight: {
    right: 8,
  },
});

export default Slider;