import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default function HomeProfessor({navigation}) {

  const handleMeudia = () => {
    navigation.navigate('MeudiaProfessor');
  }




    return (
      <View style={styles.container}>
            <Text style={styles.btnTxt}> Professor </Text>
            <View>
            <TouchableOpacity style={styles.containermeudia}  onPress={handleMeudia}>
              <Text>Meu dia na creche</Text>
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
    containermeudia:{
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