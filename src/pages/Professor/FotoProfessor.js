import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, ScrollView, Alert, Image, FlatList } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
/* import tela modal */
import FotosProfAdicionar from './FotosProfAdicionar';
import { api } from '../../api/api';

export default function FotoProfessor({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [fotos, setFotos] = useState([]);  // Estado para armazenar as fotos
    const [loading, setLoading] = useState(false);  // Estado para controlar o carregamento
    const [selectedFoto, setSelectedFoto] = useState(null); // Estado para armazenar a foto selecionada
    const [noActivities, setNoActivities] = useState(false);
    const [fetching, setFetching] = useState(false);  // Novo estado para controlar a busca
    const { codigo } = route.params || {};
    
    // Função para fechar o modal
    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    // Função para abrir o modal de Adicionar Foto
    const openFotosAdicionarModal = () => {
        setModalContent('FotosProfAdicionar');  // Define o conteúdo do modal
        setModalVisible(true);  // Abre o modal
    };

    // Função para buscar as fotos na API
   // Função para buscar as fotos na API
const fetchBuscar = async () => {
    if (codigo) {
        try {
            setLoading(true); // Ativa o estado de carregamento
            const response = await api.get(`/api/professor/${codigo}/fotos`);

            console.log('Response Data:', response.data); // Certifique-se de que os dados chegam
            const fotos = response.data.fotos; // Acessando a propriedade "fotos"

            if (response.status === 200 && fotos.length > 0) {
                setFotos(fotos);
                setNoActivities(false);
            } else {
                setNoActivities(true); // Sem fotos
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.warn('Nenhuma foto encontrada para este professor.');
                setNoActivities(true); // Atualiza estado para mostrar mensagem
            } else {
                console.error('Erro ao buscar fotos:', error);
                Alert.alert('Erro', 'Não foi possível buscar as fotos. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false); // Desativa o estado de carregamento
        }
        }
    };


    // Função para alternar a exibição dos detalhes da foto
    const toggleFotoDetails = (foto) => {
        setSelectedFoto((prevFoto) => (
            prevFoto && prevFoto.codigo === foto.codigo ? null : foto
        ));
    };

    // Carregar as fotos quando a tela for montada
    useEffect(() => {
        fetchBuscar();
    }, [codigo]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
                        <AntDesign name="caretleft" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.topBarTxt}>Cadastro Fotos</Text>
                </View>

                <View style={styles.viewbutton}>
                    <TouchableOpacity style={styles.button} onPress={fetchBuscar}>
                        <Text style={styles.buttonText}>Buscar Fotos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={openFotosAdicionarModal}>
                        <Text style={styles.buttonText}>Adicionar Fotos</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>

                {loading ? (
                    <Text>Carregando Fotos...</Text>
                ) : (
                    fotos.length === 0 || noActivities ? (
                        <Text style={styles.noActivitiesText}>Nenhuma foto cadastrada</Text>
                    ) : (
                        <FlatList
                        data={fotos}
                        keyExtractor={(item) => item.codigo ? item.codigo.toString() : Math.random().toString()} // Garante que a chave seja única
                        renderItem={({ item }) => (
                            <View style={styles.fotoItemContainer}>
                                <View style={styles.fotoRow}>
                                    <TouchableOpacity style={styles.fotoInfo} onPress={() => toggleFotoDetails(item)}>
                                        <Foundation name="camera" size={24} color="black" />
                                        <Text style={styles.fotoName}>{item.codigo_fotos}</Text>
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
                                {selectedFoto && selectedFoto.codigo === item.codigo && (
                                    <View style={styles.fotoDetails}>
                                        <Text style={styles.fotoText}>Código Turma: {item.codturma}</Text>
                                        <Text style={styles.fotoText}>Datahora: {item.datahora}</Text>
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
                ))}

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
                            {modalContent === 'FotosProfAdicionar' && codigo && (
                                <FotosProfAdicionar closeModal={closeModal} codigo={codigo} />
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
    fotoItemContainer: {
        marginBottom: 20, 
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    fotoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fotoName: {
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
    fotoDetails: {
        marginTop: 10,
        paddingLeft: 10,
    },
    fotoText: {
        fontSize: 16,
    },
    fotoImage: {
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
    fotoInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1, 
    },
    codeContainer: {
        marginTop: 10,
        paddingHorizontal: 20,
    },
    codeText: {
        fontSize: 16,
    },
    alunoImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginTop: 10,
        alignSelf: 'center',
    },
});
