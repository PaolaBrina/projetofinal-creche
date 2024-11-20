import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView,Platform,Alert  } from 'react-native';
import { api } from '../../../api/api';
import { MultiSelect,Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

import { Button } from 'react-native-paper';
import { DatePickerModal, registerTranslation, pt,TimePickerModal  } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { format } from 'date-fns';

registerTranslation('pt', pt);

// Componente de Rádio Personalizado
const CustomRadioButton = ({ title, options, selectedOption, setSelectedOption }) => {
  return (
      <View style={styles.radioContainer}>
          <Text style={styles.radioTitle}>{title}</Text>
          {options.map((option) => (
              <TouchableOpacity
                  key={option.value}
                  onPress={() => setSelectedOption(option.value)}
                  style={styles.radioOption}
              >
                  <View style={styles.radioCircle}>
                      {selectedOption === option.value && (
                          <AntDesign name="checkcircle" size={20} color="#4caf50" />
                      )}
                  </View>
                  <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
          ))}
      </View>
  );
};

export default function MeudiaProfessor({navigation}) {
  const [newcodaluno, setNewcodaluno] =  useState('');
  const [dataluno, setDataAluno] = useState([{label: "",value: ""}])
  const [selected, setSelected] = useState([]);

  const [newcodturma, setNewcodturma] =  useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [dataturma, setDataturma] = useState([{label: "",value: ""}])

  const [newcodprofessor, setNewcodprofessor] =  useState('');
  const [dataprofessor, setDataprofessor] = useState([{label: "",value: ""}])

const [openDateModal, setOpenDateModal] = useState(false); // Controle do modal de data
const [openTimeModal, setOpenTimeModal] = useState(false); // Controle do modal de hora
const [selectedDate, setSelectedDate] = useState(null); // Apenas data
const [selectedTime, setSelectedTime] = useState(null); // Apenas hora
const [finalDateTime, setFinalDateTime] = useState(null); // Combinação no formato final

  const [newrecado, setNewrecado] =  useState('');
  const [newxixi, setNewxixi] =  useState('');
  const [newcoco, setNewcoco] =  useState('');
  const [newsono, setNewsono] =  useState('');
  const [newsaude, setNewsaude] =  useState('');
  const [newmedicacao, setNewmedicacao] =  useState('');
  const [newcafetarde, setNewcafetarde] =  useState('');
  const [newcafemanha, setNewcafemanha] =  useState('');
  const [newalmoco, setNewalmoco] =  useState('');
  const [newjanta, setNewjanta] =  useState('');


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

  async function fetchAluno(){
    try {
        const response = await api.get('/aluno')
        console.log("Aluno: ", response.data.aluno)
        const formattedData = response.data.aluno.map(item => ({
          label: item.nome,  
          value: item.codigo.toString() 
      }));
      setDataAluno(formattedData);
      console.log("Formatted Aluno Data:", formattedData);
      
    } catch (error) {
        console.log(error)
    }
  }

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

  useEffect(() => {
    fetchAluno()
    fetchTurma()
    fetchProfessor()
  },[])
     

  // Date and Time Handling
  const onConfirmDate = ({ date }) => {
    setOpenDateModal(false);
    setSelectedDate(date);

    // Atualizar finalDateTime se hora já estiver selecionada
    if (selectedTime) {
      updateFinalDateTime(date, selectedTime);
    }
  };

  const onConfirmTime = ({ hours, minutes }) => {
    setOpenTimeModal(false);
    const timeString = `${hours}:${minutes}`;
    setSelectedTime(timeString);

    // Atualizar finalDateTime se data já estiver selecionada
    if (selectedDate) {
      updateFinalDateTime(selectedDate, timeString);
    }
  };

  const updateFinalDateTime = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const updatedDateTime = new Date(date);
    updatedDateTime.setHours(hours);
    updatedDateTime.setMinutes(minutes);
    setFinalDateTime(updatedDateTime);
  };


  const CadMeudiatarde = async () => {
  try {
    if (selected.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um aluno.");
      return;
    }

    const newItem = {
      codalunos: selected.map(item => item.value), // Array de códigos dos alunos
      codturma: newcodturma,
      codprofessor: newcodprofessor,
      datahora: finalDateTime.toISOString().slice(0, 19).replace('T', ' '),
      recado: newrecado,
        xixi: newxixi,
        coco: newcoco,
        sono: newsono,
        saude: newsaude,
        medicacao: newmedicacao,
        cafetarde: newcafetarde,
        janta: newjanta,
    };

    const response = await api.post('/meudiamanha', newItem);
    console.log(response.data);
    Alert.alert("Cadastro realizado", "Meu dia Manhã cadastrado com sucesso!");
  } catch (error) {
    console.log("pppp",selected.map(item => item.value),"pol",newcodturma,newcodprofessor,finalDateTime.toISOString().slice(0, 19).replace('T', ' '),newrecado,newxixi,newcoco,newsono,newsaude,newmedicacao,newcafemanha,newalmoco)
    console.error('Erro ao cadastrar o Meu Dia Manhã:', error);
    Alert.alert("Erro", "Ocorreu um erro ao cadastrar o Meu dia Manhã.");
  }
};

const CadMeudiamanha = async () => {
  try {
    if (selected.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um aluno.");
      return;
    }
    console.log(selected)

  
    const newItem = {
      codalunos: codAlunos = selected.map((aluno) => aluno.value), // Array de códigos
      codturma: newcodturma,
      codprofessor: newcodprofessor,
      datahora: finalDateTime.toISOString().slice(0, 19).replace('T', ' '),
      recado: newrecado,
      xixi: newxixi,
      coco: newcoco,
      sono: newsono,
      saude: newsaude,
      medicacao: newmedicacao,
      cafemanha: newcafemanha,
      almoco: newalmoco,
    };

    const response = await api.post('/meudiamanha', newItem);
    console.log(response.data);

    Alert.alert("Cadastro realizado", "Meu dia Manhã cadastrado com sucesso!");
  } catch (error) {
    console.log("pppp",codAlunos,"pol",newcodturma,newcodprofessor,finalDateTime.toISOString().slice(0, 19).replace('T', ' '),newrecado,newxixi,newcoco,newsono,newsaude,newmedicacao,newcafemanha,newalmoco)
    console.error("Erro ao cadastrar o Meu Dia Manhã:", error);
    Alert.alert("Erro", "Ocorreu um erro ao cadastrar o Meu dia Manhã.");
  }
};

      
return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.topo}>

    <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor')}>
          <AntDesign name="caretleft" size={30} color="white" />
     </TouchableOpacity>

      <Text style={styles.topoText}>Meu Dia</Text>
    </View>
    <ScrollView
      contentContainerStyle={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Meu Dia Manhã</Text>
        <View>
          <Text style={styles.label}>Código Aluno:</Text>
          
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={dataluno}
            labelField="label"
            valueField="value"
            placeholder="Selecione itens"
            searchPlaceholder="Procurar..."
            value={selected}
            onChange={item => setSelected(item)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
            selectedStyle={styles.selectedStyle}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código da turma:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataturma}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione item"
            searchPlaceholder="Procurar..."
            value={newcodturma}
            onChange={item => setNewcodturma(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Código do professor:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={dataprofessor}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Selecione item"
            searchPlaceholder="Procurar..."
            value={newcodprofessor}
            onChange={item => setNewcodprofessor(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
            )}
          />
        </View>
        <SafeAreaProvider>
      
             <View style={styles.inputGroup}>
               <Text style={styles.label}>Data:</Text>
                <SafeAreaProvider>
                  <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                  <Button onPress={() => setOpenDateModal(true)} uppercase={false} mode="outlined">
                      <Text> Escolher data </Text>
                  </Button>
                  <DatePickerModal
                      locale="pt"
                      mode="single"
                      visible={openDateModal}
                      onDismiss={() => setOpenDateModal(false)}
                      onConfirm={onConfirmDate}
                      date={selectedDate || new Date()}
                  />
                  </View>
              </SafeAreaProvider>
              </View>
             <View style={styles.inputGroup}>
               <Text style={styles.label}>Escolher Hora:</Text>
                <SafeAreaProvider>
                  <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                  <Button onPress={() => setOpenTimeModal(true)} uppercase={false} mode="outlined">
                      <Text> Escolher Hora </Text>
                  </Button>
                  <TimePickerModal
                    locale="pt"
                    visible={openTimeModal}
                    onDismiss={() => setOpenTimeModal(false)}
                    onConfirm={onConfirmTime}
                    hours={selectedTime ? parseInt(selectedTime.split(':')[0]) : new Date().getHours()}
                    minutes={selectedTime ? parseInt(selectedTime.split(':')[1]) : new Date().getMinutes()}
                  />
                  </View>
                  
              </SafeAreaProvider>
              </View>
          
          
          {finalDateTime && (
            <Text>
              Data e Hora Final: {format(finalDateTime, 'dd/MM/yyyy HH:mm')}
            </Text>
          )}
        </SafeAreaProvider>


        <View style={styles.radioContainererr}>
          <View style={styles.radioBox}>
            {/* Campos de Rádio - Café da Manhã */}
            <CustomRadioButton
              title="Café da Manhã"
              options={[
                { label: '😋', value: 'comeu bem' },
                { label: '😐', value: 'comeu regular' },
                { label: '😞', value: 'comeu mal' },
              ]}
              selectedOption={newcafemanha}
              setSelectedOption={setNewcafemanha}
            />
          </View>

          <View style={styles.radioBox}>
            {/* Campos de Rádio - Almoço */}
            <CustomRadioButton
              title="Almoço"
              options={[
                { label: '😋', value: 'comeu bem' },
                { label: '😐', value: 'comeu regular' },
                { label: '😞', value: 'comeu mal' },
              ]}
              selectedOption={newalmoco}
              setSelectedOption={setNewalmoco}
            />
          </View>
        </View>

        <View>
            <Text style={styles.label}>Recado:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o recado:'
              value={newrecado}
              onChangeText={setNewrecado}
            />
            </View>

          <View style={styles.radioContainererr}>
          <View style={styles.radioBox}>
            {/* Campos de Rádio - Café da Manhã */}
                 <CustomRadioButton
                    title="Fez xixi?"
                    options={[
                        { label: '✅', value: 'fez xixi' },
                        { label: '❌', value: 'não fez xixi' },
                    ]}
                    selectedOption={newxixi}
                    setSelectedOption={setNewxixi}
                />
           </View>
           

        <View style={styles.radioBox}>
          {/* Campos de Rádio - Almoço */}
              <CustomRadioButton
                    title="Fez coco?"
                    options={[
                        { label: '✅', value: 'fez coco' },
                        { label: '❌', value: 'não fez coco' },
                    ]}
                    selectedOption={newcoco}
                    setSelectedOption={setNewcoco}
                />
            </View>
            </View>



            <View style={styles.radioContainererr}>
          <View style={styles.radioBox}>
            {/* Campos de Rádio - Café da Manhã */}
              <CustomRadioButton
                      title="Sono do aluno"
                      options={[
                          { label: '😪', value: 'dormiu' },
                          { label: '😔', value: 'não fez dormiu' },
                      ]}
                      selectedOption={newsono}
                      setSelectedOption={setNewsono}
                  />
            </View>

            <View style={styles.radioBox}>
          {/* Campos de Rádio - Almoço */}
            <CustomRadioButton
                      title="Saúde do aluno"
                      options={[
                          { label: '🤮', value: 'aluno está mal' },
                          { label: '😁', value: 'aluno está bem' },
                      ]}
                      selectedOption={newsaude}
                      setSelectedOption={setNewsaude}
                  />
            </View>
            </View>
           
            <Text style={styles.label}>Medicação:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a medicação:'
              value={newmedicacao}
              onChangeText={setNewmedicacao}
            />
  
            <TouchableOpacity style={styles.btnLogin} onPress={CadMeudiamanha}>
              <Text style={styles.btnTxt}>Cadastrar Manhã</Text>
            </TouchableOpacity>
          </View>
  
         
      
      </ScrollView>
    </KeyboardAvoidingView>
  );
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    topo: {
      backgroundColor: '#283673',
      width: '100%',
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
    },
    topoText: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    scrollView: {
      flexGrow: 1,
      paddingHorizontal: 20,
    },
    formContainer: {
      marginTop: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    input: {
      height: 45,
      borderColor: '#B0BEC5',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
    },
    dropdown: {
      height: 50,
      borderColor: '#B0BEC5',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    btn: {
      backgroundColor: '#52796F',
      paddingVertical: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 20,
    },
    btnText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    datePicker: {
      marginBottom: 20,
    },
    placeholderStyle: {
      fontSize: 16,
      color: '#B0BEC5',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: '#212240',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 8,
    },
    selectedStyle: {
      borderRadius: 8,
      padding: 8,
      backgroundColor: '#E8F5E9',
    },
    radioContainer: {
      marginVertical: 15,
  },
  radioTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
  },
  radioOption: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
  },
  radioCircle: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#4caf50',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
  },
  radioLabel: {
      fontSize: 20,
  },
  selectedDate: {
      marginTop: 10,
      fontSize: 16,
      color: '#333',
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
  radioContainererr: {
      flexDirection: 'row',           // Exibe os campos horizontalmente
      justifyContent: 'space-between', // Espaçamento igual entre os campos
      alignItems: 'center',           // Alinha verticalmente os campos no centro
  },
  radioBox: {
    marginRight: 50,
    marginLeft: 30, // Adiciona espaçamento entre os campos
  },
  topo: {
    backgroundColor: '#283673',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row', // Organiza os elementos horizontalmente
    position: 'relative', // Permite posicionamento absoluto
  },
  btnseta: {
    position: 'absolute', // Permite posicionar na lateral esquerda
    left: 10,             // Espaçamento da lateral esquerda
    top: '50%',           // Centraliza verticalmente
    transform: [{ translateY: -15 }], // Ajuste para alinhar perfeitamente ao centro
  },
  topoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',  // Garante que o texto esteja centralizado
  },  
  });
  