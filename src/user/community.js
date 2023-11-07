import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '@enviroment';
import NavigationBar from '../modal/NavigatorBar';
import CardImage from '../modal/CardImage';
import { Card } from 'react-native-elements';

const Community = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                const apiUrl = `${API_URL}/api/v1/community`;
                const response = await axios.get(apiUrl);

                if (response.data && response.data.communities) {
                    setData(response.data.communities);
                }
            } catch (error) {
                console.error('Error al obtener datos desde la API:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCommunityData();
    }, []);

    return (
        <View style={styles.container}>
            <CardImage />
            <ScrollView style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate('CommunityCreate');
                    }}
                >
                    <Text style={styles.buttonText}>Crear Comunidad</Text>
                </TouchableOpacity>
                {loading ? (
                    <ActivityIndicator size="large" color="#39A466" style={styles.loadingIndicator} />
                ) : (
                    data.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                // Redirige a la vista "CommunityPost" y pasa el ID de la comunidad
                                navigation.navigate('CommunityPost', { communityId: item.id });
                            }}
                        >
                            <Card key={index} containerStyle={styles.cardContainer}>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Divider />
                                <View style={styles.cardContent}>
                                    <View style={styles.leftSection}>
                                        <Image
                                            source={require('../../assets/corredor.png')}
                                            style={styles.customImage}
                                        />
                                    </View>
                                    <View style={styles.rightSection}>
                                        <Text style={styles.sectionText}>{item.name}</Text>
                                        <Text style={styles.Text2}>{item.issue}</Text>
                                    </View>
                                </View>
                            </Card>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
            <NavigationBar navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    customImageLarge: {
        width: 100, // Ajusta el ancho de la imagen según tus necesidades
        height: 100, // Ajusta la altura de la imagen según tus necesidades
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    contentContainer: {
        flex: 0.6,
        backgroundColor: '#d7eec1',
        borderWidth: 1,
        borderColor: 'lightgray',
        marginTop: 0,
    },
    customSectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        marginTop: 10,
    },
    borderedSection: {
        borderWidth: 2,
        borderColor: '#32a260',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    Text2: {},
    button: {
        backgroundColor: '#39A466',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 30,
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContainer: {
        padding: 10,
        marginBottom: 10,
        borderColor: '#32a260', // Color del borde verde
        borderWidth: 2, // Ancho del borde
        borderRadius: 10, // Radio de borde para hacerlo más redondeado
    },
    cardContent: {
        flexDirection: 'row',
    },
    leftSection: {
        flex: 1,
    },
    rightSection: {
        flex: 2,
    },
    customImage: {
        width: 100,
        height: 100,
    },
    sectionText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    Text2: {},
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
    loadingIndicator: {
        marginTop: 20,
    },
});

export default Community;
