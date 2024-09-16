import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default function HomeColaborador({navigation}) {
  const handleMeudia = () => {
    navigation.navigate('MeudiaProfessor');
  }
  return(
  <View style={styles.container}>
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

  
  <View style={styles.centerImageContainer}>
    <Image 
      source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Logo_distrito_Federal_Brasil.png/800px-Logo_distrito_Federal_Brasil.png'}} 
      style={styles.centerImage}
    />
  </View>


  <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.button}  onPress={handleMeudia}>
      <Text style={styles.buttonText}>Meu dia na creche</Text>
    </TouchableOpacity>

    <View style={styles.row}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Calendário</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Atividades</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Fotos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Lista de Materiais</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Chamadas</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Horários</Text>
    </TouchableOpacity>
    </View>

  </View>
</View>
);
};
  
 
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 50,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      backgroundColor: '#000080',
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
    centerImageContainer: {
      marginVertical: 20,
    },
    centerImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
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