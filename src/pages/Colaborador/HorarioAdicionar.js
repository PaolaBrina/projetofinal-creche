import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '../../api/api';

export default function HorarioAdicionar({ closeModal }) {
    const [newcodturma, setNewcodturma] = useState('');
    const [foto, setNewfoto] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validateFields = () => {
        if (!newcodturma || !foto) {
            return false;
        }
        return true;
    };

    const CadTurma = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                nome: newcodturma,
                sala: foto,
                status: 1,
            };
            const response = await api.post('/horario', newItem);
            const data = response.data;

            Alert.alert('Cadastro Turma', 'Turma adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Turma adicionada com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar turma:', error);
            setFeedbackMessage('Erro ao adicionar o turma. Tente novamente.');
        }
    };


    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {feedbackMessage !== '' && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
                    <Text style={styles.label}>Nome da turma:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o codigo da turma"
                        value={newcodturma}
                        onChangeText={setNewcodturma}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sala:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Adicione foto"
                        value={foto}
                        onChangeText={setNewfoto}
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={CadTurma}>
                    <Text style={styles.btnTxt}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
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
    btnLogin: {
        backgroundColor: '#FFEF95',
        width: '100%',
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    btnTxt: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
    feedbackText: {
        textAlign: 'center',
        marginBottom: 15,
        color: 'red',
        fontSize: 16,
    },
});
