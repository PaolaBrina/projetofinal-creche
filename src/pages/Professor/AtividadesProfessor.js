import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { api } from '../../api/api';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AtividadesProfessor({navigation}) {
  const [newcodturma, setNewcodturma] = useState('');
  const [newdatahora, setNewdatahora] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date'); // Define o modo atual (data ou hora)
  const [newdescricao, setNewdescricao] = useState('');
  const [newfoto, setNewfoto] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dataturma, setDataturma] = useState([{label: "",value: ""}])

   const Atividades = async () => {
    try {
      const newItem = {
        codturma: newcodturma,
        datahora: newdatahora.toISOString().slice(0, 19).replace('T', ' '), // Formato para o banco de dados
        descricao: newdescricao,
        foto: newfoto,
      };
      const response = await api.post('/turma', newItem);
      const data = response.data;

      Alert.alert('Cadastro Atividades', 'Atividade adicionada com sucesso!', [
          {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
          },
          {text: 'OK', onPress: () => closeModal('Atividade adicionada com sucesso!')
      },
          ]);
  } catch (error) {
      console.error('Erro ao adicionar Atividade:', error);
      setFeedbackMessage('Erro ao adicionar o Atividade. Tente novamente.');
  }
};  
      
    useEffect(() => {
        Atividades();
    }, []);

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || new Date();
      setShow(false);
  
      if (mode === 'date') {
        // Se o modo é data, apenas atualiza a data
        const tempDate = new Date(newdatahora);
        tempDate.setFullYear(currentDate.getFullYear());
        tempDate.setMonth(currentDate.getMonth());
        tempDate.setDate(currentDate.getDate());
        setNewdatahora(tempDate);
      } else {
        // Se o modo é hora, atualiza a hora
        const tempDate = new Date(newdatahora);
        tempDate.setHours(currentDate.getHours());
        tempDate.setMinutes(currentDate.getMinutes());
        setNewdatahora(tempDate);
      }
    };
  
    const showMode = (currentMode) => {
      setMode(currentMode);
      setShow(true);
    };


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
      <View style={styles.container}> 
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
           <View>
             <Text style={styles.inputext}>Data e Hora:</Text>
            
              <TextInput
                style={styles.input}
                placeholder='Escolha a data'
                value={newdatahora.toLocaleDateString()}
                editable={false}
              />
            
      
              <TextInput
                style={styles.input}
                placeholder='Escolha a hora'
                value={newdatahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                editable={false}
              />
            
            {show && (
              <DateTimePicker
                testID="date-picker"
                value={newdatahora}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            </View>

            <View>
            <Text style={styles.label}>Digite uma Descricao:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a descricao:'
              value={newdescricao}
              onChangeText={setNewdescricao}
            />
            </View>

            <View>
            <Text style={styles.label}>Insira uma foto:</Text>
            <TextInput
              style={styles.input}
              placeholder='Inserir foto:'
              value={newfoto}
              onChangeText={setNewfoto}
            />
            </View>
      </View>
      </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
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
  });