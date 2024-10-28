import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import CalendarioAdicionar from './CalendarioAdicionar';


import AntDesign from '@expo/vector-icons/AntDesign';

export default function CalendarioCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [calendario, setCalendario] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchCalendario = async () => {
        setLoading(true); 
        try {
            const response = await api.get('/calendario'); 
            console.log('Resposta completa:', response); 
            
            if (Array.isArray(response.data)) {
                setCalendario(response.data.calendario); 
            } else if (response.data && response.data.calendario) {
                setCalendario(response.data.calendario); 
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar calendario:', error);
            Alert.alert('Erro', 'Erro ao buscar calendario, veja o console para mais detalhes.');
        } finally {
            setLoading(false); 
        }
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setNewfoto(result.assets[0].uri);
        }
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Calendario</Text>
                    </View>
            
            <View style={styles.viewbutton}>
            <TouchableOpacity style={styles.button} onPress={fetchCalendario}>
                <Text style={styles.buttonText}>Buscar Calendario</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Adicionar Calendario</Text>
            </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                calendario.length > 0 ? (
                    <FlatList
                        data={calendario}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.professorItem}>
                                <Text style={styles.professorText}>foto: {item.foto}</Text>
                            </View>
                        )}
                    />
                ) : (
                   <Text></Text>
                )
            )}


            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <CalendarioAdicionar closeModal={closeModal} />
                    </View>
                </View>
            </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingTop: 60,
        paddingLeft: 30,
        paddingRight: 20,
        backgroundColor: '#283673',
      },
    topBarTxt: {
        color: '#fff',
        fontSize: 18,         
        fontWeight: 'bold'
    },
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    button: {
        backgroundColor: '#FFEF95',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewbutton: {
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    professorItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    professorText: {
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    closeButton: {
        alignSelf: 'flex-end',
        padding: 5,
    },
    closeButtonText: {
        fontSize: 18,
        color: 'red',
    },
});
