import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, ScrollView, Alert, Image, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
/* import telas modal */
import AtividadesProfAdicionar from './AtividadesProfAdicionar';
import { api } from '../../../api/api';

export default function AtividadesCadastro({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [atividades, setAtividades] = useState([]);  // Estado para armazenar as atividades
    const [loading, setLoading] = useState(false);  // Estado para controlar o carregamento
    const [selectedAtividade, setSelectedAtividade] = useState(null); // Estado para armazenar a atividade selecionada
    const { codigo } = route.params || {};
    
    // Função para fechar o modal
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    // Função para abrir o modal de Adicionar Atividade
    const openAtividadesProfAdicionarModal = () => {
        console.log('Codigo recebido:', codigo);
        setModalContent('AtividadesProfAdicionar');  // Define o conteúdo do modal
        setModalVisible(true);  // Abre o modal
        console.log('Codigo recebido:', codigo);

    };

    
    

    // Função para buscar as atividades na API
    const fetchBuscar = async () => {
        setLoading(true);
        try {
            const response = await api.get('/atividades');
            console.log('Resposta completa:', response);
            
            if (Array.isArray(response.data)) {
                setAtividades(response.data);  // Armazena as atividades no estado
            } else if (response.data && response.data.atividades) {
                setAtividades(response.data.atividades);  // Armazena as atividades no estado
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar atividades:', error);
            Alert.alert('Erro', 'Erro ao buscar atividades, veja o console para mais detalhes.');
        } finally {
            setLoading(false);
        }
    };

    // Função para alternar a exibição dos detalhes da atividade
    const toggleAtividadeDetails = (atividade) => {
        setSelectedAtividade((prevAtividade) => (
            prevAtividade && prevAtividade.codigo === atividade.codigo ? null : atividade
        ));
    };

    // Carregar as atividades quando a tela for montada
    useEffect(() => {
        fetchBuscar();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
                        <AntDesign name="caretleft" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.topBarTxt}>Cadastro Atividades</Text>
                </View>

                <View style={styles.viewbutton}>
                    <TouchableOpacity style={styles.button} onPress={fetchBuscar}>
                        <Text style={styles.buttonText}>Buscar Atividades</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={openAtividadesProfAdicionarModal}>
                        <Text style={styles.buttonText}>Adicionar Atividades</Text>
                    </TouchableOpacity>
                    <View style={styles.codeContainer}>
                        <Text style={styles.codeText}>Código do responsavel: {codigo}</Text>
                    </View>
                </View>
                </ScrollView>

                {loading ? (
                    <Text>Carregando Atividades...</Text>
                ) : (
                    <FlatList
                        data={atividades}
                        keyExtractor={(item) => item.codigo.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.alunoItemContainer}>
                                <View style={styles.alunoRow}>
                                    <TouchableOpacity style={styles.alunoInfo} onPress={() => toggleAtividadeDetails(item)}>
                                        <Foundation name="clipboard-pencil" size={24} color="black" />
                                        <Text style={styles.alunoName}>{item.codigo}</Text>
                                    </TouchableOpacity>
                                    <View style={styles.iconsContainer}>
                                        <TouchableOpacity onPress={() => openEditModal(item)} style={styles.iconButton}>
                                            <MaterialIcons name="edit" size={25} color="blue" />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleDelete(item.codigo)} style={styles.iconButton}>
                                            <MaterialIcons name="delete" size={25} color="red" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                {selectedAtividade && selectedAtividade.codigo === item.codigo && (
                                    <View style={styles.alunoDetails}>
                                        <Text style={styles.alunoText}>Codigo Turma: {item.codturma}</Text>
                                        <Text style={styles.alunoText}>Datahora: {item.datahora}</Text>
                                        <Text style={styles.alunoText}>Descricao: {item.descricao}</Text>
                                        {item.foto && (
                                            <Image
                                                source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                                style={styles.alunoImage}
                                            />
                                        )}
                                    </View>
                                )}
                            </View>
                        )}
                    />
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
                            {modalContent === 'AtividadesProfAdicionar' && codigo && (
                                <AtividadesProfAdicionar closeModal={closeModal} codigo={codigo} />
                            )}
                        </View>
                    </View>
                </Modal>



           
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
        padding: 10,
        paddingTop: 60,
        backgroundColor: '#283673',
    },
    topBarTxt: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
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
    alunoItemContainer: {
        marginBottom: 20, // Aumentei o espaçamento entre os itens
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    alunoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    alunoName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        flex: 1,
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    iconButton: {
        marginLeft: 10,
    },
    alunoDetails: {
        marginTop: 10,
        paddingLeft: 10,
    },
    alunoText: {
        fontSize: 16,
    },
    alunoImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
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
    alunoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Garante que o texto ocupe o espaço disponível
    },
    codeContainer: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
      },
      codeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
      },
});
