import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import axios from 'axios';

const Parametizer = () => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState(''); // Definir last_name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation_password, setConfirmationPassword] = useState(''); // Definir confirmation_password

  const handleRegister = async () => {
    try {
      // URL del backend donde enviarás los datos del registro
      const backendUrl = "https://fancy-cameras-play.loca.lt/api/v1/users"; // Reemplaza con la URL correcta
  
      // Validar que las contraseñas coincidan
      if (password === confirmation_password) {
        // Datos a enviar al backend
        const data = {
          name,
          last_name, // Usar last_name
          email,
          password,
        };
  
        // Realiza la petición POST al backend utilizando Axios
        const response = await axios.post(backendUrl, data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        // Verifica si la respuesta tiene éxito (código de estado 200)
        if (response.status === 200) {
          console.log('Respuesta del servidor:', response.data);
  
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
      <Text style={styles.title}>Parametrizacion</Text>
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Peso"
        value={last_name} // Usar last_name
        onChangeText={(text) => setLastName(text)} // Usar setLastName
      />
      <TextInput
        style={styles.input}
        placeholder="Altura"
        value={email}
        onChangeText={(text) => setEmail(text)}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 150, // Ajusta el ancho de la imagen según tus necesidades
    height: 150, // Ajusta la altura de la imagen según tus necesidades
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', // Cambia el color del título a verde
  },
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