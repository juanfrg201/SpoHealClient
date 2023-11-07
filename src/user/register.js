import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button, } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Quicksand_700Bold } from '@expo-google-fonts/quicksand';
import { API_URL } from '@enviroment';

const Register = ({ navigation }) => {
  const [name, setName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConfirmationPassword] = useState('');
  const [number_phone, setNumberPhone] = useState('');

  const handleRegister = async () => {
    try {
      // URL del backend donde enviarás los datos del registro
      const backendUrl = API_URL + "/api/v1/users"; // Reemplaza con la URL correcta

      // Validar que las contraseñas coincidan
      if (password === password_confirmation) {
        // Datos a enviar al backend
        const data = {
          user: {
          name,
          last_name, // Usar last_name
          email,
          password,
          number_phone
          }
        };

        // Realiza la petición POST al backend utilizando Axios
        const response = await axios.post(backendUrl, data, {
          headers: {
            'Content-Type': 'application/json ',
          },
        });

        // Verifica si la respuesta tiene éxito (código de estado 200)
        if (response.status === 200) {
          user_id = response.data.user_id
          AsyncStorage.removeItem('user_id');
          AsyncStorage.setItem('user_id',"" + user_id);
          const token = await AsyncStorage.getItem('user_id');
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
      <View style={styles.formContainer}>
        <Text style={[styles.title, styles.quicksandText, { color: '#39A466' }]}>¡REGISTRATE!</Text>
        {/* Contenedor del logo y los inputs */}
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/user.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={name}
            onChangeText={(text) => setName(text)}
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
        </View>
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/user.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={last_name}
            onChangeText={(text) => setLastName(text)}
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
        </View>
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/user.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Numero"
            value={number_phone}
            onChangeText={(text) => setNumberPhone(text)}
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
        </View>
        {/* Campo de password ----------------------------------------------------------------*/}
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/key.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
          
        </View>
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/key.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Repite Contraseña"
            value={password_confirmation}
            onChangeText={(text) => setConfirmationPassword(text)}
            secureTextEntry
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
          
        </View>
        {/* Campo de eMail -------------------------------------------------------------------------------*/}
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image
            source={require('../../assets/email.png')}
            style={styles.logo}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            marginBottom={0} // Reducir el espacio entre cada input 
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
        </View>
      </View>

      {/* Botón "Registrarse" fuera del formulario */}
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
    alignItems: 'center', // Centra horizontalmente en el medio de la pantalla
    backgroundColor: '#C7E1AD',

  },
  formContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center', // Centra horizontalmente en el medio del formulario
    marginTop: 20, // Centra verticalmente en el medio de la pantalla
    marginLeft: 20, // Ajusta este valor para mover el formulario hacia la derecha
    marginRight: 20, // Ajusta este valor para mover el formulario hacia la izquierda
    shadowColor: '#39A466', // Color de la sombra
    shadowOffset: { width: 0, height: 2 }, // Offset (desplazamiento) de la sombra
    shadowOpacity: 0.5, // Opacidad de la sombra (0 a 1)
    shadowRadius: 5, // Radio de la sombra
    elevation: 5, // Elevación de la sombra en Android
  },
  logoAndInputsContainer: {
    flexDirection: 'row', // Coloca el logo y los inputs en fila
    alignItems: 'center', // Alinea verticalmente en el centro

  },
  logo: {
    width: 25,
    height: 25,
    marginRight: 15, // Añade un margen entre la imagen y el input
  },
  input: {
    flex: 1, // Los inputs se expanden para ocupar el espacio restante
    height: 40,
    marginBottom: 10,
    borderBottomWidth: 1, // Ancho de la línea inferior
    borderColor: 'black', // Color de la línea inferior
    paddingBottom: 0, // Espaciado opcional en la parte inferior
  },
  button: {
    backgroundColor: '#39A466',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20, // Ajusta la distancia entre el formulario y el botón
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 20,
  },
  quicksandText: {
    fontFamily: 'QuicksandBold',
    fontWeight: 'bold',
  },

  placeholder: {
    paddingTop: 0, // Ajusta este valor según tus preferencias
  },
});

export default Register;
