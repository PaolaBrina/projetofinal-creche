import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';

export default function Login({navigation}) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        login,
        senha
      });
      
      if (response.status === 200) {
        const { roles } = response.data;

        if (roles.length === 1) {
          const role = roles[0];
          if (role === 'professor') {
            navigation.navigate('ProfessorHome');
          } else if (role === 'colaborador') {
            navigation.navigate('ColaboradorHome');
          } else if (role === 'responsavel') {
            navigation.navigate('ResponsavelHome');
          }
        } else if (roles.length > 1) {
          navigation.navigate('SelectRole', { roles });
        }
      }
    } catch (error) {
      Alert.alert('Login falhou', 'Senha ou login inválido');
    }
  };
  
    return (
      <View style={styles.container}>
        <View style={styles.topo}></View> 
          <View style={styles.logo}>
            <Image style ={styles.img} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWrKK8QlWgiUoUrcwzDalIpcsLgCaWkc0w&s'}}/> 
          </View>

      <View style={styles.containerLogin}>
        <View style={styles.loginContainer}>
              <TextInput
                style={styles.input}
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
        </View>

        <TouchableOpacity style={styles.btnLogin}>
          <Text style={styles.btnTxt}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

 /* <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Home')}> */
      
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
    img:{
      width: 100, 
      height: 100,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#dcdfe1',
    },
    buttonSelected: {
      backgroundColor: '#212240',
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
    },
    buttonTextSelected: {
      color: '#fff',
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
    btnTxt:{
        color: "#fff"
    }
  });

