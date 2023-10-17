import React, { useState } from 'react';
import { View, Text, Image, ScrollView, FlatList } from 'react-native';
import { StyleSheet, Dimensions } from 'react-native';

const ProfileScreen = () => {
  const carouselData = [
    {
      messages: [
        { id: 1, text: 'Mensaje 1', image: require('../../assets/key.png') },
        { id: 2, text: 'Mensaje 2', image: require('../../assets/key.png') },
        { id: 3, text: 'Mensaje 2', image: require('../../assets/key.png') },
      ],
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
          source={require('../../assets/ruiz.jpeg')}
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
  },
  headerContainer: {
    flex: 0.3,
    //backgroundColor: 'lightblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 0.7,
  },
  profileImage: {
    width: "75%",
    height: "100%",
    resizeMode: 'center',
  },
  pageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, // Añade margen inferior para separar el indicador del contenido
  },
  pageIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    margin: 5,
  },
  currentPageIndicator: {
    width: 12,
    height: 12,
    backgroundColor: 'green',
    borderRadius: 6,
    marginLeft: 0,
    marginRight: 0,
    transform: [{ scale: 1.2 }], // Aplica una pequeña escala al indicador actual
  },
  carouselContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 20,
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
});

export default ProfileScreen;
