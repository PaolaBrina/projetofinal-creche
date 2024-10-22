import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import HorarioAdicionar from './HorarioAdicionar';


import AntDesign from '@expo/vector-icons/AntDesign';

export default function HorarioCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchHorarios = async () => {
        setLoading(true); 
        try {
            const response = await api.get('/horario'); 
            console.log('Resposta completa:', response); 
            
            if (Array.isArray(response.data)) {
                setHorarios(response.data.horario); 
            } else if (response.data && response.data.horario) {
                setHorarios(response.data.horario); 
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar horarios:', error);
            Alert.alert('Erro', 'Erro ao buscar horarios, veja o console para mais detalhes.');
        } finally {
            setLoading(false); // Finaliza o carregamento
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
                        <Text style={styles.topBarTxt}>Cadastro Professor</Text>
                    </View>

            <TouchableOpacity style={styles.button} onPress={fetchHorarios}>
                <Text style={styles.buttonText}>Buscar horarios</Text>
            </TouchableOpacity>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                horarios.length > 0 ? (
                    <FlatList
                        data={horarios}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.professorItem}>
                                <Text style={styles.professorText}>Nome: {item.nome}</Text>
                                <Text style={styles.professorText}>CPF: {item.cpf}</Text>
                                <Text style={styles.professorText}>Data de Nascimento: {item.datanascimento}</Text>
                                <Text style={styles.professorText}>Sexo: {item.sexo}</Text>
                                <Text style={styles.professorText}>Email: {item.email}</Text>
                                <Text style={styles.professorText}>Endereço: {item.endereco}</Text>
                                <Text style={styles.professorText}>Telefone: {item.telefone}</Text>
                                <Text style={styles.professorText}>Login: {item.login}</Text>
                                <Text style={styles.professorText}>Senha: {item.senha}</Text>
                                <Text style={styles.professorText}>Status: {item.status}</Text>
                            </View>
                        )}
                    />
                ) : (
                   <Text></Text>
                )
            )}

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Adicionar Professor</Text>
            </TouchableOpacity>

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
                        <HorarioAdicionar closeModal={closeModal} />
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
        paddingTop: 50,
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
