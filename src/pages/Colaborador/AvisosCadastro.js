import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import AvisoAdicionar from './AvisosAdicionar';

import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function AvisosCadastro({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [avisos, setAvisos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAviso, setSelectedAviso] = useState(null);
    const [modalEditVisible, setModalEditVisible] = useState(false); // Novo estado para controle do modal de edição
    const [error, setError] = useState('');  // Estado para erro

    const { codigo } = route.params || {};

    const openEditModal = (aviso) => {
        setSelectedAviso(aviso);  // Define o aviso que será editado
        setModalEditVisible(true); // Abre o modal de edição
    };

    const openAddModal = () => {
        setModalVisible(true);
    };

    const closeAddModal = () => {
        setModalVisible(false);
    };

    const closeEditModal = () => {
        setModalEditVisible(false);
        setSelectedAviso(null); // Limpar aviso selecionado ao fechar o modal
    };

    const toggleAvisoDetails = (aviso) => {
        setSelectedAviso((prevAviso) => (prevAviso && prevAviso.codigo === aviso.codigo ? null : aviso));
    };

    const handleDelete = (codigo) => {
        Alert.alert('Excluir', `Deseja excluir o aviso com código ${codigo}?`, [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', onPress: () => console.log('Aviso excluído:', codigo) }
        ]);
    };

    const handleSeta = () => {
        navigation.navigate('HomeColaborador', { codigo });
    };

    const fetchAvisos = async () => {
        setLoading(true);
        setError(''); // Limpa a mensagem de erro ao iniciar a busca
        try {
            const response = await api.get('/avisos');
            console.log('Resposta completa:', response);  
            
            if (Array.isArray(response.data)) {
                setAvisos(response.data);
            } else if (response.data && response.data.avisos) {
                setAvisos(response.data.avisos); 
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                setError('Formato inesperado dos dados recebidos.'); // Exibe erro específico
            }
        } catch (error) {
            console.error('Erro ao buscar avisos:', error);
            setError('Erro ao buscar avisos, veja o console para mais detalhes.'); // Mensagem de erro
        } finally {
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <FlatList
                data={avisos}
                keyExtractor={(item) => item.codigo.toString()}
                ListHeaderComponent={
                    <>
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.btnSeta} onPress={handleSeta}>
                                <AntDesign name="caretleft" size={30} color="white" />
                            </TouchableOpacity>
                            <Text style={styles.topBarTxt}>Cadastro de Avisos</Text>
                        </View>

                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.button} onPress={fetchAvisos}>
                                <Text style={styles.buttonText}>Buscar Avisos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={openAddModal}>
                                <Text style={styles.buttonText}>Adicionar Aviso</Text>
                            </TouchableOpacity>
                        </View>

                        {loading && <Text>Carregando...</Text>}
                    </>
                }
                ListEmptyComponent={
                    error ? (
                        <Text style={styles.errorText}>{error}</Text> // Exibe a mensagem de erro
                    ) : (
                        <Text style={styles.errorText}>Avisos não cadastrados.</Text> // Caso não haja avisos
                    )
                }
                renderItem={({ item }) => (
                    <View style={styles.avisoItemContainer}>
                        <View style={styles.avisoRow}>
                            <TouchableOpacity 
                                style={styles.avisoInfo} 
                                onPress={() => toggleAvisoDetails(item)}
                            >
                                <MaterialIcons name="announcement" size={24} color="black" />
                                <Text style={styles.avisoCodigo}>{item.codigo}</Text>
                            </TouchableOpacity>
                            <View style={styles.iconsContainer}>
                                <TouchableOpacity 
                                    onPress={() => openEditModal(item)} 
                                    style={styles.iconButton}
                                >
                                    <MaterialIcons name="edit" size={25} color="blue" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => handleDelete(item.codigo)} 
                                    style={styles.iconButton}
                                >
                                    <MaterialIcons name="delete" size={25} color="red" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        {selectedAviso?.codigo === item.codigo && (
                            <View style={styles.avisoDetails}>
                                <Text style={styles.avisoText}>Código: {item.codigo}</Text>
                                <Text style={styles.avisoText}>autor: {item.codturma}</Text>
                                <Text style={styles.avisoText}>titulo: {item.codtitulo}</Text>
                                <Text style={styles.avisoText}>autor: {item.codautor}</Text>
                                <Text style={styles.avisoText}>Data e Hora: {item.datahora}</Text>
                                <Text style={styles.avisoText}>Descrição: {item.descricao}</Text>
                                <Text style={styles.avisoText}>Foto: {item.descricao}</Text>
                                {item.foto && (
                                    <Image
                                        source={{ uri: `data:image/jpeg;base64,${item.foto}` }}
                                        style={styles.avisoImage} // Certifique-se de usar o estilo correto aqui
                                    />
                                )}
                            </View>
                        )}
                    </View>
                )}
            />
    
            {/* Modal de Adicionar Aviso */}
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
                        <Text>Adicionar Aviso</Text>
                        <AvisoAdicionar closeModal={closeAddModal} />
                        {/* Aqui você pode adicionar o formulário para adicionar o aviso */}
                    </View>
                </View>
            </Modal>

            {/* Modal de Editar Aviso */}
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
                        <Text>Editar Aviso</Text>
                        {/* Aqui você pode adicionar o formulário para editar o aviso */}
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
    btnSeta: {
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
    viewButton: {
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    avisoItemContainer: {
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
    avisoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    avisoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avisoCodigo: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    iconsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    iconButton: {
        marginLeft: 10,
    },
    avisoDetails: {
        marginTop: 10,
    },
    avisoText: {
        fontSize: 14,
    },
    avisoImage: {
        width: 200,
        height: 200,
        marginTop: 10,
        resizeMode: 'contain',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
});
