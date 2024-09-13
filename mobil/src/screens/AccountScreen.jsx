import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const AccountScreen = () => {
  const [action, setAction] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const renderForm = () => {
    if (!action) return null;

    return (
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {action === 'register' && (
          <TextInput
            style={styles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        )}
        <TouchableOpacity onPress={() => console.log(action)}>
          <LinearGradient
            colors={['#70DD4A', '#43B226']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {action === 'login' ? 'Se connecter' : 'S inscrire'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compte</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setAction('login')}>
          <LinearGradient
            colors={['#70DD4A', '#43B226']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, action === 'login' && styles.activeButton]}
          >
            <Text style={styles.buttonText}>Se connecter</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAction('register')}>
          <LinearGradient
            colors={['#70DD4A', '#43B226']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.button, action === 'register' && styles.activeButton]}
          >
            <Text style={styles.buttonText}>S'inscrire</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {renderForm()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111827',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 25,
    width: 150,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  activeButton: {
    opacity: 0.8,
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    padding: 10,
    borderRadius: 25,
    marginTop: 10,
  },
  submitButtonText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default AccountScreen;