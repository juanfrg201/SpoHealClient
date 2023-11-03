import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { API_URL } from '@enviroment';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Create = ({ navigation }) => {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');

  const handleCreateCommunity = async () => {
    try {
      const token = await AsyncStorage.getItem('user_id')
      const env_url = API_URL
      const url = "/api/v1/community"
      const backendUrl = env_url + url; // Reemplaza con la URL correcta

      // Datos a enviar al backend
      const data = {
        user_id: token,
        name,
        issue,
      };

      // Realiza la petición POST al backend utilizando Axios
      const response = await axios.post(backendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica si la respuesta tiene éxito (código de estado 200 u otro que indique éxito)
      if (response.status === 200) {
        // La comunidad se creó con éxito, puedes realizar alguna acción adicional o navegar a otra pantalla
        // Por ejemplo:
        navigation.navigate('Community'); // Reemplaza 'Community' con el nombre de la vista de la lista de comunidades
      } else {
        const errorMessage = response.data.error;
        console.error('Error en la creación de comunidad:', errorMessage);
        // Puedes mostrar el mensaje de error en una alerta, un componente de texto, etc.
      }
    } catch (error) {
      // Si ocurre un error durante la petición, puedes manejarlo aquí
      console.error('Error en la petición:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Crear Comunidad</Text>
        <View style={styles.logoAndInputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre de la comunidad"
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.logoAndInputsContainer}>
          <TextInput
            style={[styles.input, styles.largeTextInput]} // Agrega el estilo largeTextInput
            placeholder="Tema de la comunidad"
            value={issue}
            onChangeText={(text) => setIssue(text)}
            multiline={true} // Habilita la entrada de texto en varias líneas
            numberOfLines={4} // Especifica el número de líneas de altura que deseas mostrar
          />
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleCreateCommunity}>
        <Text style={styles.buttonText}>Crear Comunidad</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C7E1AD',
  },
  formContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#39A466',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  logoAndInputsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#39A466',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Create;
