import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import HomeSelecao from './src/pages/HomeSelecao';
import HomeColaborador from './src/pages/HomeColaborador';
import HomeProfessor from './src/pages/HomeProfessor';
import HomeResponsavel from './src/pages/HomeResponsavel';
  
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
        </Stack.Navigator>
    </NavigationContainer>
  );
}