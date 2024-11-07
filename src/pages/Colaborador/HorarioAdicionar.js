import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert, Image } from 'react-native';
import { api } from '../../api/api';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function HorarioAdicionar({ closeModal }) {
    const [newcodturma, setNewcodturma] = useState('');
    const [foto, setNewfoto] = useState(null); // Agora armazenando a foto como um objeto
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [dataturma, setDataturma] = useState([{ label: "", value: "" }]);
    const [isFocus, setIsFocus] = useState(false);

    // Função para validar campos
    const validateFields = () => {
        if (!newcodturma || !foto) {
            return false;
        }
        return true;
    };

    // Função para buscar as turmas
    async function fetchTurma() {
        try {
            const response = await api.get('/turma');
            const formattedData = response.data.map(item => ({
                label: item.nome,
                value: item.codigo.toString(),
            }));
            setDataturma(formattedData);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchTurma();
    }, []);

    // Função para enviar o novo horário e turma
    const CadTurma = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('codturma', newcodturma);
            formData.append('status', 1);

            // Verificando se a foto foi selecionada
            if (foto) {
                const photo = {
                    uri: foto.uri,
                    type: foto.type,
                    name: foto.fileName || 'photo.jpg',
                };
                formData.append('foto', photo);
            }

            // Enviando os dados para o backend
            const response = await api.post('/horario', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            Alert.alert('Cadastro Turma', 'Turma adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => closeModal('Turma adicionada com sucesso!') },
            ]);
        } catch (error) {
            console.error('Erro ao adicionar turma:', error);
            setFeedbackMessage('Erro ao adicionar a turma. Tente novamente.');
        }
    };

    // Função para permitir a escolha de imagem
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
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
            setNewfoto(result.assets[0]); // Armazenando a foto selecionada no estado
        }
    };

    // Função para renderizar o label do dropdown
    const renderLabel = () => {
        if (isFocus || newcodturma) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Seleção da turma
                </Text>
            );
        }
        return null;
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {feedbackMessage !== '' && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
                    <Text style={styles.label}>Nome da turma:</Text>
                    <View style={styles.container}>
                        {renderLabel()}
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={dataturma}
                            search
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Selecione item' : '...'}
                            searchPlaceholder="Procurar..."
                            value={newcodturma}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                setNewcodturma(item.value);
                                setIsFocus(false);
                            }}
                            renderLeftIcon={() => (
                                <AntDesign
                                    style={styles.icon}
                                    color={isFocus ? 'blue' : 'black'}
                                    name="Safety"
                                    size={20}
                                />
                            )}
                        />
                    </View>
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Foto da sala:</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                        <Text style={styles.imagePickerText}>Escolher Foto</Text>
                    </TouchableOpacity>
                    {foto && <Image source={{ uri: foto.uri }} style={styles.image} />}
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
    imagePickerButton: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    imagePickerText: {
        color: '#333',
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 10,
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
});
