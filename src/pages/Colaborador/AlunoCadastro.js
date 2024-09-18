import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import axios from 'axios'; 
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function AlunoCadastro({navigation}) {
    const [newcodresponsavel, setNewcodresponsavel] = useState('');
    const [newnome, setNewnome] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newfoto, setNewfoto] = useState(null); // Alterado para ser um objeto de imagem

    const handleSeta = () => {
        navigation.navigate('HomeColaborador');
    };

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setNewfoto(result.assets[0].uri); // Armazena a URI da imagem selecionada
        }
    };

    const CadProfessor = async () => {
        try {
            const newItem = {
                codresponsavel: newcodresponsavel,
                nome: newnome,
                datanascimento: newdatanascimento,
                sexo: newsexo,
                endereco: newendereco,
                foto: newfoto, 
                status: 1
            };
            const response = await axios.post('http://localhost:3000/aluno', newItem);
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
                    <TouchableOpacity style={styles.btnseta} onPress={handleSeta}>
                        <AntDesign name="caretleft" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.topBarTxt}>Cadastro Aluno</Text>
                </View>
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Codigo Responsavel:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o codigo'
                            value={newcodresponsavel}
                            onChangeText={setNewcodresponsavel}
                        />
                    </View>
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
                        <Text style={styles.label}>Endereco:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder='Digite o endereco'
                            value={newendereco}
                            onChangeText={setNewendereco}
                        />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Foto:</Text>
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Text style={styles.imagePickerText}>Escolher Foto</Text>
                        </TouchableOpacity>
                        {newfoto && <Image source={{ uri: newfoto }} style={styles.image} />}
                    </View>
                    <TouchableOpacity style={styles.btnLogin} onPress={CadProfessor}>
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
