import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';

export default function HomeColaborador({ navigation, route }) {
  // Recupera o código passado via parâmetros
  const { codigo } = route.params || {}; // Desestruturação com fallback caso o código não esteja disponível

  useEffect(() => {
    // Verifica se o código foi passado corretamente
    if (codigo) {
      console.log('Código do colaborador:', codigo); // Exibe o código no console para verificação
    } else {
      Alert.alert('Erro', 'Código não encontrado.');
    }
  }, [codigo]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlunoCadastro', { codigo })}>
          <Text style={styles.buttonText}>Cadastro Aluno</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResponsavelCadastro', { codigo })}>
            <Text style={styles.buttonText}>Cadastro Responsável</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfessorCadastro', { codigo })}>
            <Text style={styles.buttonText}>Cadastro Professor</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TurmaCadastro', { codigo })}>
            <Text style={styles.buttonText}>Cadastro Turmas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HorarioCadastro', { codigo })}>
            <Text style={styles.buttonText}>Cadastro Horários </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AvisosCadastro', { codigo })}>
            <Text style={styles.buttonText}>Avisos </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CalendarioCadastro', { codigo })}>
            <Text style={styles.buttonText}>Calendário </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AuxiliarCadastro', { codigo })}>
            <Text style={styles.buttonText}>Auxiliar </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListaMaterialCadastro', { codigo })}>
            <Text style={styles.buttonText}>Lista de Materiais </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Exibe o código do colaborador */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>Código do Colaborador: {codigo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 60,
    backgroundColor: '#283673',
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#000',
  },
  topBarText: {
    color: '#fff',
    fontSize: 16,
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  buttonsContainer: {
    width: '90%',
    flexDirection: 'column',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    width: '40%',
    height: 100,
    backgroundColor: '#d3d3d3',
    marginVertical: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  codeContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  codeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
