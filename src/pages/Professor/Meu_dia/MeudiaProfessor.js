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
        setDataAluno(formattedData)
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
     // Função para confirmar a seleção de data
     const onConfirmDate = ({ date }) => {
      setOpenDateModal(false);
      setSelectedDate(date); // Armazenar a data selecionada
    };
  
    const onConfirmTime = ({ hours, minutes }) => {
      setOpenTimeModal(false);
      const timeString = `${hours}:${minutes}`;
      setSelectedTime(timeString); // Armazenar a hora selecionada
    };


  const CadMeudiamanha = async () => {
  try {
    if (selected.length === 0) {
      Alert.alert("Erro", "Selecione pelo menos um aluno.");
      return;
    }

    const newItem = {
      codalunos: selected.map(item => item.value), // Array de códigos dos alunos
      codturma: newcodturma,
      codprofessor: newcodprofessor,
      datahora: newdatahora.toISOString().slice(0, 19).replace('T', ' '),
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
    console.error('Erro ao cadastrar o Meu Dia Manhã:', error);
    Alert.alert("Erro", "Ocorreu um erro ao cadastrar o Meu dia Manhã.");
  }
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
      datahora: newdatahora.toISOString().slice(0, 19).replace('T', ' '),
      recado: newrecado,
      xixi: newxixi,
      coco: newcoco,
      sono: newsono,
      saude: newsaude,
      medicacao: newmedicacao,
      cafetarde: newcafetarde,
      janta: newjanta,
    };

    const response = await api.post('/meudiatarde', newItem);
    console.log(response.data);
    Alert.alert("Cadastro realizado", "Meu dia Tarde cadastrado com sucesso!");
  } catch (error) {
    console.error('Erro ao cadastrar o Meu Dia Tarde:', error);
    Alert.alert("Erro", "Ocorreu um erro ao cadastrar o Meu dia Tarde.");
  }
};

      
return (
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    <View style={styles.topo}>
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
        <Button onPress={() => setOpenDateModal(true)} mode="outlined">
          Escolher Data
        </Button>

        {/* Modal de seleção de data */}
        <DatePickerModal
          visible={openDateModal}
          onDismiss={() => setOpenDateModal(false)}
          onConfirm={onConfirmDate}
          date={selectedDate || new Date()} // Data selecionada ou data atual
        />

        {/* Botão para abrir o modal de seleção de hora */}
        <Button onPress={() => setOpenTimeModal(true)} mode="outlined" style={{ marginTop: 10 }}>
          Escolher Hora
        </Button>

        {/* Modal de seleção de hora */}
        <TimePickerModal
          visible={openTimeModal}
          onDismiss={() => setOpenTimeModal(false)}
          onConfirm={onConfirmTime}
          hours={new Date().getHours()} // Hora atual
          minutes={new Date().getMinutes()} // Minutos atuais
        />

        {/* Mostrar data e hora selecionadas */}
        {selectedDate && (
          <Text style={{ marginTop: 10 }}>Data Selecionada: {selectedDate.toLocaleDateString()}</Text>
        )}
        {selectedTime && (
          <Text style={{ marginTop: 10 }}>Hora Selecionada: {selectedTime}</Text>
        )}
        </SafeAreaProvider>

        <View>
        <Text style={styles.label}>Café Manhã:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o café da manhã:"
          value={newcafemanha}
          onChangeText={setNewcafemanha}
        />
        </View>
            <Text style={styles.inputext}>Almoço:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o almoço:'
              value={newalmoco}
              onChangeText={setNewalmoco}
            />
            <Text style={styles.inputext}>Recado:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o recado:'
              value={newrecado}
              onChangeText={setNewrecado}
            />
            <Text style={styles.inputext}>Xixi:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o xixi:'
              value={newxixi}
              onChangeText={setNewxixi}
            />
            <Text style={styles.inputext}>Coco:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o coco:'
              value={newcoco}
              onChangeText={setNewcoco}
            />
            <Text style={styles.inputext}>Sono:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o sono:'
              value={newsono}
              onChangeText={setNewsono}
            />
            <Text style={styles.inputext}>Saúde:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a saúde:'
              value={newsaude}
              onChangeText={setNewsaude}
            />
            <Text style={styles.inputext}>Medicação:</Text>
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
  });
  