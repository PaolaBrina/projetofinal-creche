import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Hoje'); // Estado para controlar a aba ativa
  const [selectedDay, setSelectedDay] = useState(null); // Estado para o dia selecionado na aba "Essa Semana"
  const { codigo } = route.params || {};  // Obtendo o código da rota

  // Função para obter a data atual no formato yyyy-mm-dd
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Função para formatar a data e obter o nome do dia da semana
  const getWeekDays = () => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const currentDay = new Date();
    let weekDays = [];

    for (let i = 0; i < 7; i++) {
      let day = new Date(currentDay);
      day.setDate(currentDay.getDate() - currentDay.getDay() + i); // Ajusta a data para o dia da semana
      weekDays.push({
        dayName: daysOfWeek[i],
        date: day.toISOString().split('T')[0], // Formata a data como yyyy-mm-dd
      });
    }
    return weekDays;
  };

   // Função para buscar os dados da manhã
   const fetchMeudiaManha = async () => {
    setManhaItems([]); // Limpa o estado antes de fazer a nova busca
    try {
      const response = await api.get(`/meudiamanha/${codigo}`);
      const { data } = response.data;  // Acessando a chave 'data' corretamente
    
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a manhã");
        setManhaItems([]);
      } else if (Array.isArray(data)) {  // Verifica se 'data' é um array
        setManhaItems(data);  // Atualiza o estado com os dados da manhã
      } else {
        console.log("Estrutura de dados inesperada para a manhã", response.data);
        setManhaItems([]);  // Se a estrutura for inesperada, limpa o estado
      }
    } catch (error) {
      console.error("Erro ao buscar dados da manhã:", error);
      setManhaItems([]);  // Limpa os dados em caso de erro
    }
  };

  // Função para buscar os dados da tarde
  const fetchMeudiaTarde = async () => {
    try {
      const response = await api.get(`/meudiatarde/${codigo}`);
      const { data } = response.data;  // Acessando a chave 'data' corretamente
    
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a tarde");
        setTardeItems([]);
      } else if (Array.isArray(data)) {  // Verifica se 'data' é um array
        setTardeItems(data);  // Atualiza o estado com os dados da tarde
      } else {
        console.log("Estrutura de dados inesperada para a tarde", response.data);
        setTardeItems([]);  // Se a estrutura for inesperada, limpa o estado
      }
    } catch (error) {
      console.error("Erro ao buscar dados da tarde:", error);
      setTardeItems([]);  // Limpa os dados em caso de erro
    }
  };

  // Chama as funções de fetch quando o componente é montado
  useEffect(() => {
    fetchMeudiaManha();
    fetchMeudiaTarde();
  }, []);

  // Função para renderizar o conteúdo da aba "Hoje"
  const renderContentHoje = () => {
    return (
      <>
        <Text style={styles.sectionTitle}>Meu Dia - Manhã</Text>
        {manhaItems.length > 0 ? (
          manhaItems.map((item, index) => (
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
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>Nenhum registro encontrado para a manhã.</Text>
        )}

        <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
        {tardeItems.length > 0 ? (
          tardeItems.map((item, index) => (
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
          ))
        ) : (
          <Text style={styles.placeholderText}>Nenhum registro encontrado para a tarde.</Text>
        )}
      </>
    );
  };

  // Função para renderizar a aba "Essa Semana"
  const renderContentSemana = () => {
    const weekDays = getWeekDays();

    return (
      <View>
        {weekDays.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dayButton}
            onPress={() => setSelectedDay(day.date)}
          >
            <Text style={styles.dayText}>{day.dayName}</Text>
            <Text style={styles.dateText}>{day.date}</Text>
          </TouchableOpacity>
        ))}

     
        {selectedDay && (
          <View style={styles.dayDetails}>
            <TouchableOpacity onPress={() => {
              fetchMeudiaManha(selectedDay);
              fetchMeudiaTarde(selectedDay);
            }}>
              <Text style={styles.dayDetailText}>Meu Dia - Manhã</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              fetchMeudiaManha(selectedDay);
              fetchMeudiaTarde(selectedDay);
            }}>
              <Text style={styles.dayDetailText}>Meu Dia - Tarde</Text>
            </TouchableOpacity>
            {renderContentHoje()}
          </View>
        )}
      </View>
    );
  };

  const renderContent = () => {
    if (activeTab === 'Hoje') return renderContentHoje();
    if (activeTab === 'Essa Semana') return renderContentSemana();
    if (activeTab === 'Esse Mês') {
      return (
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Conteúdo de {activeTab} ainda não disponível.
          </Text>
        </View>
      );
    }
  };

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

      
       <ScrollView contentContainerStyle={styles.content}>{renderContent()}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
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
    fontSize: 20,
    color: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
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
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  row: {
    flexDirection: 'column',
  },
  itemText: {
    fontSize: 14,
    marginBottom: 5,
  },
  dayButton: {
    padding: 10,
    backgroundColor: '#ddd',
    marginVertical: 5,
    borderRadius: 5,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  dayDetails: {
    marginTop: 10,
  },
  dayDetailText: {
    fontSize: 16,
    color: '#3498db',
    marginVertical: 5,
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
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Hoje'); // Estado para controlar a aba ativa
  const { codigo } = route.params || {};  // Obtendo o código da rota

  // Função para buscar os dados da manhã
  const fetchMeudiaManha = async () => {
    setManhaItems([]); // Limpa o estado antes de fazer a nova busca
    try {
      const response = await api.get(`/meudiamanha/${codigo}`);
      const { data } = response.data;  // Acessando a chave 'data' corretamente
    
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a manhã");
        setManhaItems([]);
      } else if (Array.isArray(data)) {  // Verifica se 'data' é um array
        setManhaItems(data);  // Atualiza o estado com os dados da manhã
      } else {
        console.log("Estrutura de dados inesperada para a manhã", response.data);
        setManhaItems([]);  // Se a estrutura for inesperada, limpa o estado
      }
    } catch (error) {
      console.error("Erro ao buscar dados da manhã:", error);
      setManhaItems([]);  // Limpa os dados em caso de erro
    }
  };

  // Função para buscar os dados da tarde
  const fetchMeudiaTarde = async () => {
    try {
      const response = await api.get(`/meudiatarde/${codigo}`);
      const { data } = response.data;  // Acessando a chave 'data' corretamente
    
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a tarde");
        setTardeItems([]);
      } else if (Array.isArray(data)) {  // Verifica se 'data' é um array
        setTardeItems(data);  // Atualiza o estado com os dados da tarde
      } else {
        console.log("Estrutura de dados inesperada para a tarde", response.data);
        setTardeItems([]);  // Se a estrutura for inesperada, limpa o estado
      }
    } catch (error) {
      console.error("Erro ao buscar dados da tarde:", error);
      setTardeItems([]);  // Limpa os dados em caso de erro
    }
  };

  // Chama as funções de fetch quando o componente é montado
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
          {manhaItems.length > 0 ? (
            manhaItems.map((item, index) => (
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
              </View>
            ))
          ) : (
            <Text style={styles.placeholderText}>Nenhum registro encontrado para a manhã.</Text>
          )}

          <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
          {tardeItems.length > 0 ? (
            tardeItems.map((item, index) => (
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
            ))
          ) : (
            <Text style={styles.placeholderText}>Nenhum registro encontrado para a tarde.</Text>
          )}
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
     
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.btnseta}
          onPress={() => navigation.navigate('HomeResponsavel', { codigo })}
        >
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

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
});  */

/* import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { api } from '../../api/api';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function MeudiaResponsavel({ navigation, route }) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);
  const [activeTab, setActiveTab] = useState('Hoje'); // Estado para controlar a aba ativa
  const { codigo } = route.params || {};

  const fetchMeudiaManha = async () => {
    setManhaItems([]); // Limpa o estado antes
    try {
      const response = await api.get(`/meudiamanha/${codigo}`);
      const { data } = response.data;
  
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a manhã");
        setManhaItems([]);
      } else if (Array.isArray(data?.data)) {
        setManhaItems(data.data);
      } else {
        console.log("Estrutura de dados inesperada para a manhã", response.data);
        setManhaItems([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da manhã:", error);
      setManhaItems([]);
    }
  };
  
  const fetchMeudiaTarde = async () => {
    try {
      const response = await api.get(`/meudiatarde/${codigo}`);
      const { data } = response.data;
  
      // Verificar a estrutura do objeto recebido
      if (data?.message === "Nenhum dado encontrado.") {
        console.log("Nenhum dado retornado para a tarde");
        setTardeItems([]);
      } else if (Array.isArray(data?.data)) {
        setTardeItems(data.data);
      } else {
        console.log("Estrutura de dados inesperada para a tarde", response.data);
        setTardeItems([]);
      }
    } catch (error) {
      console.error("Erro ao buscar dados da tarde:", error);
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
        {manhaItems.length > 0 ? (
          manhaItems.map((item, index) => (
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
            </View>
          ))
        ) : (
          <Text style={styles.placeholderText}>Nenhum registro encontrado para a manhã.</Text>
        )}

        <Text style={styles.sectionTitle}>Meu Dia - Tarde</Text>
        {tardeItems.length > 0 ? (
          tardeItems.map((item, index) => (
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
          ))
        ) : (
          <Text style={styles.placeholderText}>Nenhum registro encontrado para a tarde.</Text>
        )}
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

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.btnseta}
          onPress={() => navigation.navigate('HomeResponsavel', { codigo })}
        >
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Meu Dia</Text>
      </View>

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
}); */