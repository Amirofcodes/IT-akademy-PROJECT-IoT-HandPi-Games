import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const instructions = [
  {
    title: "Bienvenue dans l'application de langue des signes !",
    content: "Cette application vous aidera à apprendre et pratiquer la langue des signes de manière interactive."
  },
  {
    title: "Étape 1 : Choisissez un jeu",
    content: "Sélectionnez l'un des jeux disponibles sur l'écran d'accueil pour commencer à pratiquer."
  },
  {
    title: "Étape 2 : Positionnez votre caméra",
    content: "Assurez-vous que votre caméra est bien positionnée et que vos mains sont clairement visibles."
  },
  {
    title: "Étape 3 : Suivez les instructions à l'écran",
    content: "Chaque jeu vous guidera avec des instructions spécifiques. Suivez-les attentivement pour progresser."
  },
  {
    title: "Étape 4 : Pratiquez régulièrement",
    content: "La pratique régulière est la clé pour maîtriser la langue des signes. Revenez souvent pour améliorer vos compétences !"
  }
];

const InstructionsScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < instructions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.stepIndicator}>Étape {currentStep + 1} sur {instructions.length}</Text>
        <Text style={styles.title}>{instructions[currentStep].title}</Text>
        <Text style={styles.content}>{instructions[currentStep].content}</Text>
      </ScrollView>
      <View style={styles.navigationContainer}>
        <TouchableOpacity onPress={prevStep} disabled={currentStep === 0}>
          <LinearGradient
            colors={['#70DD4A', '#43B226']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, currentStep === 0 && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>Précédent</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={nextStep} disabled={currentStep === instructions.length - 1}>
          <LinearGradient
            colors={['#70DD4A', '#43B226']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, currentStep === instructions.length - 1 && styles.disabledButton]}
          >
            <Text style={styles.buttonText}>Suivant</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  stepIndicator: {
    color: '#70DD4A',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    width: 120,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default InstructionsScreen;