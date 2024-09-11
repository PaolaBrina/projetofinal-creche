import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';

export default function MeudiaProfessor({navigation}) {
  const [newcodaluno, setNewcodaluno] =  useState('');
  const [newcodturma, setNewcodturma] =  useState('');
  const [newcodprofessor, setNewcodprofessor] =  useState('');
  const [newdatahora, setNewdatahora] =  useState(new Date());
  const [show, setShow] = useState(false);
  const [newrecado, setNewrecado] =  useState('');
  const [newxixi, setNewxixi] =  useState('');
  const [newcoco, setNewcoco] =  useState('');
  const [newsono, setNewsono] =  useState('');
  const [newsaude, setNewsaude] =  useState('');
  const [newmedicacao, setNewmedicacao] =  useState('');
  const [newcafetarde, setNewcafetarde] =  useState('');
 /*  const [newcafemanha, setNewcafemanha] =  useState('');
  const [newalmoco, setNewalmoco] =  useState(''); */
  const [newjanta, setNewjanta] =  useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setNewdatahora(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
  };


    const CadMeudiatarde = async () => {
        try{
          const newItem = {
            codaluno: newcodaluno,
            codturma: newcodturma,
            codprofessor: newcodprofessor,
            datahora: newdatahora,
            recado: newrecado,
            xixi: newxixi,
            coco: newcoco,
            sono: newsono,
            saude: newsaude,
            medicacao: newmedicacao,
            cafetarde: newcafetarde,
            janta: newjanta,
          }
        const response = await axios.post('http://localhost:3000/meudiatarde',newItem);
        const data = response.data; 
        console.log(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
    }
      
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
      <View style={styles.topo}>
      <Text style={styles.topotext}> dados cadastrais</Text>
        </View> 
            <View>
            <Text>Meu dia manha</Text>
            <Text style={styles.inputext}> codigo Aluno: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite  o código do aluno:'
              value={newcodaluno}
              onChangeText={setNewcodaluno}
              keyboardType='numeric' 
            />
            <Text style={styles.inputext}> Turma: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite  o código da turma:'
              value={newcodturma}
              onChangeText={setNewcodturma}
              keyboardType='numeric' 
            />
            <Text style={styles.inputext}> codigo Professor: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite  o código do professor:'
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
            <Text style={styles.inputext}> recado: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o recado:'
              value={newrecado}
              onChangeText={setNewrecado}
            />
            <Text style={styles.inputext}> xixi: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o xixi:'
              value={newxixi}
              onChangeText={setNewxixi}
            />
            <Text style={styles.inputext}> coco: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o coco:'
              value={newcoco}
              onChangeText={setNewcoco}
            />
            <Text style={styles.inputext}> sono: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o sono:'
              value={newsono}
              onChangeText={setNewsono}
            />
            <Text style={styles.inputext}> saude: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a saude:'
              value={newsaude}
              onChangeText={setNewsaude}
            />
            <Text style={styles.inputext}> medicacao: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a medicação:'
              value={newmedicacao}
              onChangeText={setNewmedicacao}
            />
            <Text style={styles.inputext}> cafetarde: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite o cafetarde:'
              value={newcafetarde}
              onChangeText={setNewcafetarde}
            />
            <Text style={styles.inputext}> janta: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite a janta:'
              value={newjanta}
              onChangeText={setNewjanta}
            /> 
             <TouchableOpacity style={styles.btnLogin} onPress={CadMeudiatarde}>
                   <Text style={styles.btnTxt}>cadastrar</Text>
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
      backgroundColor: '#c3c3c3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    topo: {
      backgroundColor: "#212240",
      height: 80,
      width: "100%",
      alignItems: 'flex-start'
    },
    containermeudia:{
      backgroundColor: "#52796F",
      width: 300,
      height: 200,
      borderRadius: 20,
      alignItems: 'center'
    },
    btnLogin:{
        backgroundColor: "#354F52",
        width: 80,
        height: 50,
        top: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt:{
        color: "#fff"
    },
    inputext:{
      width: '92%',
      paddingHorizontal: 10,
      marginTop: 10,
      marginBottom: 5,
      color: '#1D3557',
    },
  });