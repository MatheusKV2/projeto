import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import database from '@react-native-firebase/database';
import LottieView from 'lottie-react-native';

import { storage } from '../../config/storage'
import user from '../../../assets/img/user.png';
import biceps from '../../../assets/img/biceps.png';
import costas from '../../../assets/img/costas.png';
import panturrilhas from '../../../assets/img/panturrilhas.png';
import peito from '../../../assets/img/peito.png';
import pernas from '../../../assets/img/perna.png';
import triceps from '../../../assets/img/triceps.png';
import ombro from '../../../assets/img/ombro.png';
import abdomen from '../../../assets/img/abdomen.png';
import gluteos from '../../../assets/img/gluteos.png';

import segunda from '../../../assets/img/segunda.png';
import terca from '../../../assets/img/terca.png';
import quarta from '../../../assets/img/quarta.png';
import quinta from '../../../assets/img/quinta.png';
import sexta from '../../../assets/img/sexta.png';
import sabado from '../../../assets/img/sabado.png';
import domingo from '../../../assets/img/domingo.png';

import play from '../../../assets/img/play.png';

import styles from './styles';

function Home(props){
  const { route: { params: { nome } } } = props;
  const [ Name, setName ] = useState(nome);
  const [ Frases, setFrases ] = useState([
    'Imagine uma nova história para sua vida e acredite nela.', 'Acredite que você pode, assim você já está no meio do caminho.', 'A disciplina é a mãe do êxito.', 'A persistência realiza o impossível.', 'Acredite em si próprio e chegará um dia em que os outros não terão outra escolha senão acreditar com você.', 'Foco, força e fé: vamos para mais um dia de treino!', 'Só para avisar: o projeto verão é todos os dias.', 'Quando achar a minha motivação, avisa para ela que hoje era para ser dia de ir à academia.', 'Queria ter o poder de decretar que, quanto mais comemos, mais fit ficamos.', 'Não importa o quão lentamente você vai, desde que não pare.', 'Podemos encontrar muitas derrotas, mas não devemos ser derrotados.', 'A vida é igual andar de bicicleta. Para manter o equilíbrio é preciso se manter em movimento.', 'Só se pode alcançar um grande êxito quando nos mantemos fiéis a nós mesmos.', 'O homem não teria alcançado o possível se, repetidas vezes, não tivesse tentado o impossível.'
  ]);
  const [ Img, setImg ] = useState(null);
  const [ TreinoHoje, setTreinoHoje ] = useState(null);
  const [ UserId, setUserId ] = useState(null);

  async function obterUsuario(){
    var id = await storage.get('id');
    setUserId(id);

    database().ref('users/'+id).on('value', (response) => {
      var user = response.val();
      if(user == null) return;
      setName(user.nome);
      setImg(user.img);
    });

    var day = new Date().getDay();

    database().ref('treinos/'+id+'/'+(day == 0 ? 7 : day)).on('value', (response) => {
      var treino = response.val();
      var categorias = [];
      if(treino == null) return;
      

      //pega os nomes das categorias do treino de hoje
      treino.map(item => {
        if(categorias.findIndex(c => c == item.categoria) > -1) return;

        categorias.push(item.categoria);
      });

      setTreinoHoje(categorias);
    });
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      obterUsuario();
    });

    return unsubscribe;
  }, []);

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={{ maxWidth: '80%' }}>
            <Text style={styles.title}>{Name},</Text>
            <Text style={[styles.title, { fontSize: 18, fontStyle: 'italic', marginTop: 10 }]}>"{Frases[Math.floor(Math.random() * Frases.length)]}"</Text>
          </View>
          <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
            <Image style={styles.userImg} source={Img ? { uri: Img } : user}/>
          </TouchableOpacity>
        </View>
        
        

        <View style={styles.headerLine}/>

        <Text style={styles.subtitle1}>Treino de Hoje</Text>
        { TreinoHoje != null ? <TouchableOpacity style={styles.todayCard} onPress={() => {
          var day = new Date().getDay();
          props.navigation.navigate('VerTreino', { dia: day == 0 ? 7 : day, userId: UserId });
        }}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Resumo</Text>

            <Text style={styles.itemTxt}>{TreinoHoje.join(', ')}</Text>

            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              { TreinoHoje.includes('Biceps') &&  <View style={styles.item}>
                <Image source={biceps} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Costa') &&  <View style={styles.item}>
                <Image source={costas} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Panturrilhas') &&  <View style={styles.item}>
                <Image source={panturrilhas} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Peito') &&  <View style={styles.item}>
                <Image source={peito} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Pernas') &&  <View style={styles.item}>
                <Image source={pernas} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Triceps') &&  <View style={styles.item}>
                <Image source={triceps} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Ombro') &&  <View style={styles.item}>
                <Image source={ombro} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Abdomen') &&  <View style={styles.item}>
                <Image source={abdomen} style={{ height: 40, width: 40 }}/>
              </View> }
              { TreinoHoje.includes('Gluteos') &&  <View style={styles.item}>
                <Image source={gluteos} style={{ height: 40, width: 40 }}/>
              </View> }
            </View>
            <TouchableOpacity onPress={() => {
              var day = new Date().getDay();
              props.navigation.navigate('VerTreino', { dia: day == 0 ? 7 : day, userId: UserId });
            }} style={{ position: 'absolute', bottom: 5, right: 10 }}>
              <Image source={play} style={{ height: 30, width: 30 }}/>
            </TouchableOpacity>
          </TouchableOpacity> :
          <View style={styles.todayCard}>
            <Text style={{ fontSize: 16, fontWeight: '600' }}>Você ainda não tem nenhum treino para hoje, entre em contato com seu professor!</Text>
            <LottieView source={require('../../../assets/json/sem_treino.json')} style={{ height: 50, backgroundColor: 'transparent', alignSelf: 'flex-end' }} loop autoPlay/>
          </View>}

        <Text style={styles.subtitle}>Treinos</Text>
        
        <ScrollView horizontal={true} pagingEnabled={false} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 1, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Segunda feira</Text>
            <Image source={segunda} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 2, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Terca feira</Text>
            <Image source={terca} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 3, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Quarta feira</Text>
            <Image source={quarta} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 4, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Quinta feira</Text>
            <Image source={quinta} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 5, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Sexta feira</Text>
            <Image source={sexta} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 6, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Sabado</Text>
            <Image source={sabado} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.weekDayItem} onPress={() => props.navigation.navigate('VerTreino', { dia: 7, userId: UserId })}>
            <Text style={{ color: 'grey', fontWeight: '700' }}>Domingo</Text>
            <Image source={domingo} style={{ height: 60, width: 60 }}/>
            <Image source={play} style={{ height: 20, width: 20, marginTop: 3 }}/>
          </TouchableOpacity>
        </ScrollView>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          { props.route.params.type == 'admin'  ? <TouchableOpacity style={{ flex: 1, height: 30, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginRight: 5, alignItems: 'center' }} onPress={() => props.navigation.navigate('ProfessoresList')}>
            <Text style={{ fontSize: 15, fontWeight: '700' }}>PROFESSORES</Text>
          </TouchableOpacity> : null }
          { props.route.params.type == 'admin' || props.route.params.type == 'professor' ? <TouchableOpacity style={{ flex: 1, height: 30, backgroundColor: 'white', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 5, marginLeft: 5, alignItems: 'center' }} onPress={() => props.navigation.navigate('AlunosList')}>
            <Text style={{ fontSize: 15, fontWeight: '700' }}>ALUNOS</Text>
          </TouchableOpacity> : null }
        </View>
      </ScrollView>
  )
}

export default Home;