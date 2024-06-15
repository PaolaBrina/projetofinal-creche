import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default function Login({navigation}) {
    return (
      <View style={styles.container}>
        <View style={styles.containerProfessor}>
          
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
      backgroundColor: '#c3c3c3',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerProfessor:{
      backgroundColor: "#52796F",
      width: 300,
      height: 200,
      borderRadius: 20,
      alignItems: 'center'
    },
    btnLogin:{
        backgroundColor: "#354F52",
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