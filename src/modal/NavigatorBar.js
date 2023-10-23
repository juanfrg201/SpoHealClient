import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Lista from '../../assets/lista.png';
import Perfil from '../../assets/usuario.png';
import Ruta from '../../assets/ruta.png';
import Comunidades from '../../assets/comunidades.png';

const NavigationBar = ({ navigation,  active }) => {
    return (
        <View style={styles.tabBar}>
            <TouchableOpacity
                style={styles.tabBarButton}
                onPress={() => {
                    // Navega a la pantalla de Ejercicios
                    navigation.navigate('Ejercicios');
                }}
            >
                <Image source={Lista} style={styles.tabBarImage} />
                <Text style={styles.tabBarText}>Ejercicios</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabBarButton}
                onPress={() => {
                    // Navega a la pantalla de Parametizer
                    navigation.navigate('Inicio');
                }}
            >
                <Image source={Perfil} style={styles.tabBarImage} />
                <Text style={styles.tabBarText}>Inicio</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabBarButton}
                onPress={() => {
                    // Navega a la pantalla de Ruta
                    navigation.navigate('Ruta');
                }}
            >
                <Image source={Ruta} style={styles.tabBarImage} />
                <Text style={styles.tabBarText}>Ruta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabBarButton}
                onPress={() => {
                    // Navega a la pantalla de Comunidades
                    navigation.navigate('Community');
                }}
            >
                <Image source={Comunidades} style={styles.tabBarImage} />
                <Text style={styles.tabBarText}>Comunidades</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default NavigationBar;