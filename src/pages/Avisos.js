import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign'; // Certifique-se de importar o ícone
import { api } from '../api/api';

export default function Avisos({ navigation, route }) {
  const { codigo } = route.params;
  const [avisos, setAvisos] = useState([]);
  const [busca, setBusca] = useState('');
  const [avisoSelecionado, setAvisoSelecionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAvisos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get('/avisos');
      console.log('Resposta completa:', response);

      if (Array.isArray(response.data)) {
        const dadosMapeados = response.data.map((aviso, index) => ({
          id: String(index + 1),
          titulo: aviso.titulo,
          data: aviso.datahora ? new Date(aviso.datahora).toLocaleDateString() : '',
          autor: aviso.autor,
          descricao: aviso.descricao,
          foto: aviso.foto,
        }));
        setAvisos(dadosMapeados);
      } else if (response.data && response.data.avisos) {
        const dadosMapeados = response.data.avisos.map((aviso, index) => ({
          id: String(index + 1),
          titulo: aviso.titulo,
          data: aviso.datahora ? new Date(aviso.datahora).toLocaleDateString() : '',
          autor: aviso.autor,
          descricao: aviso.descricao,
          foto: aviso.foto,
        }));
        setAvisos(dadosMapeados);
      } else {
        console.error('Formato inesperado dos dados:', response.data);
        setError('Formato inesperado dos dados recebidos.');
      }
    } catch (error) {
      console.error('Erro ao buscar avisos:', error);
      setError('Erro ao buscar avisos, veja o console para mais detalhes.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvisos();
  }, []);

  const avisosFiltrados = avisos.filter((aviso) =>
    aviso.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  const abrirDetalhes = (aviso) => {
    setAvisoSelecionado(aviso);
    setModalVisible(true);
  };

  const handleVoltar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.btnseta} onPress={handleVoltar}>
          <AntDesign name="caretleft" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.topBarTxt}>Cadastro Aluno</Text>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          style={styles.input}
          placeholder="Pesquisar"
          value={busca}
          onChangeText={(texto) => setBusca(texto)}
        />
      </View>

      <FlatList
        data={avisosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.avisoItem} onPress={() => abrirDetalhes(item)}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.data}>{item.data}</Text>
            <Text style={styles.autor}>De: {item.autor}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Modal de detalhes */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Ícone "X" para fechar o modal */}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <AntDesign name="close" size={30} color="black" />
            </TouchableOpacity>

            {avisoSelecionado && (
              <>
                <Text style={styles.modalTitulo}>{avisoSelecionado.titulo}</Text>
                <Text style={styles.modalData}>Data: {avisoSelecionado.data}</Text>
                <Text style={styles.modalAutor}>De: {avisoSelecionado.autor}</Text>
                <Text style={styles.modalDescricao}>{avisoSelecionado.descricao}</Text>
                {avisoSelecionado.foto && (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${avisoSelecionado.foto}` }}
                    style={styles.avisoImage}
                  />
                )}
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    paddingTop: 60,
    paddingLeft: 20,
    paddingRight: 20,
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
    justifyContent: 'center',
  },
  searchBar: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
  },
  avisoItem: {
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 8,
    padding: 15,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  data: {
    fontSize: 14,
    color: '#555',
  },
  autor: {
    fontSize: 14,
    color: '#777',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalData: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalAutor: {
    fontSize: 14,
    marginBottom: 10,
  },
  modalDescricao: {
    fontSize: 16,
    marginBottom: 15,
  },
  avisoImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
  },
});
