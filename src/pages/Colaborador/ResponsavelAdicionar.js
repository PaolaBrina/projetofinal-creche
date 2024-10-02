import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '../../api/api';

export default function ResponsavelAdicionar({ closeModal }) {
    const [newnome, setNewnome] = useState('');
    const [newcpf, setNewcpf] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newtelefone, setNewtelefone] = useState('');
    const [newnomeautorizado1, setNewnomeautorizado1] = useState('');
    const [newtelefoneautorizado1, setNewtelefoneautorizado1] = useState('');
    const [newnomeautorizado2, setNewnomeautorizado2] = useState('');
    const [newtelefoneautorizado2, setNewtelefoneautorizado2] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validateFields = () => {
        if (!newnome || !newcpf || !newdatanascimento || !newsexo || !newemail || !newendereco || !newtelefone || !newnomeautorizado1 || !newtelefoneautorizado1 || !newnomeautorizado2 || !newtelefoneautorizado2) {
            return false;
        }
        return true;
    };

    const CadResponsavel = async () => {
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
                nomemeautorizado1: newnomeautorizado1,
                telefoneautorizado1: newtelefoneautorizado1,
                nomemeautorizado2: newnomeautorizado1,
                telefoneautorizado2: newtelefoneautorizado2,
                status: 1,
            };
            const response = await api.post('/responsavel', newItem);
            const data = response.data;

            Alert.alert('Cadastro Responsavel', 'Responsavel adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Responsavel adicionada com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar responsavel:', error);
            setFeedbackMessage('Erro ao adicionar o responsavel. Tente novamente.');
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
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Autorizado 1:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do autorizado 1"
                        value={newnomeautorizado1}
                        onChangeText={setNewnomeautorizado1}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone Autorizado 1:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o telefone do autorizado 1"
                        value={newtelefoneautorizado1}
                        onChangeText={setNewtelefoneautorizado1}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Nome Autorizado 2:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome do autorizado 2"
                        value={newnomeautorizado2}
                        onChangeText={setNewnomeautorizado2}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone Autorizado 2:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o telefone do autorizado 2"
                        value={newtelefoneautorizado2}
                        onChangeText={setNewtelefoneautorizado2}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={CadResponsavel}>
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
