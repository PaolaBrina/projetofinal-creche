import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import TurmaAdicionar from './TurmaAdicionar';


import AntDesign from '@expo/vector-icons/AntDesign';

export default function ProfessorCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const fetchTurmas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/turma'); 
            console.log('Resposta completa:', response); 
            if (Array.isArray(response.data)) {
                setTurmas(response.data.turma); 
            } else if (response.data && response.data.turma) {
                setTurmas(response.data.turma); 
            } else {
                console.error('Formato inesperado dos dados:', response.data);
                Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
            }
        } catch (error) {
            console.error('Erro ao buscar turma:', error);
            Alert.alert('Erro', 'Erro ao buscar turmas, veja o console para mais detalhes.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Turma</Text>
                    </View>

            <View style={viewbutton}>
                <TouchableOpacity style={styles.button} onPress={fetchTurmas}>
                    <Text style={styles.buttonText}>Buscar Turmas</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={openModal}>
                    <Text style={styles.buttonText}>Adicionar Turma</Text>
                </TouchableOpacity>
            </View>

            {loading ? (
                <Text>Carregando...</Text>
            ) : (
                turmas.length > 0 ? (
                    <FlatList
                        data={turmas}
                        keyExtractor={(item) => item.codigo.toString()} 
                        renderItem={({ item }) => (
                            <View style={styles.turmaItem}>
                                <Text style={styles.turmaText}>Nome: {item.nome}</Text>
                                <Text style={styles.turmaText}>Sala: {item.sala}</Text>
                                <Text style={styles.turmaText}>Status: {item.status}</Text>
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
                        <TurmaAdicionar closeModal={closeModal} />
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
    viewbutton: {
        justifyContent: 'space-around'
    },
    button: {
        backgroundColor: '#FFEF95',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        width: 160
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    turmaItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: '100%',
    },
    turmaText: {
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



/* import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TurmaCadastro({navigation}) {
    const [newnome, setNewnome] = useState('');
    const [newsala, setNewsala] = useState('');

    const CadTurma = async () => {
        try {
            const newItem = {
                nome: newnome,
                sala: newsala,
            };
            const response = await api.post('/turma', newItem);
            const data = response.data; 
            console.log(data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                        <AntDesign name="caretleft" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.topBarTxt}>Cadastro Turma</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nome:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o nome'
                            value={newnome}
                            onChangeText={setNewnome}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Sala:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite a sala'
                            value={newsala}
                            onChangeText={setNewsala}
                        />
                    </View>
                    
                    <TouchableOpacity style={styles.btnLogin} onPress={CadTurma}>
                        <Text style={styles.btnTxt}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
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
        fontWeight: 'bold',
    },
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    form: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    inputGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        backgroundColor: '#fafafa',
    },
    imagePicker: {
        padding: 10,
        backgroundColor: '#FFEF95',
        borderRadius: 5,
        alignItems: 'center',
    },
    imagePickerText: {
        color: '#333',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    btnLogin: {
        backgroundColor: "#FFEF95",
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnTxt: {
        color: "#000",
        fontSize: 16,
        fontWeight: 'bold',
    },
});
 */