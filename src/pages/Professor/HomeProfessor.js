import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Octicons, FontAwesome } from "@expo/vector-icons";

export default function HomeProfessor({ navigation, route }) {
  const { codigo } = route.params; 

  useEffect(() => {
    if (codigo) {
      console.log('Código do professor:', { codigo }); 
    } else {
      Alert.alert('Erro', 'Código não encontrado.');
    }
  }, [codigo]);

  return (
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
        <View style={styles.icons}>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Suporte')} >
            <MaterialIcons name="support-agent" size={30} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Avisos', { codigo })}>
            <MaterialCommunityIcons name="bell" size={30} color="#fdd835" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
      <Text>Código do professor: {codigo}</Text>
    </View>
      {/* Linha 1: Botão Amarelo */}
      <TouchableOpacity style={[styles.buttonTop, styles.yellow]} onPress={() => navigation.navigate('MeudiaProfessor', { codigo })}>
        <Octicons name="smiley" size={24} color="black" />
        <Text style={styles.buttonText}>Meu dia na creche</Text>
      </TouchableOpacity>

      {/* Linha 2: Botões Vermelho e Azul */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.red, { marginTop: 65 }]} onPress={() => navigation.navigate('CalendarioProfessor', { codigo })}>
          <MaterialCommunityIcons name="calendar-month" size={24} color="black" />
          <Text style={styles.buttonText}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.blue, { marginBottom: 65 }]} onPress={() => navigation.navigate('AtividadesCadastro', { codigo })}>
          <FontAwesome name="pencil-square-o" size={24} color="black" />
          <Text style={styles.buttonText}>Atividades</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 3: Botões Roxo e Verde */}
      <View style={styles.row}>
        <TouchableOpacity style={[styles.buttonLeft, styles.purple, { marginTop: 65 }]} onPress={() => navigation.navigate('FotoProfessor', { codigo })}>
          <Ionicons name="images" size={24} color="#000" />
          <Text style={styles.buttonText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonRight, styles.green, { marginBottom: 65 }]} onPress={() => navigation.navigate('', { codigo })}>
          <MaterialCommunityIcons name="checkbox-outline" size={24} color="black" />
          <Text style={styles.buttonText}>Chamadas</Text>
        </TouchableOpacity>
      </View>

      {/* Linha 4: Botões Invisivel e Laranja */}
      <View style={styles.row}>
        <TouchableOpacity disabled={true} style={[styles.buttonLeft]} />
        <TouchableOpacity style={[styles.buttonRight, styles.orange]} onPress={() => navigation.navigate('HorarioProfessor', { codigo })}>
          <MaterialCommunityIcons name="clock-time-eight-outline" size={24} color="#000" />
          <Text style={styles.buttonText}>Horários</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity disabled={true} style={[styles.buttonBottom, styles.yellow]}>
        <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#283673',
    marginBottom: 50,
  },
  profilePic: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center', 
  },
  icon: {
    marginHorizontal: 10, 
  },  
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
});
