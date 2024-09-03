import React from 'react';
import { View, Text, Button } from 'react-native';

const Selecione = ({ route, navigation }) => {
  const { roles } = route.params;

  return (
    <View>
      <Text>Select your role:</Text>
      {roles.map((role) => (
        <Button
          key={role}
          title={`Go to ${role}`}
          onPress={() => {
            if (role === 'professor') {
              navigation.navigate('ProfessorHome');
            } else if (role === 'colaborador') {
              navigation.navigate('ColaboradorHome');
            } else if (role === 'responsavel') {
              navigation.navigate('ResponsavelHome');
            }
          }}
        />
      ))}
    </View>
  );
};

export default Selecione;
