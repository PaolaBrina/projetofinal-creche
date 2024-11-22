import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



export default function HomeResponsavel({ navigation, route }) {
  // Recupera o código passado via parâmetros
  const { codigo } = route.params || {}; // Desestruturação com fallback caso o código não esteja disponível

  useEffect(() => {
    // Verifica se o código foi passado corretamente
    if (codigo) {
      console.log('Código do responsável:', codigo); // Exibe o código no console para verificação
    } else {
      Alert.alert('Erro', 'Código não encontrado.');
    }
  }, [codigo]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Suporte')} >
          <MaterialIcons name="support-agent" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <MaterialCommunityIcons name="bell" size={30} color="#fdd835" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#fdd835' }]} onPress={() => navigation.navigate('MeudiaResponsavel', { codigo })}>
            <Text style={styles.buttonText}>Meu dia na creche</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#29b6f6' }]} onPress={() => navigation.navigate('Atividades', { codigo })}>
            <Text style={styles.buttonText}>Atividades</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#ef5350' }]} onPress={() => navigation.navigate('Calendario', { codigo })}>
            <Text style={styles.buttonText}>Calendário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#66bb6a' }]} onPress={() => navigation.navigate('ChamadasResponsavel', { codigo })}>
            <Text style={styles.buttonText}>Chamadas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#ab47bc' }]} onPress={() => navigation.navigate('Fotos', { codigo })}>
            <Text style={styles.buttonText}>Fotos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#ffa726' }]} onPress={() => navigation.navigate('Horarios', { codigo })}>
            <Text style={styles.buttonText}>Horários</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#ba68c8' }]} onPress={() => navigation.navigate('ListadeMateriaisResponsavel', { codigo })}>
            <Text style={styles.buttonText}>Lista de Materiais</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Exibe o código do responsável */}
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>Código do Responsável: {codigo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
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
    marginBottom: 20,
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  buttonsContainer: {
    width: '100%',
    padding: 10,
  },
  button: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
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
