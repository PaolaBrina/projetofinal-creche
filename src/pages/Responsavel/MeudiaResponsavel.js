import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';
import axios from 'axios';

export default function MeudiaResponsavel({navigation}) {

    const Meudiatarde = async () => {
        try{
        const response = await axios.get('http://localhost:3000/meudiatarde');
        const data = response.data; 
        console.log(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
    }
      



    return (
      <View style={styles.container}>
      <View style={styles.topo}>
      <Text style={styles.topotext}> dados cadastrais</Text>
        <View> <Text >  foto filho</Text></View>
        <View> <Text >  suporte</Text></View>
        <View> <Text >  notificaçoes</Text></View>
        </View> 
            <View>
            <TouchableOpacity style={styles.containermeudia}  onPress={Meudiamanha}>
              <Text>Visualizar Manha</Text>
              </TouchableOpacity>
            <TouchableOpacity style={styles.containermeudia}  onPress={Meudiatarde}>
              <Text>Visualizar Tarde</Text>
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
    topo: {
      backgroundColor: "#212240",
      height: 80,
      width: "100%",
      alignItems: 'flex-start'
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