import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';

export default function HomeColaborador({navigation}) {
  
  return(
  <View style={styles.container}>
  <View style={styles.topBar}>
    <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
  </View>


  <View style={styles.buttonsContainer}>
    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AlunoCadastro')}>
      <Text style={styles.buttonText}>Cadastro Aluno</Text>
    </TouchableOpacity>

    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ResponsavelCadastro')}>
        <Text style={styles.buttonText}>Cadastro Responsável</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProfessorCadastro')}>
        <Text style={styles.buttonText}>Cadastro Professor</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TurmaCadastro')}>
        <Text style={styles.buttonText}>Cadastro Turmas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastro Horários</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.row}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Avisos</Text>
    </TouchableOpacity>

    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Calendário</Text>
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
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      paddingTop: 50,
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