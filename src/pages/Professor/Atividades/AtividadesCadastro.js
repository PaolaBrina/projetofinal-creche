import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
/* import telas modal */
import AtividadesProfAdicionar from './AtividadesProfAdicionar';
import AtividadesProfBuscar from './AtividadesBuscar';

export default function AtividadesCadastro({navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null); 

    const closeModal = () => {
        setModalVisible(false);
        setModalContent(null);
    };

    const openAtividadesProfAdicionarModal = () => {
        setModalContent('AtividadesProfAdicionar');
        setModalVisible(true);
    };
    
    const openAtividadesProfBuscarModal = () => {
        setModalContent('AtividadesProfBuscar');
        setModalVisible(true);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor')}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Atividades</Text>
                    </View>

            
            <View style={styles.viewbutton}>
            <TouchableOpacity style={styles.button} onPress={openAtividadesProfBuscarModal}>
                <Text style={styles.buttonText}>Buscar Atividades</Text>
           </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={openAtividadesProfAdicionarModal}>
                <Text style={styles.buttonText}>Adicionar Atividades</Text>
            </TouchableOpacity>
            </View>

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
                        {modalContent === 'AtividadesProfBuscar' && <AtividadesProfBuscar closeModal={closeModal} />}
                        {modalContent === 'AtividadesProfAdicionar' && <AtividadesProfAdicionar closeModal={closeModal} />}
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
