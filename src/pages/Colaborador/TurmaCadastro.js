import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView,TextInput } from 'react-native';
import TurmaAdicionar from './TurmaAdicionar';
import AlunoTurmaAdicionar from './AlunoTurmaAdicionar';
import ProfTurmaCadastro from './ProfTurmaCadastro';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function TurmaCadastro({ navigation, route }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]); // Dados retornados do banco
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState('turma'); // Aba selecionada
    const { codigo } = route.params || {};

    const closeModal = () => {
        setModalVisible(false);
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const fetchData = async (endpoint) => {
        setLoading(true);
        try {
            const response = await api.get(endpoint);
            console.log('Dados recebidos:', response.data);
    
            let fetchedData = [];
            if (Array.isArray(response.data)) {
                fetchedData = response.data; // Caso de 'turma'
            } else if (response.data) {
                // Caso de 'professorturma' ou 'alunoturma'
                const key = Object.keys(response.data)[0]; // Pega a primeira chave do objeto
                fetchedData = response.data[key];
            }
    
            setData(fetchedData);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            Alert.alert('Erro', 'Erro ao buscar dados.');
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'turma') {
            fetchData('/turma');
        } else if (tab === 'profTurma') {
            fetchData('/professorturma');
        } else if (tab === 'alunoTurma') {
            fetchData('/alunoturma');
        }
        console.log('Estado de dados atualizado:', data); // Veja o estado após a chamada
    };
    

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* Top Bar */}
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador', { codigo })}>
                    <AntDesign name="caretleft" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.topBarTxt}>Cadastro Turma</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'turma' && styles.activeTab]}
                    onPress={() => handleTabChange('turma')}
                >
                    <Text style={[styles.tabText, selectedTab === 'turma' && styles.activeTabText]}>Turma</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'profTurma' && styles.activeTab]}
                    onPress={() => handleTabChange('profTurma')}
                >
                    <Text style={[styles.tabText, selectedTab === 'profTurma' && styles.activeTabText]}>Professor Turma</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'alunoTurma' && styles.activeTab]}
                    onPress={() => handleTabChange('alunoTurma')}
                >
                    <Text style={[styles.tabText, selectedTab === 'alunoTurma' && styles.activeTabText]}>Aluno Turma</Text>
                </TouchableOpacity>
            </View>

             {/* Search Bar and Add Button */}
             <View style={styles.searchAndButton}>
                <TextInput style={styles.searchBox} placeholder="Pesquisar" />
                 {/* Botão para adicionar (modal) */}
                <TouchableOpacity style={styles.addButton} onPress={openModal}>
                    <Text style={styles.addButtonText}>
                        {selectedTab === 'turma'
                            ? 'Adicionar Turma'
                            : selectedTab === 'profTurma'
                            ? 'Adicionar Professor Turma'
                            : 'Adicionar Aluno Turma'}
                    </Text>
                </TouchableOpacity>
            </View>
           

            {/* Lista de Dados */}
            <View style={styles.contentContainer}>
                {loading ? (
                    <Text>Carregando...</Text>
                ) : data && data.length > 0 ? (
                    <FlatList
                        data={data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.item}>
                                {selectedTab === 'turma' && (
                                    <>
                                        <Text style={styles.itemText}>Codigo: {item.codigo}</Text>
                                        <Text style={styles.itemText}>Nome: {item.nome}</Text>
                                        <Text style={styles.itemText}>Sala: {item.sala}</Text>
                                       
                                    </>
                                )}
                                {selectedTab === 'profTurma' && (
                                    <>
                                        <Text style={styles.itemText}>Codigo: {item.codigo}</Text>
                                        <Text style={styles.itemText}>Codigo Turma: {item.codturma}</Text>
                                        <Text style={styles.itemText}>Codigo Professor: {item.codprofessor}</Text>
                                        <Text style={styles.itemText}>Codigo Auxiliar: {item.codauxiliar}</Text>
                                        <Text style={styles.itemText}>Periodo: {item.periodo}</Text>
                                    </>
                                )}
                                {selectedTab === 'alunoTurma' && (
                                    <>
                                        <Text style={styles.itemText}>Codigo: {item.codigo}</Text>
                                        <Text style={styles.itemText}>Codigo Aluno: {item.codaluno}</Text>
                                        <Text style={styles.itemText}>Codigo Turma: {item.codturma}</Text>
                                    </>
                                )}
                            </View>
                        )}
                    />
                ) : (
                    <Text style={styles.noDataText}>Nenhum dado encontrado.</Text>
                )}
            </View>

            

            {/* Modal */}
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
                        {selectedTab === 'turma' && <TurmaAdicionar closeModal={closeModal} />}
                        {selectedTab === 'profTurma' && <ProfTurmaCadastro closeModal={closeModal} />}
                        {selectedTab === 'alunoTurma' && <AlunoTurmaAdicionar closeModal={closeModal} />}
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    tabsContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '100%',
        height: 50,
        backgroundColor: '#ffffff',
        elevation: 4, // Sombra para destacar
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderBottomWidth: 3,
        borderBottomColor: 'transparent', // Transição suave entre Tabs
    },
    activeTab: {
        backgroundColor: '#ffffff', // Fundo branco para a aba ativa
        borderBottomColor: '#3b5998', // Destaque com uma linha
    },
    tabText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#3b5998',
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    item: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 5,
    },
    itemText: {
        fontSize: 16,
    },
    noDataText: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    addButton: {
        backgroundColor: '#FFEF95',
        padding: 15,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#000',
        fontWeight: 'bold',
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
    searchAndButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    searchBox: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#ccc',
    },
});



/* import React, { useState } from 'react';
import { api } from '../../api/api';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Alert, KeyboardAvoidingView, ScrollView ,viewbutton } from 'react-native';
import TurmaAdicionar from './TurmaAdicionar';
import ProfTurmaCadastro from './ProfTurmaCadastro';
import AlunoTurmaCadastro from './AlunoTurmaAdicionar';

import AntDesign from '@expo/vector-icons/AntDesign';

export default function TurmaCadastro({navigation,route}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [turmas, setTurmas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalContent, setModalContent] = useState(null); // 'turma' ou 'profTurma'

    const { codigo } = route.params || {};


    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    const openTurmaModal = () => {
        setModalContent('turma');
        setModalVisible(true);
    };
    
    const openProfTurmaModal = () => {
        setModalContent('profTurma');
        setModalVisible(true);
    };

    const openAlunoTurmaModal = () => {
        setModalContent('alunoTurma');
        setModalVisible(true);
    };
    

    const fetchTurmas = async () => {
        setLoading(true);
        try {
            const response = await api.get('/turma');
            console.log('Resposta completa:', response);
    
            // Garantindo que o dado retornado é um array, mesmo que vazio
            const turmasData = Array.isArray(response.data) 
                ? response.data 
                : response.data?.turma || [];
    
            setTurmas(turmasData); // Define turmas no estado
        } catch (error) {
            console.error('Erro ao buscar turmas:', error);
            Alert.alert('Erro', 'Erro ao buscar turmas. Verifique o console para mais detalhes.');
        } finally {
            setLoading(false); // Encerrar o loading
        }
    };
    

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador', { codigo })}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Turma</Text>
                    </View>

                    <View style={styles.viewbutton}>
                    <TouchableOpacity style={styles.button} onPress={fetchTurmas}>
                        <Text style={styles.buttonText}>Buscar Turmas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={openTurmaModal}>
                        <Text style={styles.buttonText}>Adicionar Turma</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button} onPress={openProfTurmaModal}>
                        <Text style={styles.buttonText}>Adicionar Professor Turma</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={openAlunoTurmaModal}>
                        <Text style={styles.buttonText}>Adicionar Aluno Turma</Text>
                    </TouchableOpacity>
                </View>


                {loading ? (
                    <Text>Carregando...</Text>
                ) : (
                    turmas && turmas.length > 0 ? (
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
                        <Text>Nenhuma turma encontrada.</Text>
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
                        {modalContent === 'turma' && <TurmaAdicionar closeModal={closeModal} />}
                        {modalContent === 'profTurma' && <ProfTurmaCadastro closeModal={closeModal} />}
                        {modalContent === 'alunoTurma' && <AlunoTurmaCadastro closeModal={closeModal} />}
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
    btnseta: {
        width: 30,
        height: 30,
        justifyContent: 'center',
    },
    viewbutton: {
        justifyContent: 'space-around',
        marginTop: 20,
        paddingHorizontal: 20,
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
}); */



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