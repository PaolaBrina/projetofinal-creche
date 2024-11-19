import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Platform, PermissionsAndroid  } from 'react-native';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';

export default function CalendarioAdicionar({ closeModal }) {
    const [newfoto, setNewfoto] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    

    useEffect(() => {
        requestPermissions();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const cameraPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Permissão de Câmera",
                    message: "Este aplicativo precisa de acesso à câmera para selecionar fotos.",
                    buttonNeutral: "Perguntar Depois",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK"
                }
            );

            const storagePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: "Permissão de Armazenamento",
                    message: "Este aplicativo precisa de acesso à galeria para selecionar fotos.",
                    buttonNeutral: "Perguntar Depois",
                    buttonNegative: "Cancelar",
                    buttonPositive: "OK"
                }
            );

            if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED || storagePermission !== PermissionsAndroid.RESULTS.GRANTED) {
                alert("As permissões para câmera e armazenamento são necessárias.");
            }
        } else {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                alert('Permissão para acessar a câmera é necessária!');
            }
        }
    };

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true, // Adiciona a opção de base64
        });

        if (!result.canceled) {
            setNewfoto(result.assets[0].uri); // URI da imagem para visualização
            setBase64Image(result.assets[0].base64); // Salva a imagem em base64
        }
    };

    const validateFields = () => {
        return base64Image;
    };



    const CadCalendario = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                foto: base64Image, // Envia a imagem em base64 para o backend
            };
            await api.post('/calendario', newItem);

            Alert.alert('Cadastro Calendario', 'Calendario adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Calendario adicionada com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar Calendario:', error);
            setFeedbackMessage('Erro ao adicionar o Calendario. Tente novamente.');
        }
    };
   


    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Foto:</Text>
                        <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                            <Text style={styles.imagePickerText}>Escolher Foto</Text>
                        </TouchableOpacity>
                        {newfoto && <Image source={{ uri: newfoto }} style={styles.image} />}
                    </View>

                <TouchableOpacity style={styles.btnLogin} onPress={CadCalendario}>
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
    container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 5,
      },
      imagePicker: {
        width: '100%',
        height: 50,
        backgroundColor: '#ccc', // Cor cinza
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    imagePickerText: {
        color: '#333', // Cor do texto
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 10,
    },
});
