import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Modal, Image } from 'react-native';
import database from '@react-native-firebase/database';
import LottieView from 'lottie-react-native';
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Camera from '../../components/Camera';
import Video from '../../components/Video';
import styles from './styles';

export default function Treino({ navigation, route: { params: { userId, dia } } }) {
  const [ Treino, setTreino ] = useState(null);
  const [ Qrcode, setQrcode ] = useState(null);
  const [ CameraVisible, setCameraVisible ] = useState(false);
  const [ VideoVisible, setVideoVisible ] = useState(false);
  const [ VideoAtual, setVideoAtual ] = useState(null);
  const [ FotoVisivel, setFotoVisivel ] = useState(false);
  const [ FotoAtual, setFotoAtual ] = useState(false);

  async function obterTreino(){
    database().ref('treinos/'+userId+'/'+dia).orderByChild('ordem').on('value', (response) => {
      var treino = response.val();
      setTreino(treino);
    });
  }

  useEffect(() => {
    obterTreino();
  }, []);

  return <View style={styles.container}>
    <Text style={{ textAlign: 'left', fontSize: 18, fontWeight: '700', color: 'white', padding: 10 }}>{
      dia == 7 ? 'Domingo' :
      dia == 1 ? 'Segunda Feira' :
      dia == 2 ? 'Terça Feita' :
      dia == 3 ? 'Quarta Feira' :
      dia == 4 ? 'Quinta Feira' :
      dia == 5 ? 'Sexta Feira' : 
      dia == 6 ? 'Sábado' : 
      ''
    }</Text>
    {
      Treino 
        ?
          <FlatList 
            data={Treino}
            renderItem={({ item }) => <View style={{ backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, marginBottom: 10, borderRadius: 5, marginHorizontal: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: '700' }}>{item.ordem}º - {item.name}</Text>
              <Text style={{ fontSize: 16, fontWeight: '700', color: 'grey' }}>{item.quantidade == '1' ? item.quantidade+' vez' : item.quantidade+' vezes'} {item.acao} {item.tipo == 'repeticao' ? 'repetições' : 'minuto(s)'}</Text>
              <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => {
                setFotoAtual(item.imgUrl);
                console.log(item.imgUrl);
                setFotoVisivel(true);
              }}>
                <Icon name='camera' size={30}/>
              </TouchableOpacity>
            </View>}
          />
        :
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: 'red', fontWeight: '700', textAlign: 'center' }}>Nenhum treino encontrado para este dia :(</Text>
          <LottieView source={require('../../../assets/json/sem_treino.json')} style={{ height: 60, marginTop: 2, backgroundColor: 'transparent' }} loop autoPlay/>
        </View>
    }
    <Camera visible={CameraVisible} toggle={() => setCameraVisible(false)} qrcode={Qrcode} setqrcode={t => {
      //QUANDO LE O QRCODE ELE ME RETORNA AQUI NO T EU SETO ELE
      //FECHO A CAMERA
      setQrcode(t);
      setCameraVisible(false);

      //BUSCAR EXERCICIO URL DO VIDEO E MOSTRAR VIDEO E É ISSO
      database().ref('exercicios/'+t).once('value', response => {
        var treino = response.val();
        if(treino) { 
          setVideoAtual(treino.videoUrl);
          setVideoVisible(true);
        }
      });
    }}/>
    <Video visible={VideoVisible} toggle={() => setVideoVisible(false)} video={VideoAtual} />
    <Modal onDismiss={() => setFotoVisivel(false)} onRequestClose={() => setFotoVisivel(false)} visible={FotoVisivel}>
      <View style={styles.fotoModal}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => setFotoVisivel(false)}>
          <Icon name='close' size={28} color='white'/>
        </TouchableOpacity>
        <Image source={{ uri: FotoAtual }} style={styles.img} resizeMode='contain'/>
      </View>
    </Modal>
    <FAB buttonColor="black" iconTextComponent={<Icon name="qrcode"/>} visible={true} onClickAction={() => setCameraVisible(true)}/>
  </View>
}