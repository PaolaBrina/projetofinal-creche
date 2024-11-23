import { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from "./AuthContext";
import { api } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function Login({ navigation }) {
  const [telefone, setTelefone] = useState('');
  const { login } = useContext(AuthContext); 

  const storeUserData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`${key} salvo no AsyncStorage!`);
      console.log(value)
    } catch (error) {
      console.error('Erro ao salvar no AsyncStorage:', error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { telefone });
      const { status, data, nome, codigo } = response.data;
  
      if (status === 'multi') {
        await storeUserData('userData', { telefone, roles: data, nome, codigo });
        login({ telefone, roles: data, nome, codigo });
        navigation.navigate('HomeSelecao', { data });
      } else if (['responsavel', 'professor', 'colaborador'].includes(status)) {
        await storeUserData('userData', { telefone, role: status, nome, codigo });
        login({ telefone, role: status, nome, codigo });
        navigation.navigate(`Home${status.charAt(0) + status.slice(1)}`, { codigo });
      } else {
        Alert.alert('Erro', 'Telefone não encontrado.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Erro ao verificar telefone.');
    }
  };
  return (
      <View style={styles.container}>
        <View style={styles.topo}>
          <Text style={styles.topoTxt}>Seja Bem Vindo à Agenda Amarelinha!</Text>
        </View> 
    
        <View style={styles.viewTxt}>
          <Text style={styles.txt}>Insira seu número de celular para que possamos enviar um código de confirmação.</Text>
        </View>

        <View style={styles.containerLogin}>
          <View style={styles.inputContainer}>
            <FontAwesome name="phone" size={24} color="white" style={styles.icon} />
            <TextInput
                style={styles.input}
                placeholder="Telefone"
                value={telefone}
                onChangeText={setTelefone}
                inputMode="tel"
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
    textAlign: 'center',
  },
  viewTxt: {
    height: 160,
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
