import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Lista from '../../assets/lista.png';
import Perfil from '../../assets/usuario.png';
import Ruta from '../../assets/ruta.png';
import Comunidades from '../../assets/comunidades.png';

const ProfileScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../../assets/LogoBG_p.png')}
                    style={styles.profileImage}
                />
            </View>
            <ScrollView style={styles.contentContainer}>
                <View style={[styles.customSectionContainer, styles.firstCustomSection]}>
                    <View style={styles.leftSection}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/corredor.png')} style={styles.customImage} />
                        </View>
                    </View>
                    <View style={styles.rightSection}>
                        <View style={styles.borderedSection}>
                            <Text style={styles.sectionText}>Running</Text>
                        </View>
                        <View style={styles.borderedSection}>
                            <Text style={styles.Text2}>El running, footing, correr o jogging, son algunos de los términos más usados en la actualidad para referirse a la carrera continua, el acto por el que alternativamente los pies tocan el suelo a una velocidad mayor que al andar.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.customSectionContainer}>
                    <View style={styles.leftSection}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/ciclismo.png')} style={styles.customImage} />
                        </View>
                    </View>
                    <View style={styles.rightSection}>
                        <View style={styles.borderedSection}>
                            <Text style={styles.sectionText}>Cicla</Text>
                        </View>
                        <View style={styles.borderedSection}>
                            <Text style={styles.Text2}>El running, footing, correr o jogging, son algunos de los términos más usados en la actualidad para referirse a la carrera continua, el acto por el que alternativamente los pies tocan el suelo a una velocidad mayor que al andar.</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.customSectionContainer}>
                    <View style={styles.leftSection}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../assets/pesa.png')} style={styles.customImage} />
                        </View>
                    </View>
                    <View style={styles.rightSection}>
                        <View style={styles.borderedSection}>
                            <Text style={styles.sectionText}>Pesas</Text>
                        </View>
                        <View style={styles.borderedSection}>
                            <Text style={styles.Text2}>El running, footing, correr o jogging, son algunos de los términos más usados en la actualidad para referirse a la carrera continua, el acto por el que alternativamente los pies tocan el suelo a una velocidad mayor que al andar.</Text>
                        </View>

                    </View>
                </View>
            </ScrollView>
            {/* Barra de tareas */}
            <View style={styles.tabBar}>
                <TouchableOpacity
                    style={styles.tabBarButton}
                    onPress={() => {
                        // Navega a la pantalla de Login
                        navigation.navigate('Login');
                    }}
                >
                    <Image source={Lista} style={styles.tabBarImage} />
                    <Text style={styles.tabBarText}>Ejercicios</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabBarButton}
                    onPress={() => {
                        // Navega a la pantalla de Parametizer
                        navigation.navigate('Parametizer');
                    }}
                >
                    <Image source={Perfil} style={styles.tabBarImage} />
                    <Text style={styles.tabBarText}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabBarButton}
                    onPress={() => {
                        // Navega a la pantalla de Register
                        navigation.navigate('Register');
                    }}
                >
                    <Image source={Ruta} style={styles.tabBarImage} />
                    <Text style={styles.tabBarText}>Ruta</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabBarButton}
                    onPress={() => {
                        // Navega a la pantalla de Register
                        navigation.navigate('Register');
                    }}
                >
                    <Image source={Comunidades} style={styles.tabBarImage} />
                    <Text style={styles.tabBarText}>Comunidades</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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
});
export default ProfileScreen;