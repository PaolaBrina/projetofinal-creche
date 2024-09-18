import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image,ScrollView} from 'react-native';

export default function HomeResponsavel({navigation}) {

  const handleMeudia = () => {
    navigation.navigate('MeudiaResponsavel');
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

        <ScrollView>
        <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#fdd835' }]}  onPress={handleMeudia}>
          <Text style={styles.buttonText}>Meu dia na creche</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#29b6f6' }]}>
          <Text style={styles.buttonText}>Atividades</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ef5350' }]}>
          <Text style={styles.buttonText}>Calendário</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#66bb6a' }]}>
          <Text style={styles.buttonText}>Chamadas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ab47bc' }]}>
          <Text style={styles.buttonText}>Fotos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ffa726' }]}>
          <Text style={styles.buttonText}>Horários</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#ba68c8' }]}>
          <Text style={styles.buttonText}>Lista de Materiais</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  
      </View>
    );
  };
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
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
});