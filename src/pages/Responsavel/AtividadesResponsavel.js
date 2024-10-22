import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { api } from '../../api/api';

export default function AtividadesResponsavel({navigation}) {
  const [atividades, setAtividades] = useState([]);

   const Atividades = async () => {
    try {
      const response = await api.get('/atividades');
      const data = response.data.atividades;
      console.log(data)
      setAtividades(data); 
    } catch (error) {
      console.error('Error fetching data de atividades:', error);
    }
  };
  const Pendente = () => {
   /*  if (setAtividades.datahora ===){} */
    /* verificar por data */
    
  }
  const Todas = () => {
    /* get tudo */
    
  }
      
    useEffect(() => {
        Atividades();
    }, []);

    return (
      <View style={styles.container}> 
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.profilePic}></TouchableOpacity>
        </View>

        <View style={styles.btnsselecionar}>
        <View style={styles.btnpendentes}>
        <Text style={styles.sectionTitle}>Pendentes</Text>
          <TouchableOpacity style={styles.Pendente}></TouchableOpacity>
        </View>
        <View style={styles.btntodas}>
        <Text style={styles.sectionTitle}>Todas</Text>
          <TouchableOpacity style={styles.Todas}></TouchableOpacity>
        </View>
        </View>
       
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f2f2f2',
    },
  });