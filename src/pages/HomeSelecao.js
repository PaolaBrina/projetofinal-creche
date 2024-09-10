import { StyleSheet, Text, TextInput, View, TouchableOpacity} from 'react-native';


export default function HomeSelecao({navigation}) {
    return (
      <View style={styles.container}>
            <Text style={styles.btnTxt}> Selecione </Text>
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

/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HomeSelecao({ navigation }) {
    const [tipos, setTipos] = useState([]);

    useEffect(() => {
        const telefone = '';  
        axios.post('http://localhost:3000/login', { telefone })
            .then(response => {
                if (response.data.status === 'multi') {
                    setTipos(response.data.tipos);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const navigateToHome = (tipo) => {
        switch (tipo) {
            case 'professor':
                navigation.navigate('HomeProfessor');
                break;
            case 'responsavel':
                navigation.navigate('HomeResponsavel');
                break;
            case 'colaborador':
                navigation.navigate('HomeColaborador');
                break;
            default:
                break;
        }
    };

    return (
        <View style={styles.container}>
            {tipos.length === 0 ? (
                <Text>Nenhum tipo de usuário encontrado.</Text>
            ) : (
                tipos.map(tipo => (
                    <TouchableOpacity
                        key={tipo}
                        style={styles.btnLogin}
                        onPress={() => navigateToHome(tipo)}
                    >
                        <Text style={styles.btnTxt}>{tipo.charAt(0).toUpperCase() + tipo.slice(1)}</Text>
                    </TouchableOpacity>
                ))
            )}
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
    btnLogin: {
        backgroundColor: "#354F52",
        width: 200,
        height: 50,
        margin: 10,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        color: "#fff",
        fontSize: 18,
    },
});
 */