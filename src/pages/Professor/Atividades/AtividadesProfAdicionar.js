import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Platform, PermissionsAndroid } from 'react-native';
import { api } from '../../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt,TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale'; // Garantir o uso do português, se necessário.

registerTranslation('pt', pt)

export default function AtividadesProfAdicionar({ closeModal,route }) {
    const [newcodturma, setNewcodturma] = useState('')
    const [dataturma, setDataturma] = useState([{label: "",value: ""}])
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [newdata, setNewdata] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [timeOpen, setTimeOpen] = useState(false)
    const [time, setTime] = useState({ hours: undefined, minutes: undefined });

    const [newdescricao, setNewdescricao] = useState('');
    const [newfoto, setNewfoto] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    

   
    // Função para formatar a hora no formato brasileiro
  const formatTime = () => {
    if (time.hours === undefined || time.minutes === undefined) {
      return 'Nenhum horário selecionado';
    }
    const horas = String(time.hours).padStart(2, '0');
    const minutos = String(time.minutes).padStart(2, '0');
    return `${horas}:${minutos}`;
  };
   
  async function fetchTurma(){
    try {
        const response = await api.get('/turma') 
        const formattedData = response.data.map(item => ({
            label: item.nome,  
            value: item.codigo.toString() 
        }));
        setDataturma(formattedData)
    } catch (error) {
        console.log(error)
    }
    }

    // Exemplo de uso do useEffect para chamar a função
    useEffect(() => {
        fetchTurma();
    }, []);

    const renderLabel = () => {
        if (value || isFocus) {
          return (
            <Text style={[styles.label, isFocus && { color: 'blue' }]}>
              Dropdown label
            </Text>
          );
        }
        return null;
      };

      let timeDate = new Date();
        if (time.hours !== undefined) {
            timeDate.setHours(time.hours);
        }
        if (time.minutes !== undefined) {
            timeDate.setMinutes(time.minutes);
        }
        console.log(timeDate); // Exibe a data/hora atualizada no console

      
      
      const onConfirmTime = useCallback(({ hours, minutes }) => {
        console.log('Horas:', hours, 'Minutos:', minutes); // Debug para garantir valores corretos
        setTimeOpen(false); // Fechar o modal
        setTime({ hours, minutes }); // Atualizar o estado com a hora e minutos selecionados
      }, []);
    
      const onDismissTime = useCallback(() => {
        setTimeOpen(false); // Fechar o modal sem selecionar nada
      }, []);
      

    const validateFields = () => {
        return newcodturma && newdata && newdata && time && newdescricao &&  newfoto;
    };
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

    const onDismissSingle = useCallback(() => {
        setOpen(false);
      }, [setOpen]);
    
      const onConfirmSingle = useCallback(
        (params) => {
          setOpen(false);
          setNewdata(params.date); // Armazenar a data selecionada
        },
        [setOpen, setNewdata]
      );
      

    const CadAluno = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
           // Formatar a data selecionada para 'yyyy-MM-dd'
            const formattedDate = format(new Date(newdata), 'yyyy-MM-dd', { locale: ptBR });

            // Garantir que a hora e minuto selecionados sejam formatados corretamente
            const formattedTime = `${String(time.hours).padStart(2, '0')}:${String(time.minutes).padStart(2, '0')}:00`;

            // Concatenar a data e hora para o formato final
            const dataHora = `${formattedDate} ${formattedTime}`;

            console.log("1",newcodturma,"2",dataHora,"3",newdescricao,"4",newfoto)
            const newItem = {
                codturma: newcodturma,
                datahora: dataHora,
                descricao: newdescricao,
                foto: base64Image,
            };
            await api.post('/atividades', newItem);
            Alert.alert('Cadastro Atividades', 'Atividades adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Atividades adicionada com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar Atividades:', error);
            console.log("1",newcodturma,"2",dataHora,"3",newdescricao,"4",newfoto)
            setFeedbackMessage('Erro ao adicionar o Atividades. Tente novamente.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                {feedbackMessage !== '' && (
                    <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                )}
                <View style={styles.inputGroup}>
                <Text style={styles.label}>Codigo da turma:</Text>
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
                            <Text style={styles.label}>Data e hora de entrega atividade:</Text>
                        <SafeAreaProvider>
                        <View style={styles.timeContainer}>
                        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined" style={styles.timeButton}>
                            <Text> Escolher Data </Text>
                            </Button>
                            <DatePickerModal
                            locale="pt"
                            mode="single"
                            visible={open}
                            onDismiss={onDismissSingle}
                            date={newdata}
                            onConfirm={onConfirmSingle}
                            />
                        </View>
                        <View>
                            <Text>
                               Data selecionada: {newdata ? format(newdata, 'dd/MM/yyyy', { locale: ptBR }) : 'Nenhuma data selecionada'}
                            </Text>
                        </View>

                        <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                            <Button onPress={() => setTimeOpen(true)} uppercase={false} mode="outlined" style={styles.timeButton}>
                            {/* mode="contained-tonal" */}
                            Escolher tempo
                            </Button>
                            <TimePickerModal
                            locale="pt"
                            visible={timeOpen}
                            onDismiss={onDismissTime}
                            onConfirm={onConfirmTime}
                            hours={time.hours}
                            minutes={time.minutes}
                            />
                        </View>
                        <View>
                        <Text style={{ fontSize: 18, marginTop: 20 }}>
                            Horário selecionado: {formatTime()}
                        </Text>
                    </View>
                        </View>

                        </SafeAreaProvider>
                        </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Descrição:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Digite uma descrição'
                        value={newdescricao}
                        onChangeText={setNewdescricao}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Foto:</Text>
                    <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
                        <Text style={styles.imagePickerText}>Escolher Foto</Text>
                    </TouchableOpacity>
                    {newfoto && <Image source={{ uri: newfoto }} style={styles.image} />}
                </View>

                <TouchableOpacity style={styles.btnLogin} onPress={CadAluno}>
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
    aaa: {
        width: 270,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
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
      timeContainer: {
        marginTop: 20, // Espaçamento entre este grupo e o próximo bloco
        marginBottom: 20, // Espaçamento entre este grupo e o próximo bloco
      },
      timeButton: {
        marginVertical: 10, // Espaçamento vertical entre os botões
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