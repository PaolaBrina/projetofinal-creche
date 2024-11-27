import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, FlatList, Modal, KeyboardAvoidingView, PermissionsAndroid, Platform } from 'react-native';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AvisoAdicionar from './AvisosAdicionar';
registerTranslation('pt', pt);

export default function AvisosCadastro({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalEditVisible, setModalEditVisible] = useState(false);
    const [avisos, setAvisos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedAviso, setSelectedAviso] = useState(null);
    const [dataturma, setDataturma] = useState([{ label: "", value: "" }]);
    const [isFocus, setIsFocus] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState('');



    const { codigo } = route.params || {};

    const toggleAvisoDetails = (aviso) => {
        setSelectedAviso((prevAviso) => (prevAviso && prevAviso.codigo === aviso.codigo ? null : aviso));
    };

    // Funções para abrir e fechar o modal de adicionar aviso
    const openAddModal = () => {
        setModalVisible(true);
    };

    const closeAddModal = () => {
        setModalVisible(false);
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

    const fetchTurma = async () => {
        try {
            const response = await api.get('/turma');
            const formattedData = response.data.map(item => ({
                label: item.nome,
                value: item.codigo.toString()
            }));
            setDataturma(formattedData);
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
        }
    };

    const openEditModal = (aviso) => {
        setSelectedAviso(aviso);
        setModalEditVisible(true);
    };

    const closeEditModal = () => {
        setModalEditVisible(false);
        setSelectedAviso(null);
    };

    const handleDelete = async (codigo) => {
        Alert.alert('Excluir', `Deseja excluir o aviso com código ${codigo}?`, [
            { text: 'Cancelar', style: 'cancel' },
            { 
                text: 'Excluir', 
                onPress: async () => {
                    try {
                        const response = await api.delete(`/avisos/${codigo}`);
                        if (response.status === 200 || response.status === 204) {
                            // Atualiza a lista de avisos localmente
                            setAvisos((prevAvisos) => prevAvisos.filter((aviso) => aviso.codigo !== codigo));
                            Alert.alert('Sucesso', 'Aviso excluído com sucesso.');
                        } else {
                            console.error('Erro ao excluir o aviso:', response.data);
                            Alert.alert('Erro', 'Não foi possível excluir o aviso.');
                        }
                    } catch (error) {
                        console.error('Erro ao excluir o aviso:', error);
                        Alert.alert('Erro', 'Ocorreu um erro ao tentar excluir o aviso.');
                    }
                }
            }
        ]);
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled) {
            setSelectedAviso(prev => ({
                ...prev,
                foto: result.assets[0].base64
            }));
        }
    };

    const onDismissSingle = useCallback(() => {
        setSelectedAviso(prev => ({ ...prev, datahora: undefined }));
    }, []);

    const onConfirmSingle = useCallback((params) => {
        setSelectedAviso(prev => ({ ...prev, datahora: params.date }));
    }, []);

    const saveEdit = async () => {
        try {
            const formattedDate = format(new Date(selectedAviso.datahora), 'yyyy-MM-dd HH:mm');
            const avisoToSave = {
                ...selectedAviso,
                datahora: formattedDate
            };
            await api.put(`/avisos/${selectedAviso.codigo}`, avisoToSave);
            fetchAvisos();
            closeEditModal();
            Alert.alert('Sucesso', 'Aviso atualizado com sucesso.');
        } catch (error) {
            console.error('Erro ao atualizar aviso:', error);
            Alert.alert('Erro', 'Erro ao atualizar aviso.');
        }
    };

    useEffect(() => {
        fetchAvisos();
        fetchTurma();
    }, []);


    const handleSeta = () => {
        navigation.navigate('HomeColaborador', { codigo });
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
                                <Text style={styles.avisoText}>titulo: {item.titulo}</Text>
                                <Text style={styles.avisoText}>autor: {item.autor}</Text>
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
            {/* Modal de Adicionar Aviso */}
            <Modal
                visible={modalEditVisible} // Modal só é visível quando modalEditVisible é true
                animationType="slide"
                transparent={true}
                onRequestClose={closeEditModal}
            >
    <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.form}>
            <TouchableOpacity onPress={closeEditModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Adicionar Aviso</Text>

            {/* Campo: Código da turma */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Código da turma:</Text>
                <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataturma}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione item' : '...'}
                    searchPlaceholder="Procurar..."
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={(item) => {
                        setSelectedAviso({ ...selectedAviso, codturma: item.value });
                        setIsFocus(false);
                    }}
                    renderLeftIcon={() => (
                        <AntDesign
                            style={styles.icon}
                            color={isFocus ? 'blue' : 'black'}
                            name="Safety"
                            size={20}
                        />
                    )}
                />
            </View>

            {/* Campos adicionais do aviso */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Título:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite o título"
                    value={selectedAviso?.titulo || ''}
                    onChangeText={(text) => setSelectedAviso({ ...selectedAviso, titulo: text })}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Descrição:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Digite a descrição"
                    value={selectedAviso?.descricao || ''}
                    onChangeText={(text) => setSelectedAviso({ ...selectedAviso, descricao: text })}
                />
            </View>

            {/* Campo: Data e Hora */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Data e Hora:</Text>
                <SafeAreaProvider>
                    <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                        <Text>Escolher data e hora</Text>
                    </Button>
                    <DatePickerModal
                        locale="pt"
                        mode="single"
                        visible={open}
                        onDismiss={() => setOpen(false)}
                        date={selectedAviso?.datahora ? new Date(selectedAviso.datahora) : undefined}
                        onConfirm={(params) => {
                            setSelectedAviso({
                                ...selectedAviso,
                                datahora: params.date.toISOString(),
                            });
                            setOpen(false);
                        }}
                    />
                </SafeAreaProvider>
                {selectedAviso?.datahora && (
                    <Text style={styles.selectedDate}>
                        Data e hora selecionadas: {format(new Date(selectedAviso.datahora), 'dd/MM/yyyy HH:mm')}
                    </Text>
                )}
            </View>

            {/* Campo: Foto */}
            <View style={styles.inputGroup}>
                <Text style={styles.label}>Foto:</Text>
                <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                    <Text style={styles.imagePickerText}>Escolher Foto</Text>
                </TouchableOpacity>
                {selectedAviso?.foto && <Image source={{ uri: selectedAviso.foto }} style={styles.image} />}
            </View>

            {/* Botão para salvar as alterações */}
            <TouchableOpacity onPress={saveEdit} style={styles.btnSave}>
                            <Text>Salvar</Text>
                        </TouchableOpacity>
                        
        </View>
    </ScrollView>
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
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        alignItems: 'center',
    },
    btnSave: {
        marginTop: 15,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    btnCancel: {
        marginTop: 10,
        backgroundColor: '#f44336',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    inputGroup: {
        marginBottom: 15,
        width: '100%',
    },
    dropdown: {
        marginTop: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        paddingVertical: 10,
    },
    imagePicker: {
        width: '100%',
        height: 50,
        backgroundColor: '#ccc',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    imagePickerText: {
        color: '#333',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
