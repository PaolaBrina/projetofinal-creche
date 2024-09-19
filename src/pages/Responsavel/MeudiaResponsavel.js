import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, FlatList, View,TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function MeudiaResponsavel({navigation}) {
  const [manhaItems, setManhaItems] = useState([]);
  const [tardeItems, setTardeItems] = useState([]);

   const Meudiamanha = async () => {
    try {
      const response = await axios.get('http://localhost:3000/meudiamanha');
      const data = response.data.meudiamanha;
      console.log(data)
      setManhaItems(data); // Armazena os dados da manhã no estado
    } catch (error) {
      console.error('Error fetching data from meudiamanha:', error);
    }
  };


    const Meudiatarde = async () => {
        try{
        const response = await axios.get('http://localhost:3000/meudiatarde');
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
          <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
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
  });