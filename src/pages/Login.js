import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

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
      console.error(error);
      Alert.alert('Erro', 'Erro ao verificar telefone.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}></View> 
      <View style={styles.logo}>
        <Image style={styles.img} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWrKK8QlWgiUoUrcwzDalIpcsLgCaWkc0w&s' }} />
      </View>

      <View style={styles.containerLogin}>
        <View style={styles.loginContainer}>
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
    backgroundColor: "#212240",
    height: 80,
    width: "100%",
  },
  logo: {
    paddingTop: 50
  },
  img: {
    width: 100, 
    height: 100,
  },
  loginContainer: {
    width: '80%',
    paddingTop: 20
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  containerLogin: {
    backgroundColor: '#212240',
    width: 200,
    height: 200,
    borderRadius: 20,
    alignItems: 'center',
  },
  btnLogin: {
    backgroundColor: '#00923F',
    width: 80,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    color: "#fff"
  }
});