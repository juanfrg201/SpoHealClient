import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import axios from 'axios';
import { API_URL } from '@enviroment';
import NavigationBar from '../modal/NavigatorBar';
import LogoutButton from '../modal/LogoutButton';
import CardImage from '../modal/CardImage';
// Importa tus pantallas aquí
import AsyncStorage from '@react-native-async-storage/async-storage';
//import RegisterScreen from './register.js';

const ProfileScreen = ({ navigation }) => {

  const [authToken, setAuthToken] = useState(null);
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

  const [data, setData] = useState([]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      // Navega a la pantalla de inicio de sesión (o cualquier otra pantalla que desees)
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };
  const checkAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('user_id');
      if (token !== null && token !== 0) {
        setAuthToken(token);
        console.log(token)
      } else {
        // No se encontró un token, redirigir al inicio
        navigation.navigate('Inicio'); /// Reemplaza 'Inicio' con la pantalla de inicio correcta
      }
    } catch (error) {
      // Manejar errores si es necesario
      console.error('Error al verificar el token:', error);
    }
  };
  console.log(authToken)
  useEffect(() => {
    checkAuthToken();
    axios.get(API_URL + "/api/v1/active_days?auth_token=${authToken}")
      .then(response => {
        const customSections = response.data.days.map(day => ({
          title: day.day,
          description: "Tu puedes",
          image: require('../../assets/favourite.png'),
        }));
        console.log(token)
  
        // Actualiza el estado con la información obtenida
        setCarouselData(prevData => [
          {
            customSections: customSections,
          },
          ...prevData.slice(1) // Mantén los demás datos sin cambios
        ]);
  
        // Después de la solicitud GET, realiza la solicitud POST
        axios.post(API_URL + '/api/v1/active_days?auth_token=${token}', {
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
  if (authToken !== null && authToken !== 0) {
    return (
      <View style={styles.container}>
        <CardImage />
        <View>
          <TouchableOpacity style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar Sesión</Text>
          </TouchableOpacity>
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
  } else {
    return null; // No se muestra nada si no hay un token
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
