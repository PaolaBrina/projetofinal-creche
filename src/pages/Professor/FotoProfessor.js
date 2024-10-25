import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../api/api';
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function FotoProfessor({ closeModal }) {
    const [newcodturma, setNewcodturma] = useState([{label: "",value: ""}])
    const [newdatahora, setNewdatahora] = useState(null);
    const [newdescricao, setNewdescricao] = useState('');
    const [newfoto, setNewfoto] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [show, setShow] = useState(false);


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

    useEffect(() => {
        fetchTurma()
    },[])


    const validateFields = () => {
        return newcodturma && newdatahora && newdescricao &&  newfoto;
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

    const handleDateChange = (event, selectedDate) => {
        if (event.type === 'set') {
            const currentDate = selectedDate || Date
            console.log(currentDate);
            setNewdatahora(currentDate);
        }
        setNewdatahora(false)
    };

    const showDatePicker = () => {
        setShow(true);
    };

    const CadAluno = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                codturma: newcodturma,
                datahora: newdatahora.toLocaleDateString('pt-BR'),
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
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Digite o nome'
                        value={newnome}
                        onChangeText={setNewnome}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Data e hora:</Text>
                    <TouchableOpacity onPress={showDatePicker} style={styles.aaa}>
                        <Text style={styles.btnTxt}>Abrir data hora</Text>
                    </TouchableOpacity>
                    {
                        show && (
                        <DateTimePicker
                            mode={'date'}
                            value={newdatahora || new Date()}
                            onChange={handleDateChange}
                        />
                    )}
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

/* 

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function AlunoCadastro({navigation}) {
    const [newcodresponsavel, setNewcodresponsavel] = useState('');
    const [newnome, setNewnome] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newfoto, setNewfoto] = useState(''); // Alterado para ser um objeto de imagem

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

    const CadAluno = async () => {
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
            const response = await api.post('/aluno', newItem);
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
                    <TouchableOpacity style={styles.btnLogin} onPress={CadAluno}>
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

*/


/* import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert,Platform  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { api } from '../../api/api';
import SelectDropdown from 'react-native-select-dropdown';


import * as ImagePicker from 'expo-image-picker';

export default function AlunoAdicionar({ closeModal }) {
    const [newcodresponsavel, setNewcodresponsavel] = useState('');
    const [newnome, setNewnome] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newfoto, setNewfoto] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [responsavelSelecionado, setResponsavelSelecionado] = useState(null); // Responsável selecionado
    const [responsaveis, setResponsaveis] = useState([]); // Lista de responsáveis 



    
    useEffect(() => {
        const fetchResponsaveis = async () => {
          try {
            const response = await api.get('/responsavel');
            console.log('Responsáveis fetched:', response.data);
      
            // Acesse o array de responsáveis na propriedade 'responsavel'
            if (response.data && Array.isArray(response.data.responsavel)) {
              setResponsaveis(response.data.responsavel); // Define o estado com os responsáveis
            } else {
              // Se o formato não for o esperado
              console.error('Formato inesperado da resposta:', response.data);
              setFeedbackMessage('Formato inesperado da resposta da API.');
            }
          } catch (err) {
            console.error('Erro ao buscar responsáveis:', err);
            setFeedbackMessage('Não foi possível carregar a lista de responsáveis.');
          }
        };
      
        fetchResponsaveis();
      }, []);
    
      const handleSelectResponsavel = (responsavelSelecionado, index) => {
        const selecionado = responsaveis[index]; // Aqui, certifique-se de que o índice é o correto
        setResponsavelSelecionado(selecionado);
        setNewcodresponsavel(selecionado.codigo); // Ajuste conforme a estrutura dos dados
    };



    const validateFields = () => {
        if (!newcodresponsavel || !responsavelSelecionado || !newnome || !newdatanascimento || !newsexo || !newendereco || !newfoto) {
            return false;
        }
        return true;
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
            setNewfoto(result.assets[0].uri);
        }
    };


    const onChange = (event, selectedDate) => {
        if (Platform.OS === 'android') {
            setShow(false); // Para Android, esconder o picker após a seleção
        }

        if (selectedDate) {
            setDate(selectedDate);
            setNewdatanascimento(selectedDate.toLocaleDateString('pt-BR'));
        }
    };

    const showDatePicker = () => {
        setShow(true);
    };
    
    const CadAluno = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }
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
            const response = await api.post('/aluno', newItem);
            const data = response.data;

            Alert.alert('Cadastro Aluno', 'Aluno adicionado com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Aluno adicionado com sucesso!')
            },
                ]);
                 // Limpar os campos após o cadastro bem-sucedido
            setResponsavelSelecionado(null);
            setNewcodresponsavel('');
            setNewnome('');
            setNewdatanascimento('');
            setNewsexo('');
            setNewendereco('');
            setNewfoto('');
            setFeedbackMessage('');
        } catch (error) {
            console.error('Erro ao adicionar aluno:', error);
            setFeedbackMessage('Erro ao adicionar o aluno. Tente novamente.');
        }
    };
    

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
            <View style={styles.inputGroup}>
                                {feedbackMessage !== '' && (
                                    <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                                )}
                                <Text style={styles.label}>Código Responsável:</Text>
                                icon
                                <SelectDropdown
                                    data={responsaveis}
                                    onSelect={handleSelectResponsavel}
                                    defaultButtonText="Escolha um responsável"
                                    buttonStyle={styles.dropdownButtonStyle}
                                    buttonTextStyle={styles.dropdownButtonTxtStyle}
                                    renderButtonText={(selectedItem) => 
                                        selectedItem ? selectedItem.nome : 'Escolha um responsável'
                                    }
                                    renderCustomizedRowChild={(item, index) => (
                                        <View style={styles.dropdownItemStyle}>
                                            <Text style={styles.dropdownItemTxtStyle}>{item.nome}</Text>
                                        </View>
                                    )}
                                    dropdownStyle={styles.dropdownMenuStyle}
                                    rowStyle={styles.dropdownRowStyle}
                                    rowTextStyle={styles.dropdownRowTextStyle}
                                    showsVerticalScrollIndicator={false}
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
                        <TouchableOpacity onPress={showDatePicker}>
                        <TextInput
                            style={styles.input}
                            placeholder='Escolha a data'
                            value={newdatanascimento}
                            onChangeText={setNewdatanascimento}
                            editable={false} // Desativar a edição manual
                        />
                        </TouchableOpacity>
                        {show && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChange}
                            maximumDate={new Date()}  // Impede a seleção de uma data futura
                        />
                    )}
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
    dropdownButtonStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: '100%',
    },
    dropdownButtonIconStyle: {
        color: '#444',
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        textAlign: 'left',
        fontSize: 16,
        color: '#444',
    },
    dropdownButtonArrowStyle: {
        color: '#444',
    },
    dropdownMenuStyle: {
        borderRadius: 8,
    },
    dropdownItemStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    dropdownItemSelectedStyle: {
        backgroundColor: '#D2D9DF',
    },
    dropdownItemIconStyle: {
        marginRight: 10,
        color: '#444',
    },
    dropdownItemTxtStyle: {
        fontSize: 16,
        color: '#444',
    },
    dropdownRowStyle: {
        backgroundColor: '#FFF',
    },
    dropdownRowTextStyle: {
        textAlign: 'left',
        fontSize: 16,
        color: '#444',
},
});
 */
/* 

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView, Image } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';

export default function AlunoCadastro({navigation}) {
    const [newcodresponsavel, setNewcodresponsavel] = useState('');
    const [newnome, setNewnome] = useState('');
    const [newdatanascimento, setNewdatanascimento] = useState('');
    const [newsexo, setNewsexo] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newfoto, setNewfoto] = useState(''); // Alterado para ser um objeto de imagem

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

    const CadAluno = async () => {
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
            const response = await api.post('/aluno', newItem);
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
                    <TouchableOpacity style={styles.btnLogin} onPress={CadAluno}>
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

*/