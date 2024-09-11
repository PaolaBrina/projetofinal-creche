import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';


import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login({ navigation }) {
  const [telefone, setTelefone] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', { telefone });
      const { status, data } = response.data;

      switch (status) {
        case 'multi':
          navigation.navigate('HomeSelecao', { data });
          break;
        case 'responsavel':
          navigation.navigate('HomeResponsavel');
          break;
        case 'professor':
          navigation.navigate('HomeProfessor');
          break;
        case 'colaborador':
          navigation.navigate('HomeColaborador');
          break;
        case 'nao_encontrado':
        default:
          Alert.alert('Erro', 'Telefone não encontrado.');
          break;
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Erro ao verificar telefone.');
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.topo}>
          <Text style={styles.topoTxt}>Seja Bem Vindo à Agenda Amarelinha!</Text>
        </View> 
    
        <View style={styles.viewTxt}>
          <Text style={styles.txt}>Insira seu número de celular para que possamos enviar um codigo de confirmação.</Text>
        </View>

        <View style={styles.containerLogin}>
        <View style={styles.inputContainer}>
          <FontAwesome name="phone" size={24} color="white" style={styles.icon} />
          <TextInput
              style={styles.input}
              placeholder="Telefone"
              value={telefone}
              onChangeText={setTelefone}
              keyboardType="phone-pad"
            />
        </View>

          <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
            <Text style={styles.btnTxt}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  topo: {
    backgroundColor: "#283673",
    paddingTop: 70,
    height: 150,
    width: "100%",
    alignContent: 'center'
  },
  topoTxt: {
    color: "#fff",
    fontSize: 25,
    textAlign: 'center'
  },
  viewTxt: {
    height: 150,
    width: "70%",
    alignContent: 'center',
    fontWeight: 'bold',
    marginBottom: 35
  },
  txt: {
    paddingTop: 50,
    fontSize: 20,
    textAlign: 'center'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#283673",
    width: '85%',
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    flex: 1,
    height: 40,
  },
  containerLogin: {
    backgroundColor: '#283673',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  btnLogin: {
    backgroundColor: '#FFEF95',
    width: '50%',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnTxt: {
    color: '#283673',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

/* 
import { TextInputMask } from 'react-native-masked-text'; // Importa a biblioteca para máscara

          <FontAwesome name="phone" size={24} color="white" style={styles.icon} />
          <TextInputMask
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99) '
            }}
            style={styles.input}
            placeholder="Telefone"
            value={telefone}
            onChangeText={setTelefone}
          /> 
*/