import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthProvider } from './src/pages/AuthContext';

import Login from './src/pages/Login';
import HomeSelecao from './src/pages/HomeSelecao';
import Suporte from './src/pages/Suporte';
/* Colaborador */
import HomeColaborador from './src/pages/Colaborador/HomeColaborador';
import AlunoCadastro from './src/pages/Colaborador/AlunoCadastro';
import AlunoAdicionar from './src/pages/Colaborador/AlunoAdicionar';
import AlunoEditar from './src/pages/Colaborador/AlunoEditar';

import HorarioCadastro from './src/pages/Colaborador/HorarioCadastro';
import HorarioAdicionar from './src/pages/Colaborador/HorarioAdicionar';

import ProfessorCadastro from './src/pages/Colaborador/ProfessorCadastro';
import ProfessorAdicionar from './src/pages/Colaborador/ProfessorAdicionar';

import ResponsavelCadastro from './src/pages/Colaborador/ResponsavelCadastro';
import ResponsavelAdicionar from './src/pages/Colaborador/ResponsavelAdicionar';
import TurmaCadastro from './src/pages/Colaborador/TurmaCadastro';
import TurmaAdicionar from './src/pages/Colaborador/TurmaAdicionar';

import AuxiliarCadastro from './src/pages/Colaborador/AuxiliarCadastro';
import AuxiliarAdicionar from './src/pages/Colaborador/AuxiliarAdicionar';

import ListaMaterialCadastro from './src/pages/Colaborador/ListaMaterialCadastro';
import ListaMaterialAdicionar from './src/pages/Colaborador/ListaMaterialAdicionar';

import CalendarioAdicionar from './src/pages/Colaborador/CalendarioAdicionar';
import CalendarioCadastro from './src/pages/Colaborador/CalendarioCadastro';

import AvisosCadastro from './src/pages/Colaborador/AvisosCadastro';
import AvisoAdicionar from './src/pages/Colaborador/AvisosAdicionar';
/* Professor */
import HomeProfessor from './src/pages/Professor/HomeProfessor';
import MeudiaProfessor from './src/pages/Professor/Meu_dia/MeudiaProfessor';
import AtividadesCadastro from './src/pages/Professor/Atividades/AtividadesCadastro';
import AtividadesProfAdicionar from './src/pages/Professor/Atividades/AtividadesProfAdicionar';
import AtividadesProfBuscar from './src/pages/Professor/Atividades/AtividadesBuscar';
import FotoProfessor from './src/pages/Professor/FotoProfessor';
import CalendarioProfessor from './src/pages/Professor/CalendarioProfessor';
import HorarioProfessor from './src/pages/Professor/HorarioProfessor';
/* Responsável */
import HomeResponsavel from './src/pages/Responsavel/HomeResponsavel';
import MeudiaResponsavel from './src/pages/Responsavel/MeudiaResponsavel';
import ChamadasResponsavel from './src/pages/Responsavel/ChamadasResponsavel';
import ListadeMateriaisResponsavel from './src/pages/Responsavel/ListadeMateriaisResponsavel';
import AtividadesResponsavel from './src/pages/Responsavel/AtividadesResponsavel';
import CalendarioResponsavel from './src/pages/Responsavel/CalendarioResponsavel';
import HorarioResponsavel from './src/pages/Responsavel/HorarioResponsavel';
import FotosResponsavel from './src/pages/Responsavel/FotosResponsavel';


const Stack = createStackNavigator();
const Drawer1 = createDrawerNavigator();
const Drawer2 = createDrawerNavigator();
const Drawer3 = createDrawerNavigator();

function DrawerResponsavel({ route, navigation }) {
  const { codigo } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
  return (
    <Drawer1.Navigator initialRouteName="DrawerResponsavel">
      <Drawer1.Screen
        name="DrawerResponsavel"
        component={HomeResponsavel}
        initialParams={{ codigo }}
        options={{ headerShown: false }}
      />
      <Drawer1.Screen
        name="Logout"
        component={() => (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        options={{ headerShown: false }}
      />
    </Drawer1.Navigator>
  );
}

function DrawerColaborador({ route, navigation }) {
  const { codigo } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
  return (
    <Drawer2.Navigator initialRouteName="DrawerColaborador">
      <Drawer2.Screen
        name="DrawerColaborador"
        component={HomeColaborador}
        initialParams={{ codigo }}
        options={{ headerShown: false }}
      />
      <Drawer2.Screen
        name="Logout"
        component={() => (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        options={{ headerShown: false }}
      />
    </Drawer2.Navigator>
  );
}

function DrawerProfessor({ route, navigation }) {
  const { codigo } = route.params;

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.replace('Login');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  }
  return (
    <Drawer3.Navigator initialRouteName="HomeProfessor">
      <Drawer3.Screen
        name="HomeProfessor"
        component={HomeProfessor}
        initialParams={{ codigo }}
        options={{ headerShown: false }}
      />
      <Drawer3.Screen
        name="Suporte"
        component={Suporte}
        initialParams={{ codigo }}
        options={{ title: 'Suporte' }}
      />
      <Drawer3.Screen
        name="Logout"
        component={() => (
          <View style={styles.logoutContainer}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        options={{ headerShown: false }}
      />
    </Drawer3.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="HomeSelecao" component={HomeSelecao} options={{ headerShown: false }} />

          <Stack.Screen name="HomeColaborador" component={DrawerColaborador} options={{ headerShown: false }} />
          <Stack.Screen options={{headerShown:false}} name='AlunoCadastro' component={AlunoCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='AlunoAdicionar' component={AlunoAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='AlunoEditar' component={AlunoEditar}/>
          <Stack.Screen options={{headerShown:false}} name='HorarioCadastro' component={HorarioCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='HorarioAdicionar' component={HorarioAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ProfessorCadastro' component={ProfessorCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='ProfessorAdicionar' component={ProfessorAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ResponsavelCadastro' component={ResponsavelCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='ResponsavelAdicionar' component={ResponsavelAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='TurmaCadastro' component={TurmaCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='TurmaAdicionar' component={TurmaAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='AuxiliarCadastro' component={AuxiliarCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='AuxiliarAdicionar' component={AuxiliarAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ListaMaterialAdicionar' component={ListaMaterialAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ListaMaterialCadastro' component={ListaMaterialCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='CalendarioCadastro' component={CalendarioCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='CalendarioAdicionar' component={CalendarioAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='AvisosCadastro' component={AvisosCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='AvisoAdicionar' component={AvisoAdicionar}/>

          <Stack.Screen name="HomeProfessor" component={DrawerProfessor} options={{ headerShown: false }} />
          <Stack.Screen options={{headerShown:false}} name='MeudiaProfessor' component={MeudiaProfessor}/>
          <Stack.Screen options={{headerShown:false}} name='AtividadesCadastro' component={AtividadesCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='AtividadesProfAdicionar' component={AtividadesProfAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='AtividadesProfBuscar' component={AtividadesProfBuscar}/>
          <Stack.Screen options={{headerShown:false}} name='FotoProfessor' component={FotoProfessor}/>
          <Stack.Screen options={{headerShown:false}} name='CalendarioProfessor' component={CalendarioProfessor}/>
          <Stack.Screen options={{headerShown:false}} name='HorarioProfessor' component={HorarioProfessor}/>

          <Stack.Screen name="HomeResponsavel" component={DrawerResponsavel} options={{ headerShown: false }} />
          <Stack.Screen options={{headerShown:false}} name='MeudiaResponsavel' component={MeudiaResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='ChamadasResponsavel' component={ChamadasResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='ListadeMateriaisResponsavel' component={ListadeMateriaisResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='AtividadesResponsavel' component={AtividadesResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='CalendarioResponsavel' component={CalendarioResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='HorarioResponsavel' component={HorarioResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='FotosResponsavel' component={FotosResponsavel}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  logoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#ddd',
    padding: 10,
    alignItems: 'center',
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
