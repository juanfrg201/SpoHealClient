import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';

const Home = ({ navigation }) => {
    const goToRegister = () => {
      navigation.navigate('Register'); // Navegar a la pantalla "Register"
    };

    const goToLogin = () => {
      navigation.navigate('Login'); // Navegar a la pantalla "Register"
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bienvenido a Spoheal App</Text>
        <Text style={styles.subtitle}>Explora cómo van a cambiar tus hábitos saludables.</Text>
        <TouchableOpacity style={styles.greenButton} onPress={goToRegister}>
          <Text style={styles.buttonText}>Iniciar Registro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.greenButton} onPress={goToLogin}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Cambia el color de fondo según tu preferencia
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  greenButton: {
    backgroundColor: 'green', // Cambia el color a verde
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20, // Agrega margen inferior para separar los botones
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue', // Cambia el color del botón según tu preferencia
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;