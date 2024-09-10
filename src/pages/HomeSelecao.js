import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeSelecao({ route, navigation }) {
  const { data } = route.params; // pega os dados do login
  const [botao, setBotao] = useState([]);

  useEffect(() => {
    if (data) {
      const novoBotao = [];

      if (data.includes('professor')) {
        novoBotao.push({ 
            name: 'Professor', 
            route: 'HomeProfessor' 
        });
      }
      if (data.includes('colaborador')) {
        novoBotao.push({ 
            name: 'Colaborador', 
            route: 'HomeColaborador' 
        });
      }
      if (data.includes('responsavel')) {
        novoBotao.push({ 
            name: 'Responsável', 
            route: 'HomeResponsavel' 
        });
      }

      setBotao(novoBotao);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      {botao.length === 0 ? (
        <Text style={styles.noOptions}>Nenhuma opção disponível.</Text>
      ) : (
        botao.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btn}
            onPress={() => navigation.navigate(button.route)}
          >
            <Text style={styles.btnText}>{button.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  btn: {
    backgroundColor: '#283673',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  noOptions: {
    fontSize: 18,
    color: '#333',
  },
});


/* import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export default function HomeSelecao({ route, navigation }) {
  const { telefone, data } = route.params;
  const [tipos, setTipos] = useState([]);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await axios.post('http://localhost:3000/login', { telefone });
        setTipos(response.data);
      } catch (error) {
        console.error(error);
        Alert.alert('Erro', 'Erro ao verificar tipos de usuário.');
      }
    };

    fetchTipos();
  }, [telefone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione</Text>
      {tipos.includes('responsavel') && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeResponsavel')}>
          <Text style={styles.buttonText}>Ir para Responsável</Text>
        </TouchableOpacity>
      )}
      {tipos.includes('professor') && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeProfessor')}>
          <Text style={styles.buttonText}>Ir para Professor</Text>
        </TouchableOpacity>
      )}
      {tipos.includes('colaborador') && (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HomeColaborador')}>
          <Text style={styles.buttonText}>Ir para Colaborador</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00923F',
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
 */


/* import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function HomeSelecao({navigation}) {
    return (
      <View style={styles.container}>
            <Text style={styles.btnTxt}> Selecione </Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#c3c3c3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerProfessor:{
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
    }
  });


  
/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeSelecao({ navigation }) {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const telefone = '';  
        axios.post('http://localhost:3000/login', { telefone })
            .then(response => {
                if (response.data.status === 'multi') {
                    setTipos(response.data.tipos);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const navigateToHome = (tipo) => {
        switch (tipo) {
            case 'professor':
                navigation.navigate('HomeProfessor');
                break;
            case 'responsavel':
                navigation.navigate('HomeResponsavel');
                break;
            case 'colaborador':
                navigation.navigate('HomeColaborador');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            {tipos.length === 0 ? (
                <Text>Nenhum tipo de usuário encontrado.</Text>
            ) : (
                tipos.map(tipo => (
                    <TouchableOpacity
                        key={tipo}
                        style={styles.btnLogin}
                        onPress={() => navigateToHome(tipo)}
                    >
                        <Text style={styles.btnTxt}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</Text>
                    </TouchableOpacity>
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c3c3c3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLogin: {
        backgroundColor: "#354F52",
        width: 200,
        height: 50,
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: "#fff",
        fontSize: 18,
    },
});
 */ 