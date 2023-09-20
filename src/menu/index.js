import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const Index = ({ navigation }) => {
  // Datos para el carrusel
  const carouselData = [
    { title: 'Caracteristicas de  usuarios', description: 'Descripción del Slide 1' },
    { title: 'Dias que ha usado la app', description: 'Descripción del Slide 2' },
    { title: 'Recomendacion de actividades de ejercicios', description: 'Descripción del Slide 3' },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.carouselItem}>
        <Text style={styles.carouselTitle}>{item.title}</Text>
        <Text style={styles.carouselDescription}>{item.description}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require('../../assets/HomeImage.png')} style={styles.image} />
      <Carousel
        data={carouselData}
        renderItem={_renderItem}
        sliderWidth={400}
        itemWidth={300}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 400,
    height: 300,
    marginBottom: 50,
  },
  carouselItem: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    elevation: 3,
  },
  carouselTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselDescription: {
    fontSize: 16,
    color: '#888',
  },
});

export default Index;