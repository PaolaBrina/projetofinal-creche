import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '../../api/api';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function ProfTurmaCadastro({ closeModal }) {
    const [newcodturma, setNewcodturma] = useState('');
    const [newcodprofessor, setNewcodprofessor] = useState('');
    const [newcodauxiliar, setNewcodauxiliar] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dataturma, setDataturma] = useState([{label: "",value: ""}])
    const [dataprofessor, setDataprofessor] = useState([{label: "",value: ""}])
    const [datauxiliar, setDatauxiliar] = useState([{label: "",value: ""}])

    async function fetchTurma(){
        try {
            const response = await api.get('/turma')
            console.log(response)
            const formattedData = response.data.map(item => ({
                label: item.nome,  
                value: item.codigo.toString() 
            }));
            setDataturma(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchProfessor(){
        try {
            const response = await api.get('/professor')
            console.log("Professor: ", response.dataprofessor)
            const formattedData = response.data.professor.map(item => ({
                label: item.nome,  
                value: item.codigo.toString() 
            }));
            setDataprofessor(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchAuxiliar(){
        try {
            const response = await api.get('/auxiliar')
            console.log("Auxiliar: ", response.datauxiliar)
            const formattedData = response.data.auxiliar.map(item => ({
                label: item.nome,  

                value: item.codigo.toString() 
            }));
            setDatauxiliar(formattedData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchTurma()
        fetchProfessor()
        fetchAuxiliar()
    },[])

    const validateFields = () => {
        if (!newcodturma || !newcodprofessor || !newcodauxiliar) {
            return false;
        }
        return true;
    };

    const CadProfTurma = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                codturma: newcodturma,
                codprofessor: newcodprofessor,
                codauxiliar: newcodauxiliar,
            };
            const response = await api.post('/professorturma', newItem);
            //const data = response.data;

            Alert.alert('Cadastro ProfTurma', 'ProfTurma adicionada com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('ProfTurma adicionada com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar profturma:', error);
            setFeedbackMessage('Erro ao adicionar o profturma. Tente novamente.');
        }
    };

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
    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {feedbackMessage !== '' && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
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
                    <Text style={styles.label}>codigo professor:</Text>
                    <View style={styles.container}>
                    {renderLabel()}
                    <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={dataprofessor}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione item' : '...'}
                    searchPlaceholder="Procurar..."
                    value={newcodprofessor}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setNewcodprofessor(item.value);
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
                    <Text style={styles.label}>Digite o codigo auxiliar:</Text>
                    <View style={styles.container}>
                    {renderLabel()}
                    <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={datauxiliar}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Selecione item' : '...'}
                    searchPlaceholder="Procurar..."
                    value={newcodauxiliar}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setNewcodauxiliar(item.value);
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
                <TouchableOpacity style={styles.btnLogin} onPress={CadProfTurma}>
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
});
