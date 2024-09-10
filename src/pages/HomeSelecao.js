import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function HomeSelecao({ route, navigation }) {
  const { data } = route.params; // pega os dados do login
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
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
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