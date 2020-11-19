import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import fbstorage from '@react-native-firebase/storage';
import { TextInputMask } from 'react-native-masked-text';

import { storage } from '../../config/storage'
import SuccessAlert from '../../components/SuccessAlert';
import AlertError from '../../components/AlertError';
import SureAlert from '../../components/SureAlert';
import Loader from '../../components/Loader';
import Divider from '../../components/Divider';
import img_men from '../../../assets/img/img_men.jpg';
import img_woman from '../../../assets/img/img_woman.jpg';
import off from '../../../assets/img/off.png';
import camera from '../../../assets/img/camera.png';
import styles from './styles';
import { users } from '../../config/model';

export default function Perfil({ navigation, route: { params: { sexo, type } }}){
  const [ UserId, setUserId ] = useState(null);
  const [ Img, setImg ] = useState(null);
  const [ Nome, setNome ] = useState(null);
  const [ Formacao, setFormacao ] = useState(null);
  const [ Peso, setPeso ] = useState(null);
  const [ Idade, setIdade ] = useState(null);
  const [ Telefone, setTelefone ] = useState(null);
  const [ Altura, setAltura ] = useState(null);
  const [ Email, setEmail ] = useState(null);
  const [ Pass, setPass ] = useState(null);
  const [ Data, setData ] = useState(null);
  const [ loaderVisible, setloaderVisible ] = useState(false);
  const [ Alert, setAlert ] = useState(false);
  const [ SuccessAlertMsg, setSuccessAlertMsg ] = useState('');
  const [ errorAlert, seterrorAlert ] = useState(false);
  const [ errorAlertMsg, seterrorAlertMsg ] = useState(false);
  const [ sureAlert, setsureAlert ] = useState(false);

  async function obterUsuario(){
    setloaderVisible(true);
    var id = await storage.get('id');
    database().ref('users/'+id).on('value', (response) => {
      var user = response.val();
      if(user == null) return;
      setUserId(id);
      setNome(user.nome);
      setEmail(user.email);
      setFormacao(user.formacao);
      setPeso(user.peso);
      setIdade(user.idade);
      setTelefone(user.telefone);
      setAltura(user.altura);
      setPass(user.senhaCadastro);
      setData(user.data);
      setImg(user.img);
      setloaderVisible(false);
    });
  }

  async function trocarFoto(){
    ImagePicker.showImagePicker({}, async (response) => {
      //verifica se selecionou alguma coisa
      if(response.uri == undefined) return;


      setImg(response.uri);

      
      await fbstorage().ref('users/'+UserId+'.png').putFile(response.uri);
      var img = await fbstorage().ref('users/'+UserId+'.png').getDownloadURL();
      database().ref('users/'+UserId).update({
        img
      });
      
    });
  }

  async function mandarEmail(){
    try {
      setloaderVisible(true);
      await auth().sendPasswordResetEmail(Email);
      setloaderVisible(false);
      setSuccessAlertMsg('Um email será enviado em breve para você realizar a troca de sua senha!');
      setAlert(true);
      
    } catch (error) {
      setloaderVisible(false);
      setSuccessAlertMsg('Por favor tente novamente mais tarde! '+error.code);
      setAlert(true);
    }
  }

  async function updateUser(){
    if(Nome == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o nome.');
      return;
    } else if(type == 'aluno' && Peso == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o peso.');
      return;
    } else if(type != 'admin' && Telefone == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha o telefone.');
      return;
    } else if(type == 'aluno' && Idade == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a idade.');
      return;
    } else if(type == 'aluno' && Altura == '') {
      seterrorAlert(true);
      seterrorAlertMsg('Por favor preencha a altura.');
      return;
    }
    
    storage.set('nome', Nome);
    
    var user = new users(Email, Nome, Peso, Idade, Formacao, type, Pass, Telefone, Altura, Data, sexo);
    database().ref('users/'+UserId).update(user);

    setSuccessAlertMsg('Dados alterados com sucesso!');
    setAlert(true);
  }

  useEffect(() => {
    obterUsuario()
  }, []);

  return <View style={styles.container}>
    <TouchableOpacity onPress={trocarFoto}>
      <ImageBackground style={styles.imgPerfil} source={sexo == 'Masculino' ? (Img ? { uri: Img } : img_men) : (Img ? { uri: Img } : img_woman)}>
        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} activeOpacity={0.5}>
          <Text style={styles.backTxt}>{"Voltar"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={trocarFoto} style={styles.camera}>
          <Image
            source={camera} 
            style={{
              height: 25
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ImageBackground>
    </TouchableOpacity>
    <View style={styles.content}>
      <View style={{ flex: 1 }}>
        <View>
          <TextInput value={Nome} onChangeText={t => setNome(t)} style={styles.nomeInput} maxLength={28}/>
          <TouchableOpacity 
          style={{ position: 'absolute', right: 0, top: Platform.OS == 'ios' ? 0 : 10, color: 'red' }}
          onPress={() => {  
            setsureAlert(true);
          }}>
            <Image style={{ height: 28, width: 28 }} source={off}/>
          </TouchableOpacity>
          
        </View>
        { type == 'professor' && <>
          <View style={styles.row}>
            <Text style={styles.label}>Formação: </Text>
            <TextInput value={Formacao} onChangeText={t => setFormacao(t)} style={styles.input}/>
          </View>
        </> }
        { type == 'aluno' && <>
          <View style={styles.row}>
            <Text style={styles.label}>Altura: </Text>
            <TextInputMask 
              type={'custom'}
              options={{
                mask: '9.99'
              }}
              keyboardType='decimal-pad'
              style={styles.input}
              placeholder="Ex: 1.52"
              value={Altura != null ? Altura.toString() : ''}
              onChangeText={t => setAltura(t)}
            />
          </View>
        </> }
        { type == 'aluno' && <>
          <Divider/>
          <View style={styles.row}>
            <Text style={styles.label}>Peso: </Text>
            <TextInputMask type={'only-numbers'} style={styles.input} placeholder="Ex: 72.5" value={Peso != null ? Peso.toString() : ''} onChangeText={t => setPeso(t)}/>
          </View>
        </> }
        { type == 'aluno' && <>
        <Divider/>
        <View style={styles.row}>
          <Text style={styles.label}>Idade: </Text>
          <TextInput keyboardType="decimal-pad" value={Idade != null ? Idade.toString() : ''} onChangeText={t => setIdade(t)} style={styles.input}/>
        </View>
        </> }
        { type != 'admin' && <>
          <Divider/>
          <View style={styles.row}>
            <Text style={styles.label}>Telefone: </Text>
            <TextInputMask 
              type={'cel-phone'}
              options={{
                maskType: 'BRL',
                withDDD: true,
                dddMask: '(99) '
              }}
              style={styles.input}
              placeholder="(12) 99999-9999"
              value={Telefone}
              onChangeText={t => setTelefone(t)}
            />
          </View>
          <Divider/>
          </>
        }
      </View>
      
      <View style={{ marginBottom: 30 }}>
        <TouchableOpacity style={styles.btnSalvar} onPress={updateUser}>
          <Text style={styles.btnSalvarTxt}>SALVAR</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={mandarEmail} style={styles.btnTrocarSenha}>
          <Text style={styles.btnTrocarSenhaTxt}>TROCAR SENHA</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Loader loaderVisible={loaderVisible} closeLoader={() => setloaderVisible(false)}/>

    <AlertError state={errorAlert} msg={errorAlertMsg} toggle={() => seterrorAlert(false)}/>
    <SuccessAlert state={Alert} msg={SuccessAlertMsg} toggle={() => setAlert(false)}/>
    <SureAlert state={sureAlert} cancel={() => setsureAlert(false)} confirm={async () => {
      await AsyncStorage.clear();
      auth().signOut();
    }}/>
  </View>
}