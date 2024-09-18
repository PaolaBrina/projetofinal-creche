import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import axios from 'axios'; 
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
            const response = await axios.post('http://localhost:3000/turma', newItem);
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
