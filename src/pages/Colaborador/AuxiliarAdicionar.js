import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView,Alert } from 'react-native';
import { api } from '../../api/api';
import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt} from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";

registerTranslation('pt', pt)

export default function AuxiliarAdicionar({ closeModal }) {
    const [newnome, setNewnome] = useState('');
    const [newcpf, setNewcpf] = useState('');
    
    const [newdatanascimento, setNewdatanascimento] = useState(undefined);
    const [open, setOpen] = useState(false);
  
    const [newsexo, setNewsexo] = useState('');
    const [newemail, setNewemail] = useState('');
    const [newendereco, setNewendereco] = useState('');
    const [newtelefone, setNewtelefone] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
   
    const [date, setDate] = useState(undefined);
    
  
    const onDismissSingle = useCallback(() => {
      setOpen(false);
    }, [setOpen]);
  
    const onConfirmSingle = useCallback(
      (params) => {
        setOpen(false);
        setNewdatanascimento(params.newdatanascimento);
      },
      [setOpen, setNewdatanascimento]
    );


    const validateFields = () => {
        if (!newnome || !newcpf || !newdatanascimento || !newsexo || !newemail || !newendereco || !newtelefone) {
            return false;
        }
        return true;
    };


    const CadAuxiliares = async () => {
        if (!validateFields()) {
            setFeedbackMessage('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newItem = {
                nome: newnome,
                cpf: newcpf,
                datanascimento: newdatanascimento,
                sexo: newsexo,
                email: newemail,
                endereco: newendereco,
                telefone: newtelefone,
                status: 1,
            };
            const response = await api.post('/auxiliar', newItem);
            const data = response.data;

            Alert.alert('Cadastro Auxiliar', 'Auxiliar adicionado com sucesso!', [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => closeModal('Auxiliar adicionado com sucesso!')
            },
                ]);
        } catch (error) {
            console.error('Erro ao adicionar Auxiliar:', error);
            setFeedbackMessage('Erro ao adicionar o Auxiliar. Tente novamente.');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    {feedbackMessage !== '' && (
                        <Text style={styles.feedbackText}>{feedbackMessage}</Text>
                    )}
                    <Text style={styles.label}>Nome:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o nome"
                        value={newnome}
                        onChangeText={setNewnome}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Cpf:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o cpf"
                        value={newcpf}
                        onChangeText={setNewcpf}
                        keyboardType="numeric"
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
                        presentationStyle={'formSheet'}
                        onDismiss={onDismissSingle}
                        date={newdatanascimento}
                        onConfirm={onConfirmSingle}
                        
                        />
                    </View>
                    </SafeAreaProvider>

                    </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Sexo:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o sexo"
                        value={newsexo}
                        onChangeText={setNewsexo}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o email"
                        value={newemail}
                        onChangeText={setNewemail}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Endereço:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o endereço"
                        value={newendereco}
                        onChangeText={setNewendereco}
                    />
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Telefone:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite o telefone"
                        value={newtelefone}
                        onChangeText={setNewtelefone}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.btnLogin} onPress={CadAuxiliares}>
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
    datePicker:{
        height: 120,
        marginTop:-10,
    },
    iosstyle:{
        flexDirection:'row',
        justifyContent: "space-aeound",
    },
    pickerButton:{
        paddingHorizontal: 20,
    },
    button:{
        height:50,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        marginTop:10,
        marginBottom:15,
        backgroundColor:"#075985"
    },
    buttonText:{
       fontSize:14,
       fontWeight:'500',
       color:"#fff",
    },
});
