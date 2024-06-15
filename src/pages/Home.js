import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


export default function Home({navigation}) {
    return (
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btnLogin:{
        color: "#52796F",
        width: 100,
        height: 100
    },
    btnTxt:{
        color: "#fff"
    }
  });