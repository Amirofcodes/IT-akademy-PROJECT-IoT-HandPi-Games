import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

const CustomHeader = ({ title }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Image
          source={require('../../assets/header-logo.png')} 
          style={styles.logo}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#1F2937',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80, 
    backgroundColor: '#1F2937',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  title: {
    color: '#43B226',
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    left: 16,
  },
  logo: {
    width: 70, 
    height: 70, 
    resizeMode: 'contain',
  },
});

export default CustomHeader;