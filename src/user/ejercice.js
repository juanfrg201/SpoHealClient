import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@enviroment';
import NavigationBar from '../modal/NavigatorBar';
import CardImage from '../modal/CardImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from 'react-native-elements';


const Ejercice = ({ navigation }) => {

    const [data, setData] = useState([]);

    useEffect( async () => {
      // URL de la API
      const token = await AsyncStorage.getItem('user_id')
      const apiUrl = API_URL + '/api/v1/recommendations?user_id=' + token; // Reemplaza con tu URL real
  
      // Realiza la solicitud GET a la API
      fetch(apiUrl)
        .then((response) => response.json())
        .then((jsonData) => {
          if (jsonData && jsonData.data) {
            setData(jsonData.data);
          } else {
            console.error('La respuesta de la API está vacía o no contiene datos válidos.');
          }
        })
        .catch((error) => {
          console.error('Error al obtener datos desde la API:', error);
        });
    }, []);

    return (
      <View style={styles.container}>
        <CardImage />
        <ScrollView style={styles.contentContainer}>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                  // Navega a la vista deseada al hacer clic en el botón "Crear Comunidad"
                  navigation.navigate('CommunityCreate'); // Reemplaza 'NuevaComunidad' con el nombre de tu vista de creación de comunidad
              }}
          >
              <Text style={styles.buttonText}>Refgistra un ejercicio</Text>
          </TouchableOpacity>
          <View>
            {data.map((activity) => (
              <Card key={activity.id} containerStyle={styles.cardContainer}>
                <Card.Title>{activity.name}</Card.Title>
                <Card.Divider />
                <Text>{activity.description}</Text>
                {/* Agrega más contenido en la tarjeta según tus necesidades */}
              </Card>
            ))}
          </View>
        </ScrollView>
        <NavigationBar navigation={navigation} />
      </View>
    );
};

const styles = {
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  cardContainer: {
    borderRadius: 15, // Ajusta el valor según el nivel de redondeo que desees
    margin: 10,
    borderWidth: 2, // Ancho del borde
    borderColor: 'green', // Espacio entre las tarjetas
  },
  contentContainer: {
    flex: 0.6,
    backgroundColor: "#d7eec1",
    borderWidth: 1, // Agrega un borde
    borderColor: 'lightgray', // Color del borde
    
    marginTop: 0, // Margen exterior
  },
  button: {
    backgroundColor: '#39A466',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 40,
    marginRight: 40, 
    marginBottom: 30,// Ajusta la distancia entre el formulario y el botón
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
}
};
export default Ejercice;