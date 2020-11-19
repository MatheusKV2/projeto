import React, { useEffect, useState } from 'react';
import { View, ScrollView, Dimensions, TextInput, Text, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import AlertError from '../../../components/AlertError';
import AlunoSvg from '../../../../assets/svg/aluno.svg';
import Loader from '../../../components/Loader';
import { users } from '../../../config/model'
import styles from './styles';

export default function Aluno({ navigation, route: { params } }){
  const [ Nome, setNome ] = useState('');
  const [ Email, setEmail ] = useState('');
  const [ Pass, setPass ] = useState(Math.floor(Math.random() * 10000000).toString());
  const [ Peso, setPeso ] = useState('');
  const [ Idade, setIdade ] = useState('');
  const [ Telefone, setTelefone ] = useState('');
  const [ Altura, setAltura ] = useState('');
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
    } else if(Peso == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o peso.');
      return;
    } else if(Telefone == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o telefone.');
      return;
    } else if(Idade == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a idade.');
      return;
    } else if(Altura == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a altura.');
      return;
    } else if(Sexo == 'Selecione') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor selecione o sexo.');
      return;
    }

    //CRIO INSTANCIA DO NOVO USUARIO
    var user = new users(Email, Nome, Peso, Idade, null, 'aluno', Pass, Telefone, Altura, new Date().getTime(), Sexo);
    database().ref('users/'+params.alunoId).update(user);

    navigation.goBack();
  }

  async function obterAluno(){
    var response = await database().ref('users/'+params.alunoId).once('value');
    var aluno = response.val();
    setNome(aluno.nome);
    setEmail(aluno.email);
    setPeso(aluno.peso);
    setIdade(aluno.idade);
    setPass(aluno.senhaCadastro);
    setAltura(aluno.altura);
    setTelefone(aluno.telefone);
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
    } else if(Peso == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o peso.');
      return;
    } else if(Telefone == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o telefone.');
      return;
    } else if(Idade == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a idade.');
      return;
    } else if(Altura == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a altura.');
      return;
    } else if(Sexo == 'Selecione') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor selecione o sexo.');
      return;
    }

    setloaderVisible(true);
    try {
      //CRIA AUTENTICACAO COM EMAIL E SENHA
      var res = await auth().createUserWithEmailAndPassword(Email, Pass);
      //SETO O DISPLAY NAME PQ N DA PRA ATRIBUIR AO CRIAR
      await res.user.updateProfile({
        displayName: Nome
      });
      
      //CRIO INSTANCIA DO NOVO USUARIO
      var user = new users(res.user.email, Nome, Peso, Idade, null, 'aluno', Pass, Telefone, Altura, new Date().getTime(), Sexo);

      //SALVO A KEY DO USUARIO DO BANCO
      database().ref().child('users/'+res.user.uid).push().key;
      //SETO O USUARIO NA KEY NOVA DO BANCO
      database().ref().child('users/'+res.user.uid).set(user);

      setloaderVisible(false);

      //VOLTO PRA TELA DE LISTAGEM
      navigation.goBack();
    } catch (e) {
      //CASO DE ERRO É UM DESSES DOIS
      if (e.code == 'auth/weak-password') {
        setloaderVisible(false);
        seterrorAlert(true);
        seterrorAlertMsg('Por favor insira uma senha mais forte.');
      } else if (e.code == 'auth/email-already-in-use') {
        setloaderVisible(false);
        seterrorAlert(true);
        seterrorAlertMsg('Já existe uma conta com este e-mail');
      }
      setloaderVisible(false);
    }
  }

  useEffect(() => {
    if(params != undefined) obterAluno();
  }, []);

  return <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps={'always'} keyboardDismissMode={true}>
      <View style={{ height: 40 }}/>
      {/* <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      > */}
        <AlunoSvg width={Dimensions.get('window').width - 30} height={230}/>
        <View style={{ height: 30 }}/>

        <Text style={styles.label}>Nome</Text>
        <TextInput style={styles.input} placeholder="Ex: João Silva" value={Nome} onChangeText={t => setNome(t)}/>

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Ex: joao@gmail.com" value={Email} onChangeText={t => setEmail(t)}/>

        <Text style={styles.label}>Senha</Text>
        <TextInput style={styles.input} placeholder="**********" value={Pass} onChangeText={t => setPass(t)}/>
        
        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 5 }}>
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
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.label}>Altura</Text>
            <TextInputMask 
              type={'custom'}
              options={{
                mask: '9.99'
              }}
              keyboardType='decimal-pad'
              style={styles.sinput} placeholder="Ex: 1.52" value={Altura} onChangeText={t => setAltura(t)}
            />
          </View>
        </View>

        <View style={[styles.row, { marginTop: 3 }]}>
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={styles.label}>Peso (kg)</Text>
            <TextInputMask type={'only-numbers'} style={styles.sinput} placeholder="Ex: 72.5" value={Peso} onChangeText={t => setPeso(t)}/>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.label}>Idade</Text>
            <TextInputMask type={'only-numbers'} style={styles.sinput} placeholder="Ex: 42" value={Idade} onChangeText={t => setIdade(t)}/>
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={styles.label}>Sexo</Text>
            <RNPickerSelect
              textInputProps={{ style: styles.sinput }}
              onValueChange={(value) => setSexo(value)}
              value={Sexo}
              items={[
                  { label: 'Selecione', value: 'Selecione' },
                  { label: 'Masculino', value: 'Masculino' },
                  { label: 'Feminino', value: 'Feminino' },
              ]}
            />
          </View>
        </View>
      {/* </KeyboardAvoidingView> */}
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
