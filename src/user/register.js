import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image , Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState(''); // Definir last_name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation_password, setConfirmationPassword] = useState('');
  const [number_phone, setNumberPhone] = useState(''); // Definir confirmation_password


  const handleRegister = async () => {
    try {
      // URL del backend donde enviarás los datos del registro
      const backendUrl = "https://curvy-shirts-notice.loca.lt/api/v1/users"; // Reemplaza con la URL correcta
  
      // Validar que las contraseñas coincidan
      if (password === confirmation_password) {
        // Datos a enviar al backend
        const data = {
          name,
          last_name, // Usar last_name
          email,
          password,
          number_phone,
        };
  
        // Realiza la petición POST al backend utilizando Axios
        const response = await axios.post(backendUrl, data, {
          headers: {
            'Content-Type': 'application/json ',
          },
        });
  
        // Verifica si la respuesta tiene éxito (código de estado 200)
        if (response.status === 200) {
          auth_token = response.data.auth_token
          AsyncStorage.setItem('auth_token', auth_token);
          const token = await AsyncStorage.getItem('auth_token');
          if (token) {
            navigation.navigate('Parametizer');
          } else {
            // El usuario no está autenticado
          }
  
          // Luego puedes navegar a otra pantalla o realizar alguna acción adicional
        } else {
          const errorMessage = response.data.error;
          console.error('Error de autenticación:', errorMessage);
          // Puedes mostrar el mensaje de error en una alerta, un componente de texto, etc.
          // Por ejemplo, utilizando un estado en tu componente de React:
        }
      } else {
        console.error('Las contraseñas no coinciden');
      }
    } catch (error) {
      // Si ocurre un error durante la petición, puedes manejarlo aquí
      console.error('Error en la petición:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Apellido"
        value={last_name} // Usar last_name
        onChangeText={(text) => setLastName(text)} // Usar setLastName
      />
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Numero de telefono"
        value={number_phone}
        onChangeText={(text) => setNumberPhone(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmation_password}
        onChangeText={(text) => setConfirmationPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};


export default Register;