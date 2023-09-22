import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image , Button,LinearGradient} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';

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
      <LinearGradient
        colors={['#00b300', '#009900']} 
        style={styles.header}
      >
        <Text style={styles.headerText}>Registro</Text>
      </LinearGradient>
      
      <View style={styles.content}>
        
        <View style={styles.inputContainer}>
          <Image
            source={require('/home/jorge07/SpoHealApp/SpoHealClient/assets/LogoSpoheal.jpg')} 
            style={styles.logo}
          />
          <TextInput
            placeholder="Usuario"
            style={styles.input}
          />
        </View>
     
        <View style={styles.inputContainer}>
          <Image
            source={require('/home/jorge07/SpoHealApp/SpoHealClient/assets/LogoSpoheal.jpg')} 
            style={styles.logo}
          />
          <TextInput
            placeholder="Contraseña"
            secureTextEntry 
            style={styles.input}
          />
        </View>
        
        
      </View>

      <LinearGradient
        colors={['#00b300', '#009900']} // Colores del degradado
        style={styles.footer}
      >
        <Text style={styles.footerText}>Pie de página</Text>
      </LinearGradient>
    </View>
  );
};
  

export default Register;