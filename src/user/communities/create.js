import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Button } from 'react-native';
import axios from 'axios';
import { API_URL } from '@enviroment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const Create = ({ navigation }) => {
  const [name, setName] = useState('');
  const [issue, setIssue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCreateCommunity = async () => {
    try {
      const token = await AsyncStorage.getItem('user_id');
      const env_url = API_URL;
      const url = '/api/v1/community';
      const backendUrl = env_url + url;

      const formData = new FormData();

      formData.append('user_id', token);
      formData.append('name', name);
      formData.append('issue', issue);

      if (selectedImage) {
        formData.append('image', {
          uri: selectedImage,
          type: 'image/jpeg',
          name: 'image.jpg',
        });
      }

      const response = await axios.post(backendUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        navigation.navigate('Community');
      } else {
        const errorMessage = response.data.error;
        console.error('Error en la creación de comunidad:', errorMessage);
      }
    } catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.log('Se requieren permisos de acceso a la biblioteca de medios.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Comunidad</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre de la comunidad"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tema de la comunidad"
          value={issue}
          onChangeText={(text) => setIssue(text)}
          multiline={true}
          numberOfLines={4}
        />
        <View style={styles.imagePickerContainer}>
          <TouchableOpacity style={styles.button_image} onPress={pickImage}>
            <Text style={styles.buttonText_image}>Seleccionar Imagen</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.image_image} />
          )}
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
    backgroundColor: '#C7E1AD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: 'white',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#39A466',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    width: '100%',
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
  imagePickerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  button_image: {
    backgroundColor: '#39A466',
    padding: 10,
    borderRadius: 5,
  },
  buttonText_image: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image_image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default Create;

