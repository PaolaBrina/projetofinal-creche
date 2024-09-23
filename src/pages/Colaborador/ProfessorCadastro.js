import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import ProfessorAdicionar from './ProfessorAdicionar';
import axios from 'axios';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfessorCadastro() {
    const [modalVisible, setModalVisible] = useState(false);
    const [professores, setProfessores] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const handleSeta = () => {
        navigation.navigate('HomeColaborador');
    }

    const fetchProfessores = async () => {
        setLoading(true); // Inicia o carregamento
        try {
            const response = await axios.get('http://localhost:3000/professor'); // Usando localhost
            console.log('Resposta completa:', response); // Log da resposta completa
            
            // Verifique se a estrutura da resposta é a esperada
            if (Array.isArray(response.data)) {
                setProfessores(response.data); // Armazena os dados recebidos
            } else if (response.data && response.data.professores) {
                // Se os dados estiverem dentro de um objeto
                setProfessores(response.data.professores); // Ajuste conforme a estrutura
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar professores:', error);
            Alert.alert('Erro', 'Erro ao buscar professores, veja o console para mais detalhes.');
        } finally {
            setLoading(false); // Finaliza o carregamento
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={handleSeta}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Professor</Text>
                    </View>

            <TouchableOpacity style={styles.button} onPress={fetchProfessores}>
                <Text style={styles.buttonText}>Buscar Professores</Text>
            </TouchableOpacity>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                professores.length > 0 ? (
                    <FlatList
                        data={professores}
                        keyExtractor={(item) => item.id.toString()} // Supondo que o ID do professor está na chave 'id'
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
                    <Text>Nenhum professor encontrado.</Text>
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
                        <ProfessorAdicionar closeModal={closeModal} />
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
