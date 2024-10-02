import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import AlunoAdicionar from './AlunoAdicionar';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function AlunoCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchAlunos = async () => {
        setLoading(true); 
        try {
            const response = await api.get('/aluno'); 
            console.log('Resposta completa:', response);
            if (Array.isArray(response.data)) {
                setAlunos(response.data.aluno); 
            } else if (response.data && response.data.aluno) {
                setAlunos(response.data.aluno); 
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar alunos:', error);
            Alert.alert('Erro', 'Erro ao buscar alunos, veja o console para mais detalhes.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Aluno</Text>
                    </View>

            <TouchableOpacity style={styles.button} onPress={fetchAlunos}>
                <Text style={styles.buttonText}>Buscar Alunos</Text>
            </TouchableOpacity>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                alunos.length > 0 ? (
                    <FlatList
                        data={alunos}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.alunoItem}>
                                <Text style={styles.alunoText}>Nome: {item.nome}</Text>
                                <Text style={styles.alunoText}>Data de Nascimento: {item.datanascimento}</Text>
                                <Text style={styles.alunoText}>Sexo: {item.sexo}</Text>
                                <Text style={styles.alunoText}>Endereço: {item.endereco}</Text>
                                <Text style={styles.alunoText}>Status: {item.status}</Text>
                            </View>
                        )}
                    />
                ) : (
                   <Text></Text>
                )
            )}

            <TouchableOpacity style={styles.button} onPress={openModal}>
                <Text style={styles.buttonText}>Adicionar Aluno</Text>
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
                        <AlunoAdicionar closeModal={closeModal} />
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
    alunoItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    alunoText: {
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
