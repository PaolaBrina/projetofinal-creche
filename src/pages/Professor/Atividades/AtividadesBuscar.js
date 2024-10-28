import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Alert,KeyboardAvoidingView } from 'react-native';
import { api } from '../../../api/api';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AtividadesProfBuscar({closeModal}) {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([{label: "",value: ""}]);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
    

  const fetchAtividades = async () => {
    setLoading(true); 
    try {
        const response = await api.get('/atividades'); 
        console.log('Resposta completa:', response);
        if (Array.isArray(response.data)) {
            setAtividades(response.data.atividades); 
        } else if (response.data && response.data.atividades) {
            setAtividades(response.data.atividades); 
        } else {
            console.error('Formato inesperado dos dados:', response.data);
            Alert.alert('Erro', 'Formato inesperado dos dados recebidos.');
        }
    } catch (error) {
        console.error('Erro ao buscar atividades:', error);
        Alert.alert('Erro', 'Erro ao buscar atividades, veja o console para mais detalhes.');
    } finally {
        setLoading(false); 
    }
    };

    async function fetchTurma() {
      try {
          const response = await api.get('/turma');
          
          // Mapeando os dados existentes e convertendo para o formato necessário
          const formattedData = response.data.map(item => ({
              label: item.nome,
              value: item.codigo.toString()
          }));
  
          // Obtendo o último código numérico e incrementando para os novos valores
          const ultimoCodigo = Math.max(...response.data.map(item => parseInt(item.codigo))) || 0;
  
          // Adicionando as opções extras
          formattedData.push(
              { label: 'Atividades Concluídas', value: (ultimoCodigo + 1).toString() },
              { label: 'Atividades Pendentes', value: (ultimoCodigo + 2).toString() }
          );
          setSelected(formattedData);
      } catch (error) {
          console.log(error);
      }
  }
  
    
      
    useEffect(() => {
      fetchAtividades();
      fetchTurma();
    }, []);
    
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Dropdown label
          </Text>
        );
      }
      return null;
    };

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
          <ScrollView contentContainerStyle={styles.scrollView}>
                  <View style={styles.topBar}>
                      <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeColaborador')}>
                          <AntDesign name="caretleft" size={30} color="white"/>
                      </TouchableOpacity>
                      <Text style={styles.topBarTxt}>Cadastro Aluno</Text>
                  </View>

          
          <View style={styles.viewbutton}>
          <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Buscar Atividades por turma</Text>
         </TouchableOpacity>

          <TouchableOpacity style={styles.button} >
              <Text style={styles.buttonText}>Atividades Pendentes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Atividades Concluidas</Text>
          </TouchableOpacity>
                <View style={styles.container}>
                {renderLabel()}
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  search
                  data={selected}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Selecione item' : '...'}
                  searchPlaceholder="Procurar..."
                  value={selected}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setSelected(item);
                        setIsFocus(false);
                    }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color="black"
                      name="Safety"
                      size={20}
                    />
                  )}
                  selectedStyle={styles.selectedStyle}
                />
              </View>

          </View>

          {/* {loading ? (
              <Text>Carregando...</Text>
          ) : (
              alunos.length > 0 ? (
                  <FlatList
                      data={alunos}
                      keyExtractor={(item) => item.codigo.toString()} 
                      renderItem={({ item }) => (
                          <View style={styles.alunoItem}>
                              <Text style={styles.alunoText}>Nome: {item.nome}</Text>
                              <Text style={styles.alunoText}>Data de Nascimento: {item.datanascimento}</Text>
                              <Text style={styles.alunoText}>Sexo: {item.sexo}</Text>
                              <Text style={styles.alunoText}>Endereço: {item.endereco}</Text>
                              <Text style={styles.alunoText}>Status: {item.status}</Text>
                          </View>
                      )}
                  />
              ) : (
                 <Text></Text>
              )
          )} */}
          
          </ScrollView>
      </KeyboardAvoidingView>
  );
};
  
  const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
      height: 50,
      backgroundColor: 'transparent',
      borderBottomColor: 'gray',
      borderBottomWidth: 0.5,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    selectedStyle: {
      borderRadius: 12,
      
    },
    scrollView: {
      flexGrow: 1,
      justifyContent: 'center',
  },  
  form: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
  },
  inputGroup: {
      marginBottom: 15,
  },
  label: {
      fontSize: 16,
      color: '#333',
      marginBottom: 5,
  },
  input: {
      width: '100%',
      height: 45,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      backgroundColor: '#fafafa',
  },
  btnLogin: {
      backgroundColor: '#FFEF95',
      width: '100%',
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
  },
  btnTxt: {
      color: '#000',
      fontSize: 16,
      fontWeight: 'bold',
  },
  });