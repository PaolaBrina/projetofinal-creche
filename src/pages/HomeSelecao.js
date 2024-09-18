import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

export default function HomeSelecao({ route, navigation }) {
  const { data } = route.params; 
  const [botao, setBotao] = useState([]);

  useEffect(() => {
    if (data) {
      const novoBotao = [];

      if (data.includes('professor')) {
        novoBotao.push({ 
            name: 'Professor', 
            route: 'HomeProfessor' 
        });
      }
      if (data.includes('colaborador')) {
        novoBotao.push({ 
            name: 'Colaborador', 
            route: 'HomeColaborador' 
        });
      }
      if (data.includes('responsavel')) {
        novoBotao.push({ 
            name: 'Responsável', 
            route: 'HomeResponsavel' 
        });
      }

      setBotao(novoBotao);
    }
  }, [data]);

  return (
    
    <View style={styles.container}>
      <View style={styles.topo}>
          <Text style={styles.topoTxt}></Text>
    </View>

    <View style={styles.viewTxt}>
          <Text style={styles.txt}>Selecione seu login:</Text>
    </View>

      {botao.length === 0 ? (
        <Text style={styles.noOptions}>Nenhuma opção disponível.</Text>
      ) : (
        botao.map((button, index) => (
          <TouchableOpacity
            key={index}
            style={styles.btn}
            onPress={() => navigation.navigate(button.route)}
          >
            <Text style={styles.btnText}>{button.name}</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  topo: {
    backgroundColor: "#283673",
    height: 80,
    width: "100%",
    alignContent: 'center'
  },
  viewImg: {
    paddingTop: 50
  },
  img:{
    width: 100, 
    height: 100,
  },
  viewTxt: {
    height: 150,
    width: "70%",
    alignContent: 'center',
  },
  txt: {
    paddingTop: 50,
    fontSize: 20,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#283673',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    width: 200,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
  },
  noOptions: {
    fontSize: 18,
    color: '#333',
  },
});