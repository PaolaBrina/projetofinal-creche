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
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador, { codigo }')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Horário</Text>
                    </View>
            
            <View style={styles.viewbutton}>
            <TouchableOpacity style={styles.button} onPress={fetchHorarios}>
                <Text style={styles.buttonText}>Buscar Horários</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Adicionar Horário</Text>
            </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                horarios.length > 0 ? (
                    <FlatList
                        data={horarios}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.horarioText}>
                                <Text style={styles.horarioText}>Codturma: {item.codturma}</Text>
                                <Text style={styles.horarioText}>CPF: {item.cpf}</Text>
                                <Text style={styles.horarioText}>Data de Nascimento: {item.datanascimento}</Text>
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
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingTop: 60,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#283673',
    },
    topBarTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1, // Permite que o texto ocupe o espaço disponível
        textAlign: 'center', // Centraliza o texto
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
    horarioText: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    horarioText: {
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
