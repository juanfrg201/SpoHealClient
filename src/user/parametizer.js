import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { StatusBar } from 'expo-status-bar';

const Parametizer = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState(''); // Definir last_name
  const [height, setHeight] = useState('');
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [cardiovascular_desease, setDeseas] = useState([]);
  const [selectedCardiovascularDesease, setCardiovascularDeseas] = useState(''); // Definir confirmation_password


  useEffect(() => {
    // Realiza una solicitud al backend para obtener la lista de actividades
    axios.get('https://curvy-shirts-notice.loca.lt/api/v1/activities') // Reemplaza 'URL_DEL_BACKEND' con la URL correcta
      .then((response) => {
        // Si la solicitud es exitosa, actualiza el estado 'activities' con los datos recibidos
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de actividades:', error);
      });
    axios.get('https://curvy-shirts-notice.loca.lt/api/v1/cardiovascular_deseases') // Reemplaza 'URL_DEL_BACKEND' con la URL correcta
      .then((response) => {
        // Si la solicitud es exitosa, actualiza el estado 'activities' con los datos recibidos
        setDeseas(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de enfermedades:', error);
      }); 
  }, []);

  const handleRegister = async () => {
    try {
      // URL del backend donde enviarás los datos del registro
      const backendUrl = "https://curvy-shirts-notice.loca.lt/api/v1/user_parameterizations"; // Reemplaza con la URL correcta
  
      // Validar que las contraseñas coincidan
     
      // Datos a enviar al backend
      const auth_token = await AsyncStorage.getItem('auth_token');
      const favorite_activity_name = selectedActivity
      const select_cardiovascular_deseases = selectedCardiovascularDesease
      const data = {
        auth_token,
        age,
        weight, 
        height,// Usar last_name
        favorite_activity_name,
        select_cardiovascular_deseases,
      };

      const response = await axios.post(backendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        if (auth_token) {
          navigation.navigate('Index');
        } else {
          navigation.navigate('Home');
        }
  
        // Luego puedes navegar a otra pantalla o realizar alguna acción adicional
      } else {
        const errorMessage = response.data.error;
        console.error('Error de autenticación:', errorMessage);
        // Puedes mostrar el mensaje de error en una alerta, un componente de texto, etc.
        // Por ejemplo, utilizando un estado en tu componente de React:
      }

      
      
    } catch (error) {
      // Si ocurre un error durante la petición, puedes manejarlo aquí
      console.error('Error en la petición:', error.message);
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center `}>
      <Text style={tw`text-green-700 text-3xl font-bold`}>Parametrizacion</Text>
      <StatusBar style='dark'> </StatusBar>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={age}
        onChangeText={(text) => setAge(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={weight} // Usar last_name
        onChangeText={(text) => setWeight(text)} // Usar setLastName
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={height}
        onChangeText={(text) => setHeight(text)}
      />
      <Picker
        selectedValue={selectedActivity}
        style={styles.picker}
        onValueChange={(itemValue) => setSelectedActivity(itemValue)}
      >
        <Picker.Item label="Selecciona una actividad" value="" />
        {activities.map((activity) => (
          <Picker.Item key={activity.identifier} label={activity.name} value={activity.identifier} />
        ))}
      </Picker>
      <Picker
        selectedValue={selectedCardiovascularDesease}
        style={styles.picker}
        onValueChange={(itemValue) => setCardiovascularDeseas(itemValue)}
      >
        <Picker.Item label="Tienes alguna enfermedad?" value="" />
        {cardiovascular_desease.map((cardiovascular_deseas) => (
          <Picker.Item key={cardiovascular_deseas.identifier} label={cardiovascular_deseas.name} value={cardiovascular_deseas.identifier} />
        ))}
      </Picker>
      <TouchableOpacity style={tw `bg-green-500 p-3 rounded-lg`} onPress={handleRegister}>
        <Text style={tw `text-white text-3xl font-bold`}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   padding: 20,
  // },
  image: {
    width: 150, // Ajusta el ancho de la imagen según tus necesidades
    height: 150, // Ajusta la altura de la imagen según tus necesidades
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#fff', // Color de fondo del Picker
    paddingHorizontal: 10,
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginBottom: 20,
  //   color: 'green', // Cambia el color del título a verde
  // },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'green', // Cambia el color de fondo del botón a verde
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Parametizer;