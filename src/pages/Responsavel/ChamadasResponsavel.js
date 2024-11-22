import React from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground } from "react-native";
import { MaterialIcons, Ionicons, MaterialCommunityIcons, Octicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export default function ChamadasResponsavel({navigation,route}) {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <Text style={styles.backText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Chamada</Text>
        </View>
  
        {/* Seletor de turma e data */}
        <View style={styles.filterRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Berçário II</Text>
          </View>
          <TouchableOpacity style={styles.dateButton}>
            <Text style={styles.dateText}>Data</Text>
          </TouchableOpacity>
        </View>
  
        {/* Lista de alunos */}
        <ScrollView>
          {[1, 2, 3, 4, 5].map((day, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.dayText}>Dia: 0{day}/11</Text>
              <View style={styles.studentRow}>
                <Text style={styles.studentName}>Nome Aluno</Text>
                <View style={styles.attendanceDots}>
                  {[...Array(4)].map((_, i) => (
                    <View key={i} style={styles.dot}></View>
                  ))}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1A5BAF',
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    backButton: {
      paddingRight: 10,
    },
    backText: {
      color: '#fff',
      fontSize: 20,
    },
    title: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    filterRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
      backgroundColor: '#fff',
    },
    tag: {
      backgroundColor: '#FFEB3B',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    tagText: {
      color: '#000',
      fontWeight: 'bold',
    },
    dateButton: {
      backgroundColor: '#E0E0E0',
      paddingVertical: 5,
      paddingHorizontal: 15,
      borderRadius: 5,
    },
    dateText: {
      color: '#000',
    },
    card: {
      backgroundColor: '#fff',
      marginVertical: 5,
      marginHorizontal: 10,
      padding: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 3,
    },
    dayText: {
      fontSize: 14,
      color: '#777',
      marginBottom: 10,
    },
    studentRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    studentName: {
      fontSize: 16,
      color: '#333',
    },
    attendanceDots: {
      flexDirection: 'row',
      gap: 5,
    },
    dot: {
      width: 12,
      height: 12,
      backgroundColor: '#ccc',
      borderRadius: 6,
    },
  });
  