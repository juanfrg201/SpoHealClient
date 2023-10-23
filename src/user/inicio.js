import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lista from '../../assets/lista.png';
import Perfil from '../../assets/usuario.png';
import Ruta from '../../assets/ruta.png';
import Comunidades from '../../assets/comunidades.png';
import axios from 'axios';
import { API_URL } from '@enviroment';
import NavigationBar from '../modal/NavigatorBar';
// Importa tus pantallas aquí
import LoginScreen from './login.js';
import ParametizerScreen from './parametizer.js';
//import RegisterScreen from './register.js';

const Tab = createBottomTabNavigator();

const ProfileScreen = ({ navigation }) => {
  const [carouselData, setCarouselData] = useState([
    {
      customSections: [],
    },
    {
      customSections: [],
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
  ]);

  const ruta = "/api/v1/active_days?user_id=1";
  const [data, setData] = useState([]);

  useEffect(() => {
    // Realiza la solicitud GET a tu API
    axios.get(API_URL + ruta)
      .then(response => {
        const customSections = response.data.days.map(day => ({
          title: day.day,
          description: "Tu puedes",
          image: require('../../assets/favourite.png'),
        }));
  
        // Actualiza el estado con la información obtenida
        setCarouselData(prevData => [
          {
            customSections: customSections,
          },
          ...prevData.slice(1) // Mantén los demás datos sin cambios
        ]);
  
        // Después de la solicitud GET, realiza la solicitud POST
        axios.post(API_URL + '/api/v1/active_days?user_id=1', {
          // Aquí coloca los datos que deseas enviar en la solicitud POST
          // Por ejemplo:
          parametro1: 'valor1',
          parametro2: 'valor2',
        })
        .then(response => {
          // Maneja la respuesta de la solicitud POST
          console.log('Solicitud POST exitosa:', response.data);
        })
        .catch(error => {

        });
  
      })
      .catch(error => {
        console.error('Error al obtener datos desde el servidor:', error);
      });
  }, []);

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
              {item.customSections && item.customSections.map((section, i) => (
                <View key={i} style={styles.customSectionContainer}>
                  <View style={styles.customSection}>
                    <Text>{section.title}</Text>
                    <Text>{section.description}</Text>
                    <View style={styles.centeredContent}>
                      <Image source={section.image} style={styles.customImage} />
                    </View>
                  </View>
                </View>
              ))}
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

      <NavigationBar navigation={navigation} />
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
    //marginBottom: 5,
    backgroundColor: "#d7eec1"
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
    padding: 15,
  },
  // customSectionContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   marginBottom: 10, 
  //   borderColor: 'green', 
  //   borderWidth: 2, 
  //   borderRadius: 10, 
  //   padding: 7, 
  //   backgroundColor: "white",
  // },
  customSection: {
    borderWidth: 2,             
    borderColor: 'green',      
    borderRadius: 10,          
    padding: 7,               
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customSectionContainer: {
    marginBottom: 10
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
    marginLeft: 20,
  },
  // Estilos para la barra de tareas
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#146c51',
    height: 70,
  },
  tabBarButton: {
    flex: 1,
    padding: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 0,
  },
  tabBarText: {
    color: 'white',
    fontSize: 13,
  },
  tabBarImage: {
    width: 20,
    height: 20,
  }
});

export default ProfileScreen;
