import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { createItem, getItems, updateItem, deleteItem } from '../apiService'; // Ajuste o caminho conforme necessário

const AddProductForm = () => {
  // Estado para armazenar os valores dos campos de entrada
  const [newemail, setNewemail] = useState('');
  const [newcoco, setNewcoco] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Para rastrear o item sendo editado

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os itens');
    }
  };

  const handleCreate = async () => {
    if (!newemail || !newcoco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const data = { email: newemail, coco: newcoco };
      const createdItem = await createItem(data);

      setNewemail('');
      setNewcoco('');
      setItems((prevItems) => [...prevItems, createdItem]);
      Alert.alert('Sucesso', 'Produto criado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o produto');
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleUpdate = async () => {
    if (!newemail || !newcoco || !editingItem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione um item para editar');
      return;
    }

    try {
      const updatedItem = { email: newemail, coco: newcoco };
      await updateItem(editingItem.id, updatedItem);

      setNewemail('');
      setNewcoco('');
      setEditingItem(null);
      fetchItems();
      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter(item => item.id !== id));
      Alert.alert('Sucesso', 'Produto deletado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o produto');
      console.error('Erro ao deletar produto:', error);
    }
  };

  const handleEdit = (item) => {
    setNewemail(item.email);
    setNewcoco(item.coco);
    setEditingItem(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputext}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite email'
        value={newemail}
        onChangeText={setNewemail}
      />
      
      <Text style={styles.inputext}>Coco:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite coco'
        value={newcoco}
        onChangeText={setNewcoco}
      />
      
      <Button
        title={editingItem ? "Atualizar Produto" : "Criar Produto"}
        onPress={editingItem ? handleUpdate : handleCreate}
      />
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <Text style={styles.itemText}>Coco: {item.coco}</Text>
            <Button title="Editar" onPress={() => handleEdit(item)} />
            <Button title="Deletar" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  inputext: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default AddProductForm;









/* 
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, StyleSheet } from 'react-native';
import axios from 'axios'; // Importa o Axios para fazer as requisições HTTP

const API_URL = 'http://localhost:5000/items'; // Substitua pela URL da sua API

const AddProductForm = () => {
  // Estado para armazenar os valores dos campos de entrada
  const [newemail, setNewemail] = useState('');
  const [newcoco, setNewcoco] = useState('');
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null); // Para rastrear o item sendo editado

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os itens');
      console.error('Error fetching items', error);
    }
  };

  const createItem = async (data) => {
    try {
      const response = await axios.post(API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error creating item', error);
      throw error; // Lança o erro para que o chamador possa lidar com ele
    }
  };

  const updateItem = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating item', error);
      throw error; // Lança o erro para que o chamador possa lidar com ele
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Error deleting item', error);
      throw error; // Lança o erro para que o chamador possa lidar com ele
    }
  };

  const handleCreate = async () => {
    if (!newemail || !newcoco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    try {
      const data = { email: newemail, coco: newcoco };
      const createdItem = await createItem(data);

      setNewemail('');
      setNewcoco('');
      setItems((prevItems) => [...prevItems, createdItem]);
      Alert.alert('Sucesso', 'Produto criado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar o produto');
    }
  };

  const handleUpdate = async () => {
    if (!newemail || !newcoco || !editingItem) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione um item para editar');
      return;
    }

    try {
      const updatedItem = { email: newemail, coco: newcoco };
      await updateItem(editingItem.id, updatedItem);

      setNewemail('');
      setNewcoco('');
      setEditingItem(null);
      fetchItems();
      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setItems((prevItems) => prevItems.filter(item => item.id !== id));
      Alert.alert('Sucesso', 'Produto deletado com sucesso');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível deletar o produto');
    }
  };

  const handleEdit = (item) => {
    setNewemail(item.email);
    setNewcoco(item.coco);
    setEditingItem(item);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.inputext}>Email:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite email'
        value={newemail}
        onChangeText={setNewemail}
      />
      
      <Text style={styles.inputext}>Coco:</Text>
      <TextInput
        style={styles.input}
        placeholder='Digite coco'
        value={newcoco}
        onChangeText={setNewcoco}
      />
      
      <Button
        title={editingItem ? "Atualizar Produto" : "Criar Produto"}
        onPress={editingItem ? handleUpdate : handleCreate}
      />
      
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>Email: {item.email}</Text>
            <Text style={styles.itemText}>Coco: {item.coco}</Text>
            <Button title="Editar" onPress={() => handleEdit(item)} />
            <Button title="Deletar" onPress={() => handleDelete(item.id)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  inputext: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
});

export default AddProductForm;
 */