import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import HomeSelecao from './src/pages/HomeSelecao';
import HomeColaborador from './src/pages/Colaborador/HomeColaborador';
import HomeProfessor from './src/pages/Professor/HomeProfessor';
import HomeResponsavel from './src/pages/Responsavel/HomeResponsavel';
import MeudiaResponsavel from './src/pages/Responsavel/MeudiaResponsavel';
import MeudiaProfessor from './src/pages/Professor/MeudiaProfessor';
  
export default function App(){

  const Stack = createStackNavigator();

  return(
    <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/>
          <Stack.Screen name='HomeSelecao' component={HomeSelecao}/> 
          <Stack.Screen name='HomeColaborador' component={HomeColaborador}/> 
          <Stack.Screen name='HomeProfessor' component={HomeProfessor}/>
          <Stack.Screen name='HomeResponsavel' component={HomeResponsavel}/>
          <Stack.Screen name='MeudiaResponsavel' component={MeudiaResponsavel}/>
          <Stack.Screen name='MeudiaProfessor' component={MeudiaProfessor}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}