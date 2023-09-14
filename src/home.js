import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';

const Home = ({ navigation }) => {
    const goToRegister = () => {
      navigation.navigate('Register');
    };

    const goToLogin = () => {
      navigation.navigate('Login');
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('../assets/HomeImage.png')} 
          style={styles.image}
        />
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>Bienvenido a Spoheal App</Text>
          <Text style={styles.subtitle}>Explora cómo van a cambiar tus hábitos saludables.</Text>
          <TouchableOpacity style={styles.greenButton} onPress={goToRegister}>
            <Text style={styles.buttonText}>Iniciar Registro</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenButton} onPress={goToLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // Esto permite que el contenido se expanda y se pueda desplazar
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 0,
  },
  greenButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
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
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contentWrapper: {
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  }
});

export default Home;