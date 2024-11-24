import React, { createContext, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [role, setRole] = useState(null); 

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    setRole(null);
  };

  const troca = async () => {
    // Apenas limpa o papel selecionado (role), não os dados do usuário
    setRole(null);
    await AsyncStorage.removeItem('selectedRole'); // Remove o papel selecionado do AsyncStorage
  };

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout, troca }}>
      {children}
    </AuthContext.Provider>
  );
};
