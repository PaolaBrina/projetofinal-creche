import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from "@expo/vector-icons";


export default function TrocarPapel({ navigation }) {
  const { user, troca } = useContext(AuthContext);

  const handleTrocarPapel = async () => {
    try {
      await AsyncStorage.removeItem('selectedRole'); // Remove o papel selecionado
      troca(); // Reseta o estado do contexto
      navigation.navigate('HomeSelecao'); // Redireciona para a tela de seleção
    } catch (error) {
      console.error('Erro ao trocar de papel:', error);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <TouchableOpacity
            style={styles.profilePic}
            onPress={() => navigation.openDrawer()} // Abre o Drawer ao clicar
            >
            <MaterialIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
        </View>
    <View style={styles.viewAcesso}> 
      <Text style={styles.title}>Trocar Acesso</Text>
      <Text style={styles.description}>
        Você possui mais de um acesso associado ao seu número. Se deseja selecionar o login novamente aperte no botão abaixo.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleTrocarPapel}>
        <Text style={styles.buttonText}>Trocar Acesso</Text>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#283673',
  },
  viewAcesso: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 20, 
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  button: {
    backgroundColor: '#283673',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
