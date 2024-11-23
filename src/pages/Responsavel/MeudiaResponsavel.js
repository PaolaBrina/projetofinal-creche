import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Hoje'); // Estado para controlar a aba ativa
  const { codigo } = route.params || {};

  const fetchMeudiaManha = async () => {
    try {
      const response = await api.get(`/meudiamanha/${codigo}`);
      const { data } = response.data;
  
      // Acessar a propriedade data aninhada
      if (Array.isArray(data?.data)) {
        setManhaItems(data.data);
      } else {
        console.warn('Estrutura de dados inesperada para a manhã', response.data);
        setManhaItems([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da manhã:', error);
      setManhaItems([]);
    }
  };
  
  const fetchMeudiaTarde = async () => {
    try {
      const response = await api.get(`/meudiatarde/${codigo}`);
      const { data } = response.data;
  
      // Acessar a propriedade data aninhada
      if (Array.isArray(data?.data)) {
        setTardeItems(data.data);
      } else {
        console.warn('Estrutura de dados inesperada para a tarde', response.data);
        setTardeItems([]);
      }
    } catch (error) {
      console.error('Erro ao buscar dados da tarde:', error);
      setTardeItems([]);
    }
  };
  
  
  

  useEffect(() => {
    fetchMeudiaManha();
    fetchMeudiaTarde();
  }, []);

  // Função para renderizar os dados de acordo com a aba selecionada
  const renderContent = () => {
    if (activeTab === 'Hoje') {
      return (
        <>
          <Text style={styles.sectionTitle}>Meu Dia - Manhã</Text>
          {manhaItems.map((item, index) => (
            <View key={index} style={styles.card}>
                <View style={styles.row}>
                <Text style={styles.itemText}>codaluno: {item.codaluno}</Text>
                <Text style={styles.itemText}>codturma: {item.codturma}</Text>
                <Text style={styles.itemText}>codprofessor: {item.codprofessor}</Text>
                <Text style={styles.itemText}>datahora: {item.datahora}</Text>
                <Text style={styles.itemText}>recado: {item.recado}</Text>
                <Text style={styles.itemText}>xixi: {item.xixi}</Text>
                <Text style={styles.itemText}>Coco: {item.coco}</Text>
                <Text style={styles.itemText}>sono: {item.sono}</Text>
                <Text style={styles.itemText}>saude: {item.saude}</Text>
                <Text style={styles.itemText}>medicacao: {item.medicacao}</Text>
                <Text style={styles.itemText}>cafemanha: {item.cafemanha}</Text>
                <Text style={styles.itemText}>almoco: {item.almoco}</Text>
              </View>
              {/* Outras informações semelhantes */}
            </View>
          ))}

          <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
          {tardeItems.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.itemText}>codaluno: {item.codaluno}</Text>
                <Text style={styles.itemText}>codturma: {item.codturma}</Text>
                <Text style={styles.itemText}>codprofessor: {item.codprofessor}</Text>
                <Text style={styles.itemText}>datahora: {item.datahora}</Text>
                <Text style={styles.itemText}>recado: {item.recado}</Text>
                <Text style={styles.itemText}>xixi: {item.xixi}</Text>
                <Text style={styles.itemText}>Coco: {item.coco}</Text>
                <Text style={styles.itemText}>sono: {item.sono}</Text>
                <Text style={styles.itemText}>saude: {item.saude}</Text>
                <Text style={styles.itemText}>medicacao: {item.medicacao}</Text>
                <Text style={styles.itemText}>cafetarde: {item.cafetarde}</Text>
                <Text style={styles.itemText}>janta: {item.janta}</Text>
              </View>
             
            </View>
          ))}
        </>
      );
    }

    // Conteúdo fictício para as abas "Essa Semana" e "Esse Mês"
    return (
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>Conteúdo de {activeTab} ainda não disponível.</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.btnseta}
          onPress={() => navigation.navigate('HomeResponsavel', { codigo })}
        >
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

      {/* Barra de Abas */}
      <View style={styles.tabContainer}>
        <Text
          style={[styles.tab, activeTab === 'Hoje' && styles.activeTab]}
          onPress={() => setActiveTab('Hoje')}
        >
          Hoje
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Essa Semana' && styles.activeTab]}
          onPress={() => setActiveTab('Essa Semana')}
        >
          Essa Semana
        </Text>
        <Text
          style={[styles.tab, activeTab === 'Esse Mês' && styles.activeTab]}
          onPress={() => setActiveTab('Esse Mês')}
        >
          Esse Mês
        </Text>
      </View>

      {/* Conteúdo Dinâmico */}
      <ScrollView style={styles.scrollContainer}>{renderContent()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 7.5, // Diminuído de 10 para 7.5 para reduzir o padding geral
    paddingTop: 45, // Diminuído de 60 para 45 para reduzir a altura
    backgroundColor: '#283673',
  },
  btnseta: {
    padding: 5,
  },
  topBarTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#e5e7eb',
    paddingVertical: 10,
    marginTop: 20,
    paddingVertical: 14, // Aumentado de 10 para 11 para aumentar em 10%
  },
  tab: {
    fontSize: 14,
    color: '#6b7280',
  },
  activeTab: {
    color: '#1E3A8A',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#1E3A8A',
  },
  scrollContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  card: {
    backgroundColor: '#e0e7ff',
    margin: 15,
    padding: 20, // Aumentando o padding para que o conteúdo tenha mais espaço
    borderRadius: 10,
    maxWidth: '95%', // Garantir que o card não ocupe toda a largura da tela
  },
  row: {
    flexDirection: 'column', // Alterando para coluna para melhorar a organização
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16, // Aumentando o tamanho da fonte para melhorar a legibilidade
    marginBottom: 5, // Adicionando espaço entre os itens
    color: '#333', // Cor mais escura para melhor contraste
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginVertical: 5,
  },
  section: {
    marginVertical: 5,
  },
  placeholder: {
    margin: 15,
    padding: 20,
    backgroundColor: '#e0e7ff',
    borderRadius: 10,
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#6b7280',
  },
});




/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View, TouchableOpacity,ScrollView } from 'react-native';
import { api } from '../../api/api';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);

  const { codigo } = route.params || {};

  // Fetch para "Meu Dia - Manhã"
  const fetchMeudiaManha = async () => {
    try {
      const response = await api.get(`/meudiamanha/${codigo}`);
      const data = response.data.data;
      console.log('Dados da manhã:', data);
      setManhaItems(data || []);
    } catch (error) {
      console.error('Erro ao buscar dados da manhã:', error);
    }
  };

  // Fetch para "Meu Dia - Tarde"
  const fetchMeudiaTarde = async () => {
    try {
      const response = await api.get(`/meudiatarde/${codigo}`);
      const data = response.data.data;
      console.log('Dados da tarde:', data);
      setTardeItems(data || []);
    } catch (error) {
      console.error('Erro ao buscar dados da tarde:', error);
    }
  };

  // Chamada para buscar os dados ao montar o componente
  useEffect(() => {
    fetchMeudiaManha();
    fetchMeudiaTarde();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeResponsavel', { codigo })}>
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

      <Text style={styles.sectionTitle}>Meu Dia - Manhã</Text>
      <FlatList
        data={manhaItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Aluno: {item.codaluno}</Text>
            <Text style={styles.itemText}>Turma: {item.codturma}</Text>
            <Text style={styles.itemText}>Professor: {item.codprofessor}</Text>
            <Text style={styles.itemText}>Detalhes: {item.detalhes}</Text>
          </View>
        )}
      />


      <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
      <FlatList
        data={tardeItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Aluno: {item.codaluno}</Text>
            <Text style={styles.itemText}>Turma: {item.codturma}</Text>
            <Text style={styles.itemText}>Professor: {item.codprofessor}</Text>
            <Text style={styles.itemText}>Detalhes: {item.detalhes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#283673',
    marginBottom: 30,
  },
  btnseta: {
    padding: 5,
  },
  topBarTxt: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 10,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    marginHorizontal: 10,
  },
  itemText: {
    fontSize: 16,
  },
}); */
/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View,TouchableOpacity } from 'react-native';
import { api } from '../../api/api';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({navigation}) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);

  const { codigo } = route.params || {};

   const Meudiamanha = async () => {
    try {
      const response = await api.get('/meudiamanha');
      const data = response.data.meudiamanha;
      console.log(data)
      setManhaItems(data); // Armazena os dados da manhã no estado
    } catch (error) {
      console.error('Error fetching data from meudiamanha:', error);
    }
  };


    const Meudiatarde = async () => {
        try{
          const response = await api.get('/meudiatarde');
        const data = response.data.meudiatarde;
        console.log(data)
        setTardeItems(data); 
    } catch (error) {
        console.error('Error fetching data:', error);
    } 
    }
      
    useEffect(() => {
      Meudiamanha();
      Meudiatarde();
    }, []);


    return (
      <View style={styles.container}>
      <View style={styles.topBar}>
            <TouchableOpacity style={styles.btnseta} onPress={() => navigation.navigate('HomeResponsavel', { codigo })}>
                <AntDesign name="caretleft" size={30} color="white" />
            </TouchableOpacity>
            <Text style={styles.topBarTxt}>Meu Dia</Text>
        </View>

      
        <Text style={styles.sectionTitle}>Meu Dia - Manhã</Text>
        <FlatList
          data={manhaItems}
          keyExtractor={(item) => item.codigo.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>codaluno: {item.codaluno}</Text>
              <Text style={styles.itemText}>codturma: {item.codturma}</Text>
              <Text style={styles.itemText}>codprofessor: {item.codprofessor}</Text>
              <Text style={styles.itemText}>datahora: {item.datahora}</Text>
              <Text style={styles.itemText}>recado: {item.recado}</Text>
              <Text style={styles.itemText}>xixi: {item.xixi}</Text>
              <Text style={styles.itemText}>Coco: {item.coco}</Text>
              <Text style={styles.itemText}>sono: {item.sono}</Text>
              <Text style={styles.itemText}>saude: {item.saude}</Text>
              <Text style={styles.itemText}>medicacao: {item.medicacao}</Text>
              <Text style={styles.itemText}>cafemanha: {item.cafemanha}</Text>
              <Text style={styles.itemText}>almoco: {item.almoco}</Text>
            </View>
          )}
        />
  
        <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
        <FlatList
          data={tardeItems}
          keyExtractor={(item) => item.codigo.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>codaluno: {item.codaluno}</Text>
              <Text style={styles.itemText}>codturma: {item.codturma}</Text>
              <Text style={styles.itemText}>codprofessor: {item.codprofessor}</Text>
              <Text style={styles.itemText}>datahora: {item.datahora}</Text>
              <Text style={styles.itemText}>recado: {item.recado}</Text>
              <Text style={styles.itemText}>xixi: {item.xixi}</Text>
              <Text style={styles.itemText}>Coco: {item.coco}</Text>
              <Text style={styles.itemText}>sono: {item.sono}</Text>
              <Text style={styles.itemText}>saude: {item.saude}</Text>
              <Text style={styles.itemText}>medicacao: {item.medicacao}</Text>
              <Text style={styles.itemText}>cafetarde: {item.cafetarde}</Text>
              <Text style={styles.itemText}>janta: {item.janta}</Text>
            </View>
          )}
        />
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      padding: 10,
      backgroundColor: '#283673',
      marginBottom: 30,
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
    sectionTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginVertical: 10,
    },
    itemContainer: {
      padding: 10,
      backgroundColor: '#fff',
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
    },
    itemText: {
      fontSize: 16,
    },
  }); */