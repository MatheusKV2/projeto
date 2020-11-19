import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, TouchableOpacity, View, Text, Image, TextInput, Alert } from 'react-native';
import FAB from 'react-native-fab';
import database from '@react-native-firebase/database';
import Swipeable from 'react-native-swipeable';
import { core } from '../../../config/core';
import trash from '../../../../assets/img/trash.png';
import LottieView from 'lottie-react-native';
import professorm from '../../../../assets/img/professorm.png';
import professorf from '../../../../assets/img/professorf.png';

import styles from './styles';

export default function ProfessoresList({ navigation }){
  const [ Professores, setProfessores ] = useState([]);
  const [ Filtrando, setFiltrando ] = useState(false);
  const [ FilteredProfessores, setFilteredProfessores ] = useState([]);
  const [ Nome, setNome ] = useState('');

  async function obterProfessores(){
    //vai no realtime database pega o usuario orderna por type e pega os que tem type igual a professor
    database().ref(`/users`).orderByChild('type').equalTo('professor').on('value', (response) => {
      
      setProfessores(
        //converte a resposta do firebase para um objeto de javascript decente
        core.convertResponse(response)
      );
    });
  }

  async function deletarProfessor(id){
    Alert.alert(
      'Atenção',
      'Você tem certeza que deseja excluir o professor?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel'
        },
        { text: 'Sim', onPress: async () => {
          try {
            var result = await database().ref(`/users/${id}`).remove();
            Alert.alert('Atenção','Professor exluido com sucesso!');
          } catch (error) {
            Alert.alert('Atenção',error.message);
          }
        }}
      ],
      { cancelable: false }
    );
  }

  useEffect(() => {
    obterProfessores();
  }, []);

  useEffect(() => {
    if(Nome == '') {
      setFiltrando(false);
      setFilteredProfessores([]);
      return;
    }
    var arr = [];

    Professores.map(item => {
      if(core.removeAcento(item.nome).indexOf(core.removeAcento(Nome)) > -1) arr.push(item);
    });

    setFiltrando(true);
    setFilteredProfessores(arr);
  }, [ Nome, Professores ]);

  return <View style={styles.container}>
    <View style={{ height: 10 }}/>
    <View style={styles.row}>
      <TextInput style={styles.input} value={Nome} onChangeText={t => setNome(t)} placeholder="&#8981; Pesquise pelo professor..." placeholderTextColor="#7F7F81"/>
    </View>
    <FlatList
      data={Filtrando ? FilteredProfessores : Professores}
      ListEmptyComponent={(
        <View style={styles.emptyComponent}>
          <LottieView source={require('../../../../assets/json/not found.json')} style={styles.emptyComponentLottie} loop autoPlay/>
          <Text style={styles.emptyComponentTxt}>Nenhum Aluno Encontrado</Text>
        </View>
      )}
      renderItem={({ item }) => {
        return <Swipeable key={item.id} rightButtons={[(
          <TouchableOpacity style={{ width: 60, marginTop: 5, height: '90%', backgroundColor: 'grey', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }} onPress={() => deletarProfessor(item.id)}>
            <Image source={trash} style={{ height: 30, width: 30 }}/>
          </TouchableOpacity>
        )]}>
          <TouchableOpacity style={styles.item} activeOpacity={0.5} onPress={() => {
            navigation.navigate('CadProfessor', {
              professorId: item.id
            });
          }}>
            <View style={styles.itemImg}>
              <Image source={item.sexo == 'Masculino' ? professorm : professorf} style={{ height: 50, width: 50 }}/>
            </View>
            <View>
              <Text style={styles.txtNome}>{item.nome}</Text>
              <Text style={styles.txtFormacao}>{item.formacao}</Text>
              <Text style={styles.textComum}>{item.email}</Text>
              <Text style={styles.textComum}>{item.senhaCadastro}</Text>
            </View>
          </TouchableOpacity>
        </Swipeable>
      }}
    />
    <FAB buttonColor="#FBD84A" iconTextColor="black" visible={true} onClickAction={() => navigation.navigate('CadProfessor')}/>
  </View>
}