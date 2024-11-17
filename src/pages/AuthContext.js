import React, { createContext, useState } from "react";

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

  return (
    <AuthContext.Provider value={{ user, role, setRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
