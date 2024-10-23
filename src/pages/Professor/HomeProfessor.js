import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function HomeProfessor({navigation}) {

  const handleMeudia = () => {
    navigation.navigate('MeudiaProfessor');
  }
  return(
  <View style={styles.container}>
  <View style={styles.topBar}>
    <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
    <View style={styles.icons}>
      <TouchableOpacity style={styles.icon}>
        <Text>👤</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.icon}>
        <Text>🔔</Text>
      </TouchableOpacity>
    </View>
  </View>


  <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.button}  onPress={handleMeudia}>
      <Text style={styles.buttonText}>Meu dia na creche</Text>
    </TouchableOpacity>
    </View>

    <View style={styles.row}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fotos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atividades</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Chamadas</Text>
    </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Calendário</Text>
      </TouchableOpacity>
    </View>

</View>
);
};
  
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
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
  });