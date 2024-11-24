import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from './AuthContext';
import { MaterialIcons } from "@expo/vector-icons";

export default function Perfil({ navigation, route }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
        <View style={styles.topBar}>
            <TouchableOpacity
            style={styles.profilePic}
            onPress={() => navigation.openDrawer()} // Abre o Drawer ao clicar
            >
            <MaterialIcons name="menu" size={24} color="black" />
            </TouchableOpacity>
        </View>
    <View style={styles.viewAcesso}>
      <Text style={styles.perfilTexto}>Nome: {user?.nome || 'usuario' }!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    perfilTexto: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingTop: 50,
        backgroundColor: '#283673',
    },
    viewAcesso: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        paddingHorizontal: 20, 
      },
      profilePic: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center', 
      },
    logoutButton: {
      backgroundColor: '#ff4d4d',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
    },
    logoutText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
  
