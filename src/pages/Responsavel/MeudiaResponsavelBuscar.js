import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavelBuscar({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const { codigo } = route.params || {};

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchMeudiaManha = async () => {
    setManhaItems([]); // Limpar os dados anteriores
  
    try {
      // Fazendo uma chamada à API sem filtro de data
      const response = await api.get(`/meudiamanha/${codigo}`);
      const { data } = response.data;
  
      if (data?.message === 'Nenhum dado encontrado.') {
        console.log('Nenhum dado retornado para a manhã');
        setManhaItems([]);
      } else if (Array.isArray(data)) {
        setManhaItems(data); // Atualiza o estado com os cadastros retornados
      } else {
        console.log('Estrutura de dados inesperada para a manhã', response.data);
        setManhaItems([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da manhã:', error);
      setManhaItems([]); // Garante que o estado seja resetado em caso de erro
    }
  };
  

  useEffect(() => {
    fetchMeudiaManha();
  }, []);

  const getMensagemComEmoji = (campo) => {
    switch (campo) {
      case 'comeu bem':
        return 'Comeu bem 😋';
      case 'comeu pouco':
        return 'Comeu pouco 🍴';
      case 'nao comeu':
        return 'Não comeu 😕';
      default:
        return campo || 'Nenhum registro';
    }
  };

  const renderContent = () => (
    <>
      {manhaItems.length > 0 ? (
        manhaItems.map((item, index) => (
          <View key={index} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.codaluno}</Text>
              <Text style={styles.dateTimeText}>
                {new Date(item.datahora).toLocaleDateString('pt-BR')}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.itemTitle}>Recado:</Text>
              <Text style={styles.itemText}>{item.recado || 'Nenhum'}</Text>
            </View>
            <View style={styles.rowInline}>
              <View style={styles.inlineContainer}>
                <Text style={styles.itemTitle}>Xixi:</Text>
                <Text style={styles.itemText}>
                  {item.xixi === 'sim' ? '✔️ Fez xixi' : '❌ Não fez xixi'}
                </Text>
              </View>

              <View style={styles.inlineContainer}>
                <Text style={styles.itemTitle}>Cocô:</Text>
                <Text style={styles.itemText}>
                  {item.coco === 'sim' ? '✔️ Fez cocô' : '❌ Não fez cocô'}
                </Text>
              </View>

              <View style={styles.inlineContainer}>
                <Text style={styles.itemTitle}>Sono:</Text>
                <Text style={styles.itemText}>
                  {item.sono === 'sim' ? '✔️ Dormiu' : '❌ Não dormiu'}
                </Text>
              </View>
            </View>

            <View style={styles.rowInline}>
              <View style={styles.inlineContainer}>
                <Text style={styles.itemTitle}>Café da Manhã:</Text>
                <Text style={styles.itemText}>
                  {getMensagemComEmoji(item.cafemanha)}
                </Text>
              </View>
              <View style={styles.inlineContainer}>
                <Text style={styles.itemTitle}>Almoço:</Text>
                <Text style={styles.itemText}>
                  {getMensagemComEmoji(item.almoco)}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <Text style={styles.itemTitle}>Saúde:</Text>
              <Text style={styles.itemText}>{item.saude || 'Nenhum registro'}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.itemTitle}>Medicação:</Text>
              <Text style={styles.itemText}>{item.medicacao || 'Nenhuma'}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.placeholderText}>
          Nenhum registro encontrado para a manhã.
        </Text>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.btnseta}
          onPress={() => navigation.navigate('HomeResponsavel', { codigo })}
        >
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, styles.activeTab, { borderBottomColor: '#f0f0f0', borderBottomWidth: 3 }]}
          onPress={() => navigation.navigate('MeudiaResponsavel', { codigo })}
        >
          <Text style={[styles.tabText, { color: '#aaa', fontWeight: 'bold' }]}>Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, { borderBottomColor: '#283673', borderBottomWidth: 3 }]}
          onPress={() => navigation.navigate('MeudiaResponsavelBuscar', { codigo })}
        >
          <Text style={[styles.tabText, { color: '#283673' }]}>Procurar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>{renderContent()}</ScrollView>
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
    justifyContent: 'space-between',
    width: '100%',
    padding: 7.5,
    paddingTop: 45,
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
    padding: 5,
  },
  tabsContainer: {
    flexDirection: 'row',
    height: 50,
    backgroundColor: '#ffffff',
    elevation: 4,
    marginHorizontal: 10,
    borderRadius: 8,
    marginTop: 20, // Espaço entre a TopBar e os botões
    marginBottom: 15, // Espaço entre os botões e o restante do conteúdo
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
  tabText: {
    fontSize: 14,
  },
  content: {
    padding: 10,
  },
  card: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    borderColor: '#e0e0e0',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E3A8A',
  },
  dateTimeText: {
    fontSize: 12,
    color: '#6b7280',
    fontStyle: 'italic',
  },
  row: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  rowInline: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Espaça igualmente os itens
    marginVertical: 5, // Espaçamento vertical
  },
  inlineContainer: {
    flex: 1, // Garante que cada item ocupe espaço igual
    alignItems: 'center', // Centraliza o texto horizontalmente
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E3A8A',
    textAlign: 'center', // Centraliza o título dentro do contêiner
  },
  itemText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center', // Centraliza o texto dentro do contêiner
  },  
  placeholderText: {
    textAlign: 'center',
    color: '#999',
  },
});
