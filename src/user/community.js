import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import { API_URL } from '@enviroment';
import NavigationBar from '../modal/NavigatorBar';


const Community = ({ navigation }) => {
    const ruta = "/api/v1/community";
    const [data, setData] = useState([]);

    useEffect(() => {
        // Realiza la solicitud GET a tu aplicación de Rails
        axios.get(API_URL + ruta)
        .then(response => {
            // Si la solicitud es exitosa, actualiza el estado 'data' con los datos recibos
            setData(response.data.communities); // Asegúrate de acceder al arreglo correcto
        })
        .catch(error => {
            console.error('Error al obtener datos desde el servidor:', error);
        });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/LogoBG_p.png')}
                    style={styles.profileImage}
                />
            </View>
            <ScrollView style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // Navega a la vista deseada al hacer clic en el botón "Crear Comunidad"
                        navigation.navigate('CommunityCreate'); // Reemplaza 'NuevaComunidad' con el nombre de tu vista de creación de comunidad
                    }}
                >
                    <Text style={styles.buttonText}>Crear Comunidad</Text>
                </TouchableOpacity>
                {data.map((item, index) => (
                    <View style={styles.customSectionContainer}>
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // Redirige a la vista "CommunityPost" y pasa el ID de la comunidad
                                navigation.navigate('CommunityPost', { communityId: item.id });
                            }}
                        >
                            <View style={styles.rightSection}>
                                <View style={styles.borderedSection}>
                                    <Text style={styles.sectionText}>{item.name}</Text>
                                </View>
                                <View style={styles.borderedSection}>
                                    <Text style={styles.Text2}>{item.issue}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>
            <NavigationBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    addButton: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: 'white',
        borderRadius: 30, // Esto puede variar según tus preferencias
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#146c51', // Color de texto
        fontSize: 16, // Tamaño de fuente
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        
    },
    headerContainer: {
        flex: 0.415, // Incrementamos un poco la altura
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    contentContainer: {
        flex: 0.6,
        backgroundColor: "#d7eec1",
        borderWidth: 1, // Agrega un borde
        borderColor: 'lightgray', // Color del borde
        
        marginTop: 0, // Margen exterior
        
    },
    profileImage: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    customSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "white",
        margin: 10,
        padding: 10,
        marginTop: 10, // Agregamos margen superior
        
    },
    borderedSection: {
        borderWidth: 2,
        borderColor: '#32a260',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    firstCustomSection: {
        marginTop: 20, // Incrementamos el margen superior en el primer contenedor
        
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        flex: 2,
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    customImage: {
        width: 100,
        height: 100,
    },
    sectionText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    Text2: {},
    // Estilos para la barra de tareas
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#146c51',
        height: 70,
    },
    tabBarButton: {
        flex: 1,
        padding: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 0,
    },
    tabBarText: {
        color: 'white',
        fontSize: 13,
    },
    tabBarImage: {
        width: 20,
        height: 20,
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
    },
});
export default Community;