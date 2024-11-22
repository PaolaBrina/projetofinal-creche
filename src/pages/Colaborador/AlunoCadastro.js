import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, Image } from 'react-native';
import AlunoAdicionar from './AlunoAdicionar';
import AlunoEditar from './AlunoEditar';  // Importando o componente de edição

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AlunoCadastro({ navigation,route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);  // Novo estado para controle do modal de edição
    const [alunos, setAlunos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAluno, setSelectedAluno] = useState(null);

    const { codigo } = route.params || {};

    const openAddModal = () => {
        setModalVisible(true);
    };

    const closeAddModal = () => {
        setModalVisible(false);
    };

    const openEditModal = (aluno) => {
        setSelectedAluno(aluno);  // Define o aluno que será editado
        setModalEditVisible(true); // Abre o modal de edição
    };

    const closeEditModal = () => {
        setModalEditVisible(false);
        setSelectedAluno(null); // Limpar aluno selecionado ao fechar o modal
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

    const toggleAlunoDetails = (aluno) => {
        setSelectedAluno((prevAluno) => (prevAluno && prevAluno.codigo === aluno.codigo ? null : aluno));
    };

    const handleDelete = (codigo) => {
        Alert.alert('Excluir', `Deseja excluir o aluno com código ${codigo}?`, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', onPress: () => console.log('Aluno excluído:', codigo) }
        ]);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Cadastro Aluno</Text>
            </View>

            <View style={styles.viewbutton}>
                <TouchableOpacity style={styles.button} onPress={fetchAlunos}>
                    <Text style={styles.buttonText}>Buscar Alunos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={openAddModal}>
                    <Text style={styles.buttonText}>Adicionar Aluno</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                <FlatList
                    data={alunos}
                    keyExtractor={(item) => item.codigo.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.alunoItemContainer}>
                            <View style={styles.alunoRow}>
                                <TouchableOpacity style={styles.alunoInfo} onPress={() => toggleAlunoDetails(item)}>
                                    <MaterialIcons name="person" size={24} color="black" />
                                    <Text style={styles.alunoName}>{item.nome}</Text>
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
                            {selectedAluno && selectedAluno.codigo === item.codigo && (
                                <View style={styles.alunoDetails}>
                                    <Text style={styles.alunoText}>Data de Nascimento: {item.datanascimento}</Text>
                                    <Text style={styles.alunoText}>Sexo: {item.sexo}</Text>
                                    {item.foto && (
                                        <Image
                                            source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                            style={styles.alunoImage}
                                        />
                                    )}
                                    <Text style={styles.alunoText}>Endereço: {item.endereco}</Text>
                                    <Text style={styles.alunoText}>Status: {item.status}</Text>
                                </View>
                            )}
                        </View>
                    )}
                />
            )}

            {/* Modal de Adicionar Aluno */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeAddModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeAddModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <AlunoAdicionar closeModal={closeAddModal} />
                    </View>
                </View>
            </Modal>

            {/* Modal de Editar Aluno */}
            <Modal
                visible={modalEditVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeEditModal}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <TouchableOpacity onPress={closeEditModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        {/* Passando o selectedAluno para o modal de edição */}
                        <AlunoEditar aluno={selectedAluno} closeModal={closeEditModal} />
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
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
        marginTop: 40, // Aumentei a distância entre os botões e os alunos
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
    alunoIconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Adicionando a distribuição entre os elementos
    },
    alunoName: {
        fontSize: 18,
        marginLeft: 10,
        flex: 1, // Para garantir que o nome ocupe o espaço disponível
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
    alunoImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
    alunoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Distribui o espaço entre o nome e os ícones
    },
    alunoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, // Garante que o texto ocupe o espaço disponível
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Alinha os ícones à direita
    },
});
