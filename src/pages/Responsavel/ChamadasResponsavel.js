import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function ChamadasResponsavel({navigation}) {
    return (
        <View style={styles.container}>
          {/* Linha 1: Botão Amarelo */}
          <TouchableOpacity style={[styles.button, styles.yellow]}>
            <Text style={styles.buttonText}>Meu dia na creche</Text>
          </TouchableOpacity>
    
          {/* Linha 2: Botões Azul e Vermelho (calendário um pouco abaixo) */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.buttonLeft, styles.red, styles.offsetCalendario]}>
              <Text style={styles.buttonText}>Calendário</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonRight, styles.blue]}>
              <Text style={styles.buttonText}>Atividades</Text>
            </TouchableOpacity>
          </View>
    
          {/* Linha 3: Botões Roxo e Verde (chamadas abaixo de fotos) */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.buttonLeft, styles.purple, styles.offsetChamadas]}>
              <Text style={styles.buttonText}>Fotos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonRight, styles.green, ]}>
              <Text style={styles.buttonText}>Chamadas</Text>
            </TouchableOpacity>
          </View>
    
          {/* Linha 4: Botões Rosa e Laranja (horários abaixo de lista de materiais) */}
          <View style={styles.row}>
            <TouchableOpacity style={[styles.buttonLeft, styles.pink , styles.offsetHorarios]}>
              <Text style={styles.buttonText}>Lista de Materiais</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.buttonRight, styles.orange]}>
              <Text style={styles.buttonText}>Horários</Text>
            </TouchableOpacity>
          </View>
    
          {/* Linha 5: Botão Amarelo */}
          <TouchableOpacity style={[styles.button, styles.yellow]}>
            <Text style={styles.buttonText}></Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#b3d9ff", // Fundo azul com nuvens
        justifyContent: "center",
        alignItems: "center",
      },
      row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
      },
      button: {
        width: 140,
        height: 80,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
      },
      buttonRight: {
        width: 140,
        height: 80,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 40,
        borderBottomRightRadius: 40,
      },
      buttonLeft: {
        width: 140,
        height: 80,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 40,
        borderBottomLeftRadius: 40,
      },
      buttonText: {
        color: "#000",
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
      },
      yellow: {
        backgroundColor: "#FFD700",
        width: 200,
      },
      red: {
        backgroundColor: "#FF6347",
      },
      blue: {
        backgroundColor: "#00BFFF",
      },
      purple: {
        backgroundColor: "#9370DB",
      },
      green: {
        backgroundColor: "#32CD32",
      },
      pink: {
        backgroundColor: "#FF69B4",
      },
      orange: {
        backgroundColor: "#FFA500",
      },
      offsetCalendario: {
        marginTop: 50, // Calendário deslocado para baixo
      },
      offsetChamadas: {
        marginTop: 50, // Chamadas deslocadas para baixo
      },
      offsetHorarios: {
        marginTop: 50, // Horários deslocados para baixo
      },
    });