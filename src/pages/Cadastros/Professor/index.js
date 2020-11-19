import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, TextInput, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { TextInputMask } from 'react-native-masked-text'
import RNPickerSelect from 'react-native-picker-select';

import AlertError from '../../../components/AlertError';
import ProfSvg from '../../../../assets/svg/professor.svg';
import Loader from '../../../components/Loader';
import { users } from '../../../config/model'
import styles from './styles';

export default function Professor({ navigation, route: { params } }){
  const [ Nome, setNome ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Pass, setPass ] = useState(Math.floor(Math.random() * 10000000).toString());
  const [ Graduacao, setGraduacao ] = useState('');
  const [ Telefone, setTelefone ] = useState('');
  const [ Sexo, setSexo ] = useState('Selecione');
  const [ loaderVisible, setloaderVisible ] = useState(false);
  const [ errorAlert, seterrorAlert ] = useState(false);
  const [ errorAlertMsg, seterrorAlertMsg ] = useState('');

  async function updateUser(){
    if(Email == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o email.');
      return;
    } else if(Nome == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o nome.');
      return;
    } else if(Sexo == 'Selecione') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor selecione o sexo.');
      return;
    } else if(Telefone == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o telefone.');
      return;
    } else if(Graduacao == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a formação.');
      return;
    }

    //CRIO INSTANCIA DO NOVO USUARIO
    var user = new users(Email, Nome, null, null, Graduacao, 'professor', Pass, Telefone, null, new Date().getTime(), Sexo);
    database().ref('users/'+params.professorId).update(user);

    navigation.goBack();
  }

  async function obterProfessor(){
    var response = await database().ref('users/'+params.professorId).once('value');
    var professor = response.val();
    setNome(professor.nome);
    setEmail(professor.email);
    setPass(professor.senhaCadastro);
    setGraduacao(professor.formacao);
    setTelefone(professor.telefone);
  }

  async function signUp(){
    if(Email == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o email.');
      return;
    } else if(Nome == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o nome.');
      return;
    } else if(Pass == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a senha.');
      return;
    } else if(Sexo == 'Selecione') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor selecione o sexo.');
      return;
    } else if(Telefone == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o telefone.');
      return;
    } else if(Graduacao == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a formação.');
      return;
    }

    setloaderVisible(true);
    try {
      //CRIA AUTENTICACAO
      var res = await auth().createUserWithEmailAndPassword(Email, Pass);
      //SETO O DISPLAY NAME PQ N DA PRA ATRIBUIR AO CRIAR
      await res.user.updateProfile({
        displayName: Nome
      });
      
      //CRIO INSTANCIA DO NOVO USUARIO
      var user = new users(res.user.email, Nome, null, null, Graduacao, 'professor', Pass, Telefone, null, new Date().getTime(), Sexo);

      //SALVO A KEY DO USUARIO DO BANCO
      database().ref().child('users/'+res.user.uid).push().key;
      //SETO O USUARIO NA KEY NOVA DO BANCO
      database().ref().child('users/'+res.user.uid).set(user);

      setloaderVisible(false);
      //VOLTO PRA TELA DE LISTAGEM APOS SALVAR
      navigation.goBack();
    } catch (e) {
      //CASO DE ERRO É UM DESSES DOIS
      if (e.code == 'weak-password') {
        setloaderVisible(false);
        seterrorAlert(true);
        seterrorAlertMsg('Por favor insira uma senha mais forte.');
      } else if (e.code == 'email-already-in-use') {
        setloaderVisible(false);
        seterrorAlert(true);
        seterrorAlertMsg('Já existe uma conta com este e-mail.');
      }
      setloaderVisible(false);
    }
  }

  useEffect(() => {
    if(params != undefined) obterProfessor();
  }, []);

  return <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps={'always'} keyboardDismissMode={true}>
      <View style={{ height: 40 }}/>
      <ProfSvg width={Dimensions.get('window').width - 30} height={200}/>
      <View style={{ height: 30 }}/>
      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} placeholder="Ex: João Silva" value={Nome} onChangeText={t => setNome(t)}/>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} placeholder="Ex: joao@gmail.com"  value={Email} onChangeText={t => setEmail(t)}/>

      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} placeholder="**********" value={Pass} onChangeText={t => setPass(t)}/>

      <Text style={styles.label}>Sexo</Text>
      <RNPickerSelect
        textInputProps={{ style: styles.input }}
        onValueChange={(value) => setSexo(value)}
        value={Sexo}
        items={[
            { label: 'Selecione', value: 'Selecione' },
            { label: 'Masculino', value: 'Masculino' },
            { label: 'Feminino', value: 'Feminino' },
        ]}
      />

      <Text style={styles.label}>Telefone</Text>
      <TextInputMask 
        type={'cel-phone'}
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        style={styles.sinput}
        placeholder="(12) 99999-9999"
        value={Telefone}
        onChangeText={t => setTelefone(t)}
      />

      <Text style={styles.label}>Formação</Text>
      <TextInput style={styles.input} placeholder="Ex: Fisioterapeuta" value={Graduacao} onChangeText={t => setGraduacao(t)}/>

      <TouchableOpacity style={styles.btnCadastrar} onPress={() => {
        if(params != undefined) updateUser();
        else signUp();
      }}>
        <Text style={styles.btnText}>{params != undefined ? 'ALTERAR' : 'CADASTRAR'}</Text>
      </TouchableOpacity>
      <View style={{ height: 150 }}/>
      <AlertError state={errorAlert} msg={errorAlertMsg} toggle={() => seterrorAlert(false)}/>
      <Loader loaderVisible={loaderVisible} closeLoader={() => setloaderVisible(false)}/>
      
    </ScrollView>
}
