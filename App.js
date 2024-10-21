import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './src/pages/Login';
import HomeSelecao from './src/pages/HomeSelecao';
/* Colaborador */
import HomeColaborador from './src/pages/Colaborador/HomeColaborador';
import AlunoCadastro from './src/pages/Colaborador/AlunoCadastro';
import AlunoAdicionar from './src/pages/Colaborador/AlunoAdicionar';
import ProfessorCadastro from './src/pages/Colaborador/ProfessorCadastro';
import ProfessorAdicionar from './src/pages/Colaborador/ProfessorAdicionar';
import ResponsavelCadastro from './src/pages/Colaborador/ResponsavelCadastro';
import TurmaCadastro from './src/pages/Colaborador/TurmaCadastro';
import TurmaAdicionar from './src/pages/Colaborador/TurmaAdicionar';
/* Professor */
import HomeProfessor from './src/pages/Professor/HomeProfessor';
import MeudiaProfessor from './src/pages/Professor/MeudiaProfessor';
/* Responsável */
import HomeResponsavel from './src/pages/Responsavel/HomeResponsavel';
import MeudiaResponsavel from './src/pages/Responsavel/MeudiaResponsavel';
  
export default function App(){

  const Stack = createStackNavigator();

  return(
    <NavigationContainer> 
        <Stack.Navigator>
          <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/>
          <Stack.Screen options={{headerShown:false}} name='HomeSelecao' component={HomeSelecao}/> 
          <Stack.Screen options={{headerShown:false}} name='HomeColaborador' component={HomeColaborador}/> 
          <Stack.Screen options={{headerShown:false}} name='AlunoCadastro' component={AlunoCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='AlunoAdicionar' component={AlunoAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ProfessorCadastro' component={ProfessorCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='ProfessorAdicionar' component={ProfessorAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='ResponsavelCadastro' component={ResponsavelCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='TurmaCadastro' component={TurmaCadastro}/>
          <Stack.Screen options={{headerShown:false}} name='TurmaAdicionar' component={TurmaAdicionar}/>
          <Stack.Screen options={{headerShown:false}} name='HomeProfessor' component={HomeProfessor}/>
          <Stack.Screen options={{headerShown:false}} name='MeudiaProfessor' component={MeudiaProfessor}/>
          <Stack.Screen options={{headerShown:false}} name='HomeResponsavel' component={HomeResponsavel}/>
          <Stack.Screen options={{headerShown:false}} name='MeudiaResponsavel' component={MeudiaResponsavel}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}