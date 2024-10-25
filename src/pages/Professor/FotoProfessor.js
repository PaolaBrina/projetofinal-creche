import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt,TimePickerModal } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';

registerTranslation('pt', pt)

export default function FotoProfessor({ closeModal }) {
    const [newcodturma, setNewcodturma] = useState([{label: "",value: ""}])
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [newdata, setNewdata] = useState(undefined);
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = React.useState(false)
    const [selectedTime, setSelectedTime] = useState({ hours: undefined, minutes: undefined });

    const [newdescricao, setNewdescricao] = useState('');
    const [newfoto, setNewfoto] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
   

    async function fetchTurma(){
        try {
            const response = await api.get('/turma')
            console.log(response)
            const formattedData = response.data.map(item => ({
                label: item.nome,  
                value: item.codigo.toString() 
            }));
            setNewcodturma(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTurma()
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

    const onDismiss = React.useCallback(() => {
        setVisible(false)
      }, [setVisible])
    
      const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
          setVisible(false);
          console.log({ hours, minutes });
        },
        [setVisible]
      );

    const validateFields = () => {
        return newcodturma && newdata && selectedTime && newdescricao &&  newfoto;
    };

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
            setNewfoto(result.assets[0].uri);
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
            const formattedDate = format(new Date(newdata), 'yyyy-MM-dd');
            const dataHora = `${formattedDate} ${String(selectedTime.hours).padStart(2, '0')}:${String(selectedTime.minutes).padStart(2, '0')}:00`;

            const newItem = {
                codturma: newcodturma,
                datahora: dataHora,
                descricao: newdescricao,
                foto: newfoto,
                status: 1
            };
            await api.post('/fotos', newItem);
            Alert.alert('Cadastro Fotos', 'Fotos adicionado com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: () => closeModal('Fotos adicionado com sucesso!')
                },
            ]);
        } catch (error) {
            console.error('Erro ao adicionar Fotos:', error);
            setFeedbackMessage('Erro ao adicionar o Fotos. Tente novamente.');
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
                    data={newcodturma}
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
                        <Text style={styles.label}>Data Hora:</Text>
                    <SafeAreaProvider>
                    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                        <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
                        <Text> Escolher data</Text>
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

                    <View style={{justifyContent: 'center', flex: 1, alignItems: 'center'}}>
                        <Button onPress={() => setVisible(true)} uppercase={false} mode="outlined">
                        Escolher tempo
                        </Button>
                        <TimePickerModal
                        visible={visible}
                        onDismiss={onDismiss}
                        onConfirm={onConfirm}
                        hours={12}
                        minutes={14}
                        />
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
});