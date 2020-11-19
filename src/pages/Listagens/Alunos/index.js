import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Text, Image, TextInput, Alert } from 'react-native';
import FAB from 'react-native-fab'
import database from '@react-native-firebase/database';
import Swipeable from 'react-native-swipeable';
import LottieView from 'lottie-react-native';

import { core } from '../../../config/core';
import trash from '../../../../assets/img/trash.png';
import alunom from '../../../../assets/img/alunom.png';
import alunof from '../../../../assets/img/alunof.png';
import treino from '../../../../assets/img/treino.png';
import styles from './styles';

export default function AlunosList({ navigation }){
  const [ Alunos, setAlunos ] = useState([]);
  const [ FilteredAlunos, setFilteredAlunos ] = useState([]); 
  const [ Nome, setNome ] = useState('');
  const [ Filtrando, setFiltrando ] = useState(false);

  async function obterAlunos(){
    //vai no realtime database pega o usuario orderna por type e pega os que tem type igual a aluno
    database().ref(`/users`).orderByChild('type').equalTo('aluno').on('value', (response) => {
      setAlunos(
        //converte a resposta do firebase para um objeto de javascript decente
        core.convertResponse(response)
      );
    });
  }

  async function deletarAluno(id){
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja excluir o aluno?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        { text: 'Sim', onPress: async () => {
          try {
            //deleta do database
            var result = await database().ref(`/users/${id}`).remove();
      
            Alert.alert('Atenção','Aluno exluido com sucesso!');
          } catch (error) {
            Alert.alert('Atenção',error.message);
          }
        }}
      ],
      { cancelable: false }
    );
  }
  
  

  useEffect(() => {
    obterAlunos();
  }, []);

  useEffect(() => {
    if(Nome == '') {
      setFiltrando(false);
      setFilteredAlunos([]);
      return;
    }
    var arr = [];

    Alunos.map(item => {
      if(core.removeAcento(item.nome).indexOf(core.removeAcento(Nome)) > -1) arr.push(item);
    });

    setFiltrando(true);
    setFilteredAlunos(arr);
  }, [ Nome, Alunos ]);

  return <View style={styles.container}>
    <View style={{ height: 10 }}/>
    <View style={styles.row}>
      <TextInput style={styles.input} value={Nome} onChangeText={t => setNome(t)} placeholder="&#8981; Pesquise pelo aluno..." placeholderTextColor="#7F7F81"/>
    </View>
    <FlatList
      data={Filtrando ? FilteredAlunos : Alunos}
      ListEmptyComponent={(
        <View style={styles.emptyComponent}>
          <LottieView source={require('../../../../assets/json/not found.json')} style={styles.emptyComponentLottie} loop autoPlay/>
          <Text style={styles.emptyComponentTxt}>Nenhum Aluno Encontrado</Text>
        </View>
      )}
      renderItem={({ item }) => {
        return <Swipeable key={item.id} rightButtons={[(
          <TouchableOpacity style={{ width: 60, marginTop: 5, height: '90%', backgroundColor: 'grey', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => deletarAluno(item.id)}>
            <Image source={trash} style={{ height: 30, width: 30 }}/>
          </TouchableOpacity>
        )]}>
          <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => {
            navigation.navigate('CadAluno', {
              alunoId: item.id
            });
          }}>
            <View style={styles.itemImg}>
              <Image source={item.sexo == 'Masculino' ? alunom : alunof} style={{ height: 50, width: 50 }}/>
            </View>
            <View>
              <Text style={styles.txtNome}>{item.nome}</Text>
              <Text style={styles.txtInfo}>I: {item.idade} P: {item.peso} A: {item.altura}</Text>
              <Text style={styles.textComum}>{item.email}</Text>
              <Text style={styles.textComum}>{item.senhaCadastro}</Text>
            </View>
            {/* VAI PARA A TELA DE CADASTRA TREINO */}
            <TouchableOpacity style={styles.btnVerTreino} activeOpacity={0.5} onPress={() => navigation.navigate('CadTreino', { alunoId: item.id })}>
              <Image source={treino} style={{ height: 30, width: 30 }}/>
            </TouchableOpacity>
          </TouchableOpacity>
        </Swipeable>
      }}
    />
    <FAB buttonColor="#FBD84A" iconTextColor="black" visible={true} onClickAction={() => navigation.navigate('CadAluno')}/>
  </View>
}