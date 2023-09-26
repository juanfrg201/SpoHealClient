import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, } from 'react-native';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // URL del backend donde enviarás los datos del registro
      const backendUrl =
        'https://curvy-shirts-notice.loca.lt/api/v1/authenticate'; // Reemplaza con la URL correcta

      // Validar que las contraseñas coincidan

      // Datos a enviar al backend
      const data = {
        email,
        password,
      };

      // Realiza la petición POST al backend utilizando Axios
      const response = await axios.post(backendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Verifica si la respuesta tiene éxito (código de estado 200)
      if (response.status === 200) {
        auth_token = response.data.auth_token;
        AsyncStorage.setItem('auth_token', auth_token);
        const token = await AsyncStorage.getItem('auth_token');
        if (token) {
          navigation.navigate('Index');
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
    } catch (error) {
      // Si ocurre un error durante la petición, puedes manejarlo aquí
      console.error('Error en la petición:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text
          style={[styles.title, styles.quicksandText, { color: '#39A466' }]}>¡REGISTRATE!</Text>
        {/* Contenedor del logo y los inputs */}
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image source={require('../../assets/user.png')} style={styles.logo} />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={email}
            onChangeText={(text) => setemail(text)}
            marginBottom={0} // Reducir el espacio entre cada input
            placeholderStyle={styles.placeholder} // Establece el estilo del placeholder
          />
        </View>
        {/* Campo de password ----------------------------------------------------------------*/}
        <View style={styles.logoAndInputsContainer}>
          {/* Logo */}
          <Image source={require('../../assets/key.png')} style={styles.logo} />
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
      </View>

      {/* Botón "Registrarse" fuera del formulario */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    width: 25, // Ajusta el ancho de la imagen según tus necesidades
    height: 25, // Ajusta la altura de la imagen según tus necesidades
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

export default Login;
