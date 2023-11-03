import React, { useState, useEffect  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Switch } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tw from 'twrnc';
import { API_URL } from '@enviroment';


const Parametizer = ({ navigation }) => {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState(''); 
  const [height, setHeight] = useState('');
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState('');
  const [cardiovascular_desease, setDeseas] = useState([]);
  const [selectedCardiovascularDesease, setCardiovascularDeseas] = useState(''); // Definir confirmation_password
  const [sportMedicalRestriction, setSportMedicalRestriction] = useState(false);
  const [sportMusclePains, setSportMusclePains] = useState(false);
  const [generalPain, setGeneralPain] = useState(false);
  const [isHypertension, setIsHypertension] = useState(false);
  const [isAsthma, setIsAsthma] = useState(false);
  const [isChestPain, setIsChestPain] = useState(false);
  const [painCardiac, setPainCardiac] = useState(false);
  const [cardiacFamilyPain, setCardiacFamilyPain] = useState(false);
  const [cholesterolPain, setCholesterolPain] = useState(false);
  const [dizzinessPain, setDizzinessPain] = useState(false);
  const [smokePain, setSmokePain] = useState(false);
  const [covid19, setCovid19] = useState(false);


  useEffect(() => {
    // Realiza una solicitud al backend para obtener la lista de actividades

    axios.get(API_URL+'/api/v1/activities') // Reemplaza 'URL_DEL_BACKEND' con la URL correcta
      .then((response) => {
        // Si la solicitud es exitosa, actualiza el estado 'activities' con los datos recibidos
        setActivities(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener la lista de actividades:', error);
      });
    axios.get(API_URL+'/api/v1/cardiovascular_deseases') // Reemplaza 'URL_DEL_BACKEND' con la URL correcta
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

      const ruta = "/api/v1/user_parameterizations";
      const backendUrl = API_URL + ruta; 
      // Validar que las contraseñas coincidan
     
      // Datos a enviar al backend
      const auth_token = await AsyncStorage.getItem('user_id');
      const favorite_activity_name = selectedActivity
      const select_cardiovascular_deseases = selectedCardiovascularDesease
      const data = {
        auth_token,
        age,
        weight, 
        height,
        favorite_activity_name,
        select_cardiovascular_deseases,
        sportMedicalRestriction,
        sportMusclePains,
        generalPain,
        isHypertension,
        isAsthma,
        isChestPain,
        painCardiac,
        cardiacFamilyPain,
        cholesterolPain,
        dizzinessPain,
        smokePain,
        covid19
      };

      const response = await axios.post(backendUrl, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        if (auth_token) {
          navigation.navigate('Inicio');
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
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Parametrización</Text>
        <TextInput
          style={styles.input}
          placeholder="Edad"
          value={age}
          onChangeText={(text) => setAge(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Peso"
          value={weight}
          onChangeText={(text) => setWeight(text)}
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
        <View style={styles.booleanField}>
          <Text>Tienes alguna restriccion de hacer ejercicio?</Text>
          <Switch value={sportMedicalRestriction} onValueChange={(value) => setSportMedicalRestriction(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes alguna restriccion musular?</Text>
          <Switch value={sportMusclePains} onValueChange={(value) => setSportMusclePains(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes alguna restriccion general?</Text>
          <Switch value={generalPain} onValueChange={(value) => setGeneralPain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes hipertension?</Text>
          <Switch value={isHypertension} onValueChange={(value) => setIsHypertension(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes Asma?</Text>
          <Switch value={isAsthma} onValueChange={(value) => setIsAsthma(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes dolo en el pecho al hacer ejercicio?</Text>
          <Switch value={isChestPain} onValueChange={(value) => setIsChestPain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes alguna enfermedad cardiovascular?</Text>
          <Switch value={painCardiac} onValueChange={(value) => setPainCardiac(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes algun familia con restricciones cardiovasculares?</Text>
          <Switch value={cardiacFamilyPain} onValueChange={(value) => setCardiacFamilyPain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Tienes problemas de colesterol?</Text>
          <Switch value={cholesterolPain} onValueChange={(value) => setCholesterolPain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Te da mareo ?</Text>
          <Switch value={dizzinessPain} onValueChange={(value) => setDizzinessPain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Fumas?</Text>
          <Switch value={smokePain} onValueChange={(value) => setSmokePain(value)} />
        </View>
        <View style={styles.booleanField}>
          <Text>Covid-19</Text>
          <Switch value={covid19} onValueChange={(value) => setCovid19(value)} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  picker: {
    height: 40,
    width: '100%',
    marginBottom: 15,
  },
  booleanField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  booleanLabel: {
    flex: 1,
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'green', // Cambia el color del título a verde
  },
  input: {
    width: '80%', // Ajusta el ancho de los TextInput según tus preferencias
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
    marginTop: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
});

export default Parametizer;