import { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image} from 'react-native';

export default function Login({navigation}) {

  const [selectedButton, setSelectedButton] = useState('Responsável');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handlePress = (tipo) => {
    setSelectedButton(tipo);
  };
    


    return (
      <View style={styles.container}>
        <View style={styles.topo}></View> 
          <View style={styles.logo}>
            <Image style ={styles.img} source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWwWrKK8QlWgiUoUrcwzDalIpcsLgCaWkc0w&s'}}/> 
          </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'Responsável' && styles.buttonSelected
            ]}
            onPress={() => handlePress('Responsável')}
          >
            <Text style={[
              styles.buttonText,
              selectedButton === 'Responsável' && styles.buttonTextSelected
            ]}>Responsável</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'Professor' && styles.buttonSelected
            ]}
            onPress={() => handlePress('Professor')}
          >
            <Text style={[
              styles.buttonText,
              selectedButton === 'Professor' && styles.buttonTextSelected
            ]}>Professor</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'Secretaria' && styles.buttonSelected
            ]}
            onPress={() => handlePress('Secretaria')}
          >
            <Text style={[
              styles.buttonText,
              selectedButton === 'Secretaria' && styles.buttonTextSelected
            ]}>Secretaria</Text>
        </TouchableOpacity>
      </View>
        <View style={styles.containerLogin}>
          <TouchableOpacity style={styles.btnLogin} onPress={() => navigation.navigate('Home')}>
              <Text style={styles.btnTxt}> Entrar </Text>
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
    topo: {
      backgroundColor: "#212240",
      height: 80,
      width: "100%",
    },
    logo: {
      paddingTop: 50
    },
    img:{
      width: 100, 
      height: 100,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
      paddingTop: 50,
      paddingBottom: 50,
    },
    button: {
      flex: 1,
      marginHorizontal: 5,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 5,
      backgroundColor: '#dcdfe1',
    },
    buttonSelected: {
      backgroundColor: '#212240',
    },
    buttonText: {
      color: '#000',
      fontSize: 16,
    },
    buttonTextSelected: {
      color: '#fff',
    },
    containerLogin:{
      backgroundColor: "#212240",
      width: 200,
      height: 200,
      borderRadius: 20,
      alignItems: 'center'
    },
    btnLogin:{
        backgroundColor: "#00923F",
        width: 80,
        height: 50,
        top: 80,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt:{
        color: "#fff"
    }
  });



