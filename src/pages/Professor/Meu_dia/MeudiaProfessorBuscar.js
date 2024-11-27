import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AuthContext } from '../../AuthContext';
import { api } from '../../../api/api';

export default function MeudiaProfessorBuscar({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { codigo } = route.params || {}; // O código do professor já vem do parâmetro

  const fetchMeudiaManha = useCallback(async () => {
    if (!codigo) {
      Alert.alert('Erro', 'Código do professor não encontrado.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Passando o código do professor como parâmetro na URL
      const response = await api.get(`/meudiamanha?codprofessor=${codigo}`);
      
      if (response.status === 200 && response.data.meudiamanha.length > 0) {
        const registrosComNomes = await Promise.all(
          response.data.meudiamanha.map(async (aluno) => {
            // Buscando nome do aluno
            const nome = await fetchNomeAluno(aluno.codaluno); // Obtendo o nome correto
            return { ...aluno, nome };
          })
        );
        setData(registrosComNomes);
      } else {
        Alert.alert('Aviso', 'Nenhum registro encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível buscar os dados.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [codigo]);
  
  const fetchNomeAluno = useCallback(async (codaluno) => {
    try {
      // Alterando para garantir que o código do aluno seja passado corretamente
      const response = await api.get(`/api/aluno/${codaluno}`);
      if (response.status === 200 && response.data) {
        return response.data.nome || 'Nome não encontrado';
      }
      return 'Nome não encontrado';
    } catch (error) {
      console.error('Erro ao buscar nome do aluno:', error);
      return 'Erro ao buscar';
    }
  }, []);  
  

  useEffect(() => {
    fetchMeudiaManha();
  }, [fetchMeudiaManha]);  // Dependência para evitar chamadas desnecessárias

  const getMensagemComEmoji = useCallback((campo) => {
    const emojis = {
      'comeu bem': '😋',
      'comeu pouco': '🍴',
      'não comeu': '😕',
    };
    return `${campo} ${emojis[campo] || ''}`;
  }, []);

  const getEmojiForStatus = useCallback((status, tipo) => {
    const normalizedStatus = (status && typeof status === 'string' ? status.trim().toLowerCase() : 'nao');
    const statusMap = {
      sim: { xixi: 'Fez xixi ✔️', coco: 'Fez cocô ✔️', sono: 'Dormiu ✔️' },
      nao: { xixi: 'Não fez xixi ❌', coco: 'Não fez cocô ❌', sono: 'Não dormiu ❌' },
    };
  
    const defaultStatus = { xixi: 'Status de xixi não informado ❓', coco: 'Status de cocô não informado ❓', sono: 'Status de sono não informado ❓' };
  
    return `${statusMap[normalizedStatus]?.[tipo] || defaultStatus[tipo]}`;
  }, []);
  

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-BR', options);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>{item.nome}</Text>
        <Text style={styles.dateHora}>{formatDate(item.datahora)}</Text>
      </View>

      <Text style={styles.label}>Recado:</Text>
      <Text>{item.recado}</Text>

      <View style={styles.row}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Xixi:</Text>
          <Text>{getEmojiForStatus(item.xixi, 'xixi')}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Cocô:</Text>
          <Text>{getEmojiForStatus(item.coco, 'coco')}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Sono:</Text>
          <Text>{getEmojiForStatus(item.sono, 'sono')}</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Café da Manhã:</Text>
          <Text>{getMensagemComEmoji(item.cafemanha)}</Text>
        </View>
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Almoço:</Text>
          <Text>{getMensagemComEmoji(item.almoco)}</Text>
        </View>
      </View>

      <Text style={styles.label}>Saúde:</Text>
      <Text>{item.saude}</Text>

      <Text style={styles.label}>Medicação:</Text>
      <Text>{item.medicacao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeProfessor', { codigo })}>
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

      <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        styles.activeTab,
                        { borderBottomColor: '#f0f0f0', borderBottomWidth: 3 }, // Aba ativa
                    ]}
                    onPress={() => navigation.navigate('MeudiaProfessor', { codigo })}
                >
                    <Text style={[styles.tabText, { color: '#aaa', fontWeight: 'bold' }]}>Cadastro</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        { borderBottomColor: '#283673', borderBottomWidth: 3 }, // Aba inativa
                    ]}
                    onPress={() => navigation.navigate('MeudiaProfessorBuscar', { codigo })}
                >
                    <Text style={[styles.tabText, { color: '#283673' }]}>Procurar</Text>
                </TouchableOpacity>
            </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.codigo.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registro encontrado.</Text>}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 50,
    backgroundColor: '#283673',
  },
  topBarTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  btnseta: {
    width: 30,
    height: 30,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 20,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderBottomColor: '#283673',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    flex: 1,
  },
  dateHora: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'right',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#283673',
    marginTop: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoBlock: {
    flex: 1,
    marginHorizontal: 5,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#aaa',
  },
});
