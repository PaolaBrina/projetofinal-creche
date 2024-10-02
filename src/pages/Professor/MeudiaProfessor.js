import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView,Platform,Alert  } from 'react-native';
import { api } from '../../api/api';

export default function MeudiaProfessor({navigation}) {
  const [newcodaluno, setNewcodaluno] =  useState('');
  const [newcodturma, setNewcodturma] =  useState('');
  const [newcodprofessor, setNewcodprofessor] =  useState('');
  const [newdatahora, setNewdatahora] =  useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date'); // Define o modo atual (data ou hora)
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

  const CadMeudiamanha = async () => {
    try {
      const newItem = {
        codaluno: newcodaluno,
        codturma: newcodturma,
        codprofessor: newcodprofessor,
        datahora: newdatahora.toISOString().slice(0, 19).replace('T', ' '), // Formato para o banco de dados
        recado: newrecado,
        xixi: newxixi,
        coco: newcoco,
        sono: newsono,
        saude: newsaude,
        medicacao: newmedicacao,
        cafemanha: newcafemanha,
        almoco: newalmoco,
      }
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
      const newItem = {
        codaluno: newcodaluno,
        codturma: newcodturma,
        codprofessor: newcodprofessor,
        datahora: newdatahora.toISOString().slice(0, 19).replace('T', ' '), // Formato para o banco de dados
        recado: newrecado,
        xixi: newxixi,
        coco: newcoco,
        sono: newsono,
        saude: newsaude,
        medicacao: newmedicacao,
        cafetarde: newcafetarde,
        janta: newjanta,
      }
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
    style={{ flex: 1 }} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
   >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1} } 
        style={{ flex: 1 }}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <View style={styles.topo}></View>
  
          <View>
            <Text>Meu Dia Manhã</Text>
            <Text style={styles.inputext}>Código Aluno:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código do aluno:'
              value={newcodaluno}
              onChangeText={setNewcodaluno}
              keyboardType='numeric'
            />
            <Text style={styles.inputext}>Turma:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código da turma:'
              value={newcodturma}
              onChangeText={setNewcodturma}
              keyboardType='numeric'
            />
            <Text style={styles.inputext}>Código Professor:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código do professor:'
              value={newcodprofessor}
              onChangeText={setNewcodprofessor}
            />
             <Text style={styles.inputext}>Data e Hora:</Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <TextInput
                style={styles.input}
                placeholder='Escolha a data'
                value={newdatahora.toLocaleDateString()}
                editable={false}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => showMode('time')}>
              <TextInput
                style={styles.input}
                placeholder='Escolha a hora'
                value={newdatahora.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                editable={false}
              />
            </TouchableOpacity>
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
            <Text style={styles.inputext}>Café Manhã:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o café da manhã:'
              value={newcafemanha}
              onChangeText={setNewcafemanha}
            />
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
  
         
          <View>
            <Text>Meu Dia Tarde</Text>
            <Text style={styles.inputext}>Código Aluno:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código do aluno:'
              value={newcodaluno}
              onChangeText={setNewcodaluno}
              keyboardType='numeric'
            />
            <Text style={styles.inputext}>Turma:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código da turma:'
              value={newcodturma}
              onChangeText={setNewcodturma}
              keyboardType='numeric'
            />
            <Text style={styles.inputext}>Código Professor:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o código do professor:'
              value={newcodprofessor}
              onChangeText={setNewcodprofessor}
            />
            <Text style={styles.inputext}>Data e Hora:</Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <TextInput
                style={styles.input}
                placeholder='Escolha a data e hora'
                value={newdatahora.toLocaleString()}
                editable={false}
              />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={newdatahora}
                mode={'datetime'}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
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
            <Text style={styles.inputext}>Café Tarde:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o café da tarde:'
              value={newcafetarde}
              onChangeText={setNewcafetarde}
            />
            <Text style={styles.inputext}>Janta:</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a janta:'
              value={newjanta}
              onChangeText={setNewjanta}
            />
  
            <TouchableOpacity style={styles.btnLogin} onPress={CadMeudiatarde}>
              <Text style={styles.btnTxt}>Cadastrar Tarde</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
  }
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5', 
      alignItems: 'center',
      justifyContent: 'flex-start', 
    },
    topo: {
      backgroundColor: "#283673",
      height: 80,
      width: "100%",
      justifyContent: 'center', 
      paddingLeft: 20, 
    },
    topotext: {
      color: '#FFFFFF',
      fontSize: 24,
      fontWeight: 'bold',
    },
    inputext: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#212240',
      marginBottom: 5,
      alignSelf: 'flex-start', 
      paddingLeft: 10,
    },
    input: {
      height: 45,
      borderColor: '#B0BEC5',
      borderWidth: 1,
      marginBottom: 15,
      paddingHorizontal: 10,
      width: '90%', 
      borderRadius: 8,
      backgroundColor: '#FFFFFF',
    },
    btnLogin: {
      backgroundColor: "#52796F",
      width: '90%', 
      height: 50,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 30, 
    },
    btnTxt: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: 'bold',
    },
    scrollView: {
      flexGrow: 1,
      width: '100%',
    },
  });
  