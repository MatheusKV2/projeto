import 'react-native-gesture-handler';
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';
import CadAluno from '../pages/Cadastros/Aluno';
import CadProfessor from '../pages/Cadastros/Professor';
import ProfessoresList from '../pages/Listagens/Professor';
import AlunosList from '../pages/Listagens/Alunos';
import VerTreino from '../pages/Treino';
import Perfil from '../pages/Perfil';

import CadTreino from '../pages/Cadastros/Treino';

const Stack = createStackNavigator();

export default function main(props) {
  return (
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: '#17402F',
          shadowColor: '#FBD84A',
          shadowRadius: 0,
          shadowOffset: {
            height: 2
          }
          
          // shadowRadius: 0,
          // shadowOffset: {
          //     height: 0,
          // },
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
        },
        headerBackAllowFontScaling: true,
        headerBackTitleVisible: false
      }}>
        <Stack.Screen name="Home" component={Home} 
        initialParams={{
          //PASSO O TIPO PRA TELA HOME
          type: props.type,
          nome: props.nome,
        }}
        options={{ headerShown: false }}/>
        <Stack.Screen name="CadProfessor" component={CadProfessor} options={{ 
          title: 'Cadastrar Professor'
        }}/>
        <Stack.Screen name="CadAluno" component={CadAluno} options={{ 
          title: 'Cadastrar Aluno'
        }}/>
        <Stack.Screen name="AlunosList" component={AlunosList} options={{ 
          title: 'Listagem Alunos',
        }}/>
        <Stack.Screen name="ProfessoresList" component={ProfessoresList} options={{ 
          title: 'Listagem Professores'
        }}/>
        <Stack.Screen name="Perfil" component={Perfil} options={{ 
          title: 'Perfil',
          headerShown: false
        }}
        initialParams={{
          //PASSO O SEXO PRA TELA
          sexo: props.sexo,
          type: props.type
        }}/>
        <Stack.Screen name="CadTreino" component={CadTreino} options={{ 
          title: 'Treino Aluno',
        }}/>
        <Stack.Screen name="VerTreino" component={VerTreino} options={{ 
          title: 'Treino',
        }}/>
      </Stack.Navigator>
  );
}