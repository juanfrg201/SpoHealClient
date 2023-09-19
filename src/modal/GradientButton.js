import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <LinearGradient
        colors={['white', 'green']} // Colores del degradado, de blanco a verde
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.button}>
        <Text style={styles.buttonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Cambia el color del texto a blanco
    textAlign: 'center',
  },
});

export default GradientButton;