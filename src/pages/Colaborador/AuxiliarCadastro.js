import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import AuxiliarAdicionar from './AuxiliarAdicionar';


import AntDesign from '@expo/vector-icons/AntDesign';

export default function AuxiliarCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [auxiliares, setAuxiliar] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchAuxiliares = async () => {
        setLoading(true); // Inicia o carregamento
        try {
            const response = await api.get('/auxiliar'); 
            console.log('Resposta completa:', response); // Log da resposta completa
            
            // Verifique se a estrutura da resposta é a esperada
            if (Array.isArray(response.data)) {
                setAuxiliar(response.data.auxiliar); // Armazena os dados recebidos
            } else if (response.data && response.data.auxiliar) {
                // Se os dados estiverem dentro de um objeto
                setAuxiliar(response.data.auxiliar); // Ajuste conforme a estrutura
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar auxiliares:', error);
            Alert.alert('Erro', 'Erro ao buscar auxiliares, veja o console para mais detalhes.');
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Auxiliar</Text>
                    </View>

            <View style={styles.viewbutton}>
            <TouchableOpacity style={styles.button} onPress={fetchAuxiliares}>
                <Text style={styles.buttonText}>Buscar Auxiliares</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Adicionar Auxiliares</Text>
            </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                auxiliares.length > 0 ? (
                    <FlatList
                        data={auxiliares}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.auxiliarItem}>
                                <Text style={styles.auxiliarText}>Nome: {item.nome}</Text>
                                <Text style={styles.auxiliarText}>CPF: {item.cpf}</Text>
                                <Text style={styles.auxiliarText}>Data de Nascimento: {item.datanascimento}</Text>
                                <Text style={styles.auxiliarText}>Sexo: {item.sexo}</Text>
                                <Text style={styles.auxiliarText}>Email: {item.email}</Text>
                                <Text style={styles.auxiliarText}>Endereço: {item.endereco}</Text>
                                <Text style={styles.auxiliarText}>Telefone: {item.telefone}</Text>
                                <Text style={styles.auxiliarText}>Status: {item.status}</Text>
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
                        <AuxiliarAdicionar closeModal={closeModal} />
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
    auxiliarItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    auxiliarText: {
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
