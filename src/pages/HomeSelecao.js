import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { api } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function HomeSelecao({ navigation }) {
  const [botao, setBotao] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRoles = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        throw new Error('Nenhum dado de usuário encontrado.');
      }
  
      const { telefone, roles, codigo } = JSON.parse(userData); // Obtém os dados do usuário
      if (roles && roles.length > 1) {
        const novoBotao = [];
        if (roles.includes('professor')) {
          novoBotao.push({ name: 'Professor', route: 'HomeProfessor', codigo: codigo[roles.indexOf('professor')] });
        }
        if (roles.includes('colaborador')) {
          novoBotao.push({ name: 'Colaborador', route: 'HomeColaborador', codigo: codigo[roles.indexOf('colaborador')] });
        }
        if (roles.includes('responsavel')) {
          novoBotao.push({ name: 'Responsável', route: 'HomeResponsavel', codigo: codigo[roles.indexOf('responsavel')] });
        }
        setBotao(novoBotao);
      } else {
        setError('Nenhuma opção disponível.');
      }
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar as opções de login.');
      Alert.alert('Erro', err.message || 'Erro ao carregar as opções.');
    } finally {
      setLoading(false);
    }
  };
  
  
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleSelection = async (button) => {
    try {
      // Salva a seleção no AsyncStorage
      await AsyncStorage.setItem('selectedRole', JSON.stringify(button));

      // Passa o código para a próxima tela
      navigation.navigate(button.route, { codigo: button.codigo });

      // Exibe no console
      console.log('Navegando para:', button.route, 'com código:', button.codigo);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao salvar a seleção.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('Login')}>
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.viewTxt}>
        <Text style={styles.txt}>Selecione seu login:</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#283673" />
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : botao.length === 0 ? (
        <Text style={styles.noOptions}>Nenhuma opção disponível.</Text>
      ) : (
        botao.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btn}
            onPress={() => handleSelection(button)} // Chama a função com o botão selecionado
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
    backgroundColor: '#f0f0f0',
  },
  topo: {
    alignItems: 'flex-start',
    width: '100%',
    padding: 10,
    paddingTop: 60,
    paddingLeft: 30,
    backgroundColor: '#283673',
  },
  viewTxt: {
    height: 150,
    width: "70%",
    alignContent: 'center',
  },
  txt: {
    paddingTop: 50,
    fontSize: 20,
    textAlign: 'center',
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
  error: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    padding: 10,
  },
});
