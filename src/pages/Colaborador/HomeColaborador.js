import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ImageBackground, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Octicons, FontAwesome } from "@expo/vector-icons";

export default function HomeColaborador({ navigation, route }) {
  const { codigo } = route.params; 

  useEffect(() => {
    if (codigo) {
      console.log('Código do responsável:', { codigo }); 
    } else {
      Alert.alert('Erro', 'Código não encontrado.');
    }
  }, [codigo]);

  return (
    <ScrollView>
    <ImageBackground 
        source={require("../../../assets/nuvem.png")} 
        style={styles.container} 
        resizeMode="cover" 
      >
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.profilePic}
          onPress={() => navigation.openDrawer()} // Abre o Drawer ao clicar
          >
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
        </View>
        <View>
          <Text>Código: {codigo}</Text>
        </View>
      {/* Linha 1: Botão Amarelo */}
      <TouchableOpacity style={[styles.buttonTop, styles.yellow]} onPress={() => navigation.navigate('ResponsavelCadastro', { codigo }) }>
        <FontAwesome name="pencil-square-o" size={24} color="black" />
      <Text style={styles.buttonText}>Cadastro Responsavel</Text>
      </TouchableOpacity>

      {/* Linha 2: Botões Vermelho e Azul */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.red, { marginTop: 65 }]} onPress={() => navigation.navigate('ProfessorCadastro', { codigo }) }>
          <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
          <Text style={styles.buttonText}>Cadastro Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.blue, { marginBottom: 65 }]} onPress={() => navigation.navigate('AlunoCadastro', { codigo }) }>
          <Octicons name="smiley" size={24} color="black" />
          <Text style={styles.buttonText}>Cadastro Aluno</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 3: Botões Roxo e Verde */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.purple, { marginTop: 65 }]} onPress={() => navigation.navigate('ColaboradorCadastro', { codigo }) }>
          <Ionicons name="images" size={24} color="#000" />
          <Text style={styles.buttonText}>Cadastro Colaborador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.green, { marginBottom: 65 }]} onPress={() => navigation.navigate('TurmaCadastro', { codigo }) }>
          <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Cadastro Turma</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 4: Botões Rosa e Laranja */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.pink, { marginTop: 65 }]} onPress={() => navigation.navigate('ListadeMateriaisCadastro', { codigo }) }>
          <MaterialIcons name="list" size={24} color="#000" />
          <Text style={styles.buttonText}>Lista de Materiais</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.orange, { marginBottom: 65 }]} onPress={() => navigation.navigate('HorariosCadastro', { codigo }) }>
          <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="#000" />
          <Text style={styles.buttonText}>Horários</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 4: Botões Ciano e Azul escuro */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.cian, { marginTop: 65 }]} onPress={() => navigation.navigate('AuxiliarCadastro', { codigo }) }>
          <MaterialIcons name="list" size={24} color="#000" />
          <Text style={styles.buttonText}>Auxiliar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.darkblue, { marginBottom: 65 }]} onPress={() => navigation.navigate('CalendarioCadastro', { codigo }) }>
          <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
        <Text style={styles.buttonText}>Calendario</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 5: Botão Amarelo */}
      <TouchableOpacity style={[styles.buttonBottom, styles.yellow]}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>Código do Colaborador: {codigo}</Text>
      </View>
    </ImageBackground>
  </ScrollView>
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
  buttonTop: {
    width: 190,
    height: 110,
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  buttonBottom: {
    width: 190,
    height: 110,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    marginBottom: 0, // Remova qualquer espaço abaixo
  },
  buttonLeft: {
    width: 160,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 40,
    borderTopLeftRadius: 40,
    marginBottom: 0, // Remova a margem inferior
  },
  buttonRight: {
    width: 160,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderTopRightRadius: 40,
    marginBottom: 0, // Remova a margem inferior
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  yellow: { backgroundColor: "#FFD700" },
  red: { backgroundColor: "#FF6347" },
  blue: { backgroundColor: "#00BFFF" },
  purple: { backgroundColor: "#9370DB" },
  green: { backgroundColor: "#32CD32" },
  pink: { backgroundColor: "#FF69B4" },
  orange: { backgroundColor: "#FFA500" },
  cian: { backgroundColor: "#16E0A4" },
  darkblue: { backgroundColor: "#627BF6" },
});