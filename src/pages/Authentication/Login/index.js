import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, Text, TouchableOpacity, Dimensions, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';

import Loader from '../../../components/Loader';
import Img from '../../../../assets/svg/login.svg';
import styles from './styles'

function Login({navigation}){
  const [ Email, setEmail ] = useState('');
  const [ Pass, setPass ] = useState('');
  const [ loaderVisible, setloaderVisible ] = useState(false);

  async function onLogin(){
    try {
      //EXIBE LOADER
      setloaderVisible(true);
      //LOGA COM EMAIL E SENHA
      await auth().signInWithEmailAndPassword(Email, Pass);
      //APOS LOGAR SE DEU CERTO ELE VAI EXECUTAR A FUNÇÃO ON AUTH STATE CHANGED NO INDEX PRINCIPAL SETAR O USUARIO E AI VAI PRA TELA INICIAL
      //OCULTA LOADER
      setTimeout(() => {
        setloaderVisible(false);
      }, 500);
    } catch (error) {
      //CASO HAJA ERRO RETORNA O ERRO
      if (error.code == 'auth/user-not-found') {
        setloaderVisible(false);
        Alert.alert('Atenção', 'Usuário não encontrado com este email');
      } else if (error.code == 'auth/wrong-password') {
        setloaderVisible(false);
        Alert.alert('Atenção', 'Senha incorreta');
      }
    }
  }

  return (   
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps={'always'} keyboardDismissMode={true}>
      <Img height={Dimensions.get('window').height * 0.25} width={Dimensions.get('screen').width - 40}/>
      <View style={{ height: 40 }}/>
      <Text style={styles.textEntrar}>Gerencie seus treinos, mantenha-se conectado com seu instrutor</Text>
      <Text style={styles.textAviso}>Caso ainda não tenha acesso entre em contato com a academia!</Text>

      <TextInput style={styles.input} placeholder="Email" value={Email} onChangeText={t => setEmail(t)}/>
      <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} value={Pass} onChangeText={t => setPass(t)}/>

      <Text style={styles.textSenha}>Esqueceu a senha?</Text>
      
      <TouchableOpacity style={styles.btnEntrar} onPress={onLogin}>
        <Text style={styles.textBtnEntrar}>Entrar</Text>
      </TouchableOpacity>
      <View style={{ height: 140 }}/>
      <Loader loaderVisible={loaderVisible} closeLoader={() => setloaderVisible(false)}/>
    </ScrollView>
  )
}

export default Login;