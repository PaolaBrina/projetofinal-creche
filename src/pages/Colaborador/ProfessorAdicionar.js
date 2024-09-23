import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios'; 

export default function ProfessorAdicionar({ closeModal }) {
    const [newnome, setNewnome] = useState('');
    const [newcpf, setNewcpf] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newtelefone, setNewtelefone] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validateFields = () => {
        if (!newnome || !newcpf || !newdatanascimento || !newsexo || !newemail || !newendereco || !newtelefone) {
            return false;
        }
        return true;
    };

    const CadProfessor = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                nome: newnome,
                cpf: newcpf,
                datanascimento: newdatanascimento,
                sexo: newsexo,
                email: newemail,
                endereco: newendereco,
                telefone: newtelefone,
                login: 'a',
                senha: 'a',
                status: 1,
            };
            const response = await axios.post('http://localhost:3000/professor', newItem);
            const data = response.data;

            // Fecha o modal e envia a mensagem de sucesso para a página Home
            closeModal('Professor adicionado com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar professor:', error);
            setFeedbackMessage('Erro ao adicionar o professor. Tente novamente.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {feedbackMessage !== '' && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome"
                        value={newnome}
                        onChangeText={setNewnome}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Cpf:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o cpf"
                        value={newcpf}
                        onChangeText={setNewcpf}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data de Nascimento:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite a data de nascimento"
                        value={newdatanascimento}
                        onChangeText={setNewdatanascimento}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sexo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o sexo"
                        value={newsexo}
                        onChangeText={setNewsexo}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o email"
                        value={newemail}
                        onChangeText={setNewemail}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Endereço:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o endereço"
                        value={newendereco}
                        onChangeText={setNewendereco}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o telefone"
                        value={newtelefone}
                        onChangeText={setNewtelefone}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={CadProfessor}>
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