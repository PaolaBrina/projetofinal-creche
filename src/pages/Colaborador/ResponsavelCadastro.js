import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ResponsavelCadastro({navigation}) {
    
    const [newnome, setNewnome] =  useState('');
    const [newcpf, setNewcpf] =  useState('');
    const [newdatanascimento, setNewdatanascimento] =  useState('');
    const [newsexo, setNewsexo] =  useState('');
    const [newemail, setNewemail] =  useState('');
    const [newendereco, setNewendereco] =  useState('');
    const [newtelefone, setNewtelefone] =  useState('');
    const [newnomeautorizado1, setNewnomenewnomeautorizado1] =  useState('');
    const [newtelefoneautorizado1, setNewtelefoneautorizado1] =  useState('');
    const [newnomeautorizado2, setNewnomenewnomeautorizado2] =  useState('');
    const [newtelefoneautorizado2, setNewtelefoneautorizado2] =  useState('');

    const handleSeta = () => {
        navigation.navigate('HomeColaborador');
    }

    const CadProfessor = async () => {
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
                nomeautorizado1: newnomeautorizado1,
                telefoneautorizado1: newtelefoneautorizado1,
                nomeautorizado2: newnomeautorizado2,
                telefoneautorizado2: newtelefoneautorizado2,
                status: 1,
            };
            const response = await api.post('/responsavel', newItem);
            const data = response.data; 
            console.log(data); 
        } catch (error) {
            console.error('Error fetching data:', error);
        } 
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.topBar}>
                        <TouchableOpacity style={styles.btnseta} onPress={handleSeta}>
                            <AntDesign name="caretleft" size={30} color="white"/>
                        </TouchableOpacity>
                        <Text style={styles.topBarTxt}>Cadastro Responsavel</Text>
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
                            <Text style={styles.label}>Cpf:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o cpf'
                                value={newcpf}
                                onChangeText={setNewcpf}
                                keyboardType='numeric' 
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Data de Nascimento:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite a data nascimento'
                                value={newdatanascimento}
                                onChangeText={setNewdatanascimento}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Sexo:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o sexo'
                                value={newsexo}
                                onChangeText={setNewsexo}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o email'
                                value={newemail}
                                onChangeText={setNewemail}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Endereco:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o endereco'
                                value={newendereco}
                                onChangeText={setNewendereco}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Telefone:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o telefone'
                                value={newtelefone}
                                onChangeText={setNewtelefone}
                                keyboardType='numeric' 
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome do Autorizado1:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite a nome'
                                value={newnomeautorizado1}
                                onChangeText={setNewnomenewnomeautorizado1}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome do Telefone Autorizado1:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite a nome'
                                value={newtelefoneautorizado1}
                                onChangeText={setNewtelefoneautorizado1}
                                keyboardType='numeric' 
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome do Autorizado2:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite a nome'
                                value={newnomeautorizado2}
                                onChangeText={setNewnomenewnomeautorizado2}
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nome do Telefone Autorizado2:</Text>
                            <TextInput
                                style={styles.input}
                                placeholder='Digite o telefone'
                                value={newtelefoneautorizado2}
                                onChangeText={setNewtelefoneautorizado2}
                                keyboardType='numeric' 
                            />
                        </View>
                        <TouchableOpacity style={styles.btnLogin} onPress={CadProfessor}>
                            <Text style={styles.btnTxt}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontWeight: 'bold'
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
