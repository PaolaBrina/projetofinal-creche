import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Platform, PermissionsAndroid } from 'react-native';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

registerTranslation('pt', pt);

const RadioButton = ({ selectedOption, setSelectedOption }) => {
  const options = [
    { label: 'Feminino', value: 'feminino' },
    { label: 'Masculino', value: 'masculino' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <View>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => setSelectedOption(option.value)}
          style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}
        >
          <View
            style={{
              height: 20,
              width: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
          >
            {selectedOption === option.value && (
              <View
                style={{
                  height: 10,
                  width: 10,
                  borderRadius: 5,
                  backgroundColor: '#000',
                }}
              />
            )}
          </View>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default function AlunoAdicionar({ closeModal }) {
    const [newcodresponsavel, setNewcodresponsavel] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dataresponsavel, setDataresponsavel] = useState([{label: "",value: ""}])

    const [newnome, setNewnome] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [newsexo, setNewsexo] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newfoto, setNewfoto] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');

    const validateFields = () => {
        return newcodresponsavel && newnome && newdatanascimento && newsexo && newendereco && base64Image;
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
            setNewdatanascimento(params.date);
        },
        [setOpen, setNewdatanascimento]
    );

    async function fetchResponsavel(){
        try {
            const response = await api.get('/responsavel')
            console.log("Responsavel: ", response.dataresponsavel)
            const formattedData = response.data.responsavel.map(item => ({
                label: item.nome,  
                value: item.codigo.toString() 
            }));
            setDataresponsavel(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchResponsavel()
    },[])

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

    const CadAluno = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const formattedDate = format(new Date(newdatanascimento), 'yyyy-MM-dd');
            console.log("1",newcodresponsavel,"2",newnome,"3",formattedDate,"4",newsexo,"5",newendereco,"6",base64Image)

            const newItem = {
                codresponsavel: newcodresponsavel,
                nome: newnome,
                datanascimento: formattedDate,
                sexo: newsexo,
                endereco: newendereco,
                foto: base64Image, // Envia a imagem em base64 para o backend
                status: 1
            };
            await api.post('/aluno', newItem);
            Alert.alert('Cadastro Aluno', 'Aluno adicionado com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => closeModal('Aluno adicionado com sucesso!')
                },
            ]);
        } catch (error) {
            console.log("1",newcodresponsavel,"2",newnome,"3",formattedDate,"4",newsexo,"5",newendereco,"6",base64Image)
            console.error('Erro ao adicionar aluno:', error);
            setFeedbackMessage('Erro ao adicionar o aluno. Tente novamente.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                {feedbackMessage !== '' && (
                    <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                )}
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Codigo Responsavel:</Text>
                    <View style={styles.container}>
                    {renderLabel()}
                    <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataresponsavel}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione item' : '...'}
                    searchPlaceholder="Procurar..."
                    value={newcodresponsavel}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setNewcodresponsavel(item.value);
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
                <SafeAreaProvider>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                        <Text> Escolher data de nascimento </Text>
                    </Button>
                    <DatePickerModal
                        locale="pt"
                        mode="single"
                        visible={open}
                        onDismiss={onDismissSingle}
                        date={newdatanascimento}
                        onConfirm={onConfirmSingle}
                    />
                    </View>
                    {newdatanascimento && (
                    <Text style={styles.selectedDate}>
                        Data selecionada: {format(new Date(newdatanascimento), 'dd/MM/yyyy')}
                    </Text>
                    )}
                </SafeAreaProvider>
                </View>


                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sexo:</Text>
                    <RadioButton selectedOption={newsexo} setSelectedOption={setNewsexo} />
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
});