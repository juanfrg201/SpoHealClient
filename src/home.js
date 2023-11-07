import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';

const Home = ({ navigation }) => {
  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  // Cargar la fuente Quicksand con negrita
  const [fontsLoaded] = useFonts({
    QuicksandBold: Quicksand_700Bold,
  });

  if (!fontsLoaded) {
    // Puedes mostrar un indicador de carga aquí si es necesario
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
       source={require('../assets/LogoSpoheal.jpg')}
      style={styles.image}
      />
      {/* <View style={styles.Titulo}>
      <Text style={[styles.centeredText, styles.quicksandText]}>SpoHeal APP</Text>
      </View> */}
      <View style={styles.contentWrapper}>
        <Text style={[styles.title, styles.quicksandText]}>Bienvenido a Spoheal App</Text>
        <Text style={styles.subtitle}>¡Cuida de ti, cada día!</Text>
        <TouchableOpacity style={styles.Button} onPress={goToLogin}>
          <Text style={[styles.buttonText, styles.quicksandText]}>Inicia Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.Button} onPress={goToRegister}>
          <Text style={[styles.buttonText, styles.quicksandText]}>¡Registrate!</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Titulo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    color: 'green',
  },
  quicksandText: {
    fontFamily: 'QuicksandBold',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 400,
    marginBottom: 0,
  },
  Button: {
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
  },
});

export default Home;
