import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

export default function MeudiaProfessor({navigation}) {
  const [newcodaluno, setNewcodaluno] = useState(null)
  const [newcodturma, setNewcodturma] = useState(null)
  const [newcoco, setNewcoco] = useState(null)
  const [newcoco, setNewcoco] = useState(null)
  const [newcoco, setNewcoco] = useState(null)
  const [newcoco, setNewcoco] = useState(null)
  const [newcoco, setNewcoco] = useState(null)

    const Meudiatarde = async () => {
        try{
          const newItem{
            codaluno:newcodaluno,
            codturma:codturma,
            codprofessor:
            datahora:
            recado:
            xixi:
            coco:
            sono:
            saude:
            medicacao:
            cafetarde:
            janta:
          }
        const response = await axios.post('http://localhost:3000/meudiatarde');
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
            <Text style={styles.inputext}> Aluno: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> Turma: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> codprofessor: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> datahora: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> recado: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> xixi: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> coco: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newcoco}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> sono: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> saude: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> medicacao: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> cafetarde: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            />
            <Text style={styles.inputext}> janta: </Text>
            <TextInput
              style={styles.input}
              placeholder='Digite email:'
              value={newemail}
              onChangeText={setNewemail}
            /> 
             <TouchableOpacity style={styles.btnLogin} onPress={cadastrarmanha}>
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