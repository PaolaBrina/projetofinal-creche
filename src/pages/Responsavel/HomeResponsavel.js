import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';

export default function HomeResponsavel({navigation}) {

  const handleMeudia = () => {
    navigation.navigate('MeudiaResponsavel');
  }
  return(
      <View style={styles.container}> {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.profilePic}>
            <Text style={styles.profileText}>Foto Filho</Text>
          </TouchableOpacity>
          <Text style={styles.topBarText}>Dados cadastrais</Text>
          <View style={styles.icons}>
            <TouchableOpacity style={styles.icon}>
              <Text>👤</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon}>
              <Text>🔔</Text>
            </TouchableOpacity>
          </View>
        </View>
  

        <View style={styles.column}>
        <TouchableOpacity style={[styles.singleBlock, { backgroundColor: '#FEE234' }]}onPress={handleMeudia}>
          <Text style={styles.itemText}>Meu dia na creche</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.smallBlock, { backgroundColor: '#FF7F50' }]}>
            <Text style={styles.itemText}>Calendário</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBlock, { backgroundColor: '#00BFFF' }]}>
            <Text style={styles.itemText}>Atividades</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.singleBlock, { backgroundColor: '#7FFF00' }]}>
          <Text style={styles.itemText}>Chamadas</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity style={[styles.smallBlock, { backgroundColor: '#8A2BE2' }]}>
            <Text style={styles.itemText}>Fotos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBlock, { backgroundColor: '#FFA500' }]}>
            <Text style={styles.itemText}>Horários</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.singleBlock, { backgroundColor: '#DA70D6' }]}>
          <Text style={styles.itemText}>Lista de Materiais</Text>
        </TouchableOpacity>
        </View>
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
    backgroundColor: '#000080',
    marginBottom: 20,
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
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: '45%',
    height: 100,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});


/* 
btn
width: '48%',
height: 100,
backgroundColor: '#d3d3d3',
marginVertical: 10,
borderRadius: 10,
justifyContent: 'center',
alignItems: 'center', */