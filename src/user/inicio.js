import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';

const ProfileScreen = () => {
  const carouselData = [
    {
      customSection: (
        <View style={[styles.customSectionContainer, { backgroundColor: '#dcefc9' }]}>
          <View style={styles.customColumn}>
            <Text>Lunes</Text>
          </View>
          <View style={styles.customColumn}>
            <Text>Tu puedes</Text>
          </View>
          <View style={styles.customColumn}>
            <View style={styles.centeredContent}>
              <Image source={require('../../assets/favourite.png')} style={styles.customImage} />
            </View>
          </View>
        </View>
      ),
    },
    {
      charts: <Text>Gráfica 1</Text>,
      messages: [
        { id: 17, text: 'Mensaje 3' },
        { id: 18, text: 'Mensaje 4' },
      ],
    },
    {
      messages: [
        { id: 5, text: 'Mensaje 5' },
        { id: 6, text: 'Mensaje 6' },
      ],
    },
  ];

  const screenWidth = Dimensions.get('window').width;
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../../assets/LogoBG.png')}
          style={styles.profileImage}
        />
      </View>
      <View style={styles.contentContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.x;
            const page = Math.floor(offset / screenWidth);
            setCurrentPage(page);
          }}
        >
          {carouselData.map((item, index) => (
            <View
              key={index}
              style={[
                styles.carouselContainer,
                { width: screenWidth },
              ]}
            >
              {item.customSection && (
                <View style={styles.customSectionContainer}>
                  {item.customSection}
                </View>
              )}
              {item.charts && (
                <View style={styles.chartContainer}>
                  {item.charts}
                </View>
              )}
              {item.messages && (
                <View>
                  {item.messages.map((message) => (
                    <View key={message.id} style={styles.messageContainer}>
                      <Text style={styles.messageText}>{message.text}</Text>
                      {message.image && (
                        <Image source={message.image} style={styles.messageImage} />
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.pageIndicatorContainer}>
        {carouselData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.pageIndicator,
              currentPage === index ? styles.currentPageIndicator : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.7,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  currentPageIndicator: {
    width: 10,
    height: 10,
    backgroundColor: 'green',
    borderRadius: 6,
    margin: 0,
    transform: [{ scale: 1.2 }],
  },
  carouselContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: "#d7eec1",
    padding: 20,
  },
  customSectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderColor: 'green',  // Cambiar a color rojo u otro color de tu elección
    borderWidth: 2,       // Ancho del borde
    borderRadius: 10,     // Radio de borde para hacerlo redondeado
    padding: 10,         // Espacio interno dentro del contenedor
    backgroundColor: "white",
  },
  customSectionContent: {
    alignItems: 'center', // Centrar elementos hijos verticalmente
  },

  customSectionText: {
    fontSize: 16,
    textAlign: 'center', // Centrar texto horizontalmente
  },

  customColumn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
  customImage: {
    width: 30,
    height: 30,
  },
  chartContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingBottom: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  messageText: {
    fontSize: 16,
    flex: 1,
  },
  messageImage: {
    width: 30,
    height: 30,
  },
  centeredContent: {
    marginLeft: 20, // Puedes ajustar el valor según la cantidad de desplazamiento que desees


  }
});

export default ProfileScreen;
