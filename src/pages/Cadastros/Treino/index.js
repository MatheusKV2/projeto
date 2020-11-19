import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, TextInput } from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import database from '@react-native-firebase/database';
import SortableList from 'react-native-sortable-list';
import FAB from 'react-native-fab'
import SuccessAlert from '../../../components/SuccessAlert';
import AlertError from '../../../components/AlertError';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { core } from '../../../config/core';
import styles from './styles';

export default function Treino({ route: { params } }){
  const [ SelectedItems, setSelectedItems ] = useState([]);
  const [ ExerciciosSelected, setExerciciosSelected ] = useState([]);
  const [ Exercicios, setExercicios ] = useState([{
    name: 'Exercicios',
    id: 0,
    children: [
    ],
  }]);
  const [ WeekDays, setWeekDays ] = useState([{
    name: 'Dias da semana',
    id: 0,
    // these are the children or 'sub items'
    children: [
      {
        name: 'Segunda',
        id: 1,
      },
      {
        name: 'Terça',
        id: 2,
      },
      {
        name: 'Quarta',
        id: 3,
      },
      {
        name: 'Quinta',
        id: 4,
      },
      {
        name: 'Sexta',
        id: 5,
      },
      {
        name: 'Sabado',
        id: 6,
      },
      {
        name: 'Domingo',
        id: 7
      }
    ],
  }]);
  const [ SelectedDay, setSelectedDay ] = useState([]);
  const [ ListExercicios, setListExercicios ] = useState([]);
  const [ ListCategorias, setListCategorias ] = useState([]);
  //STATES PARA FORCAR ATUALIZACAO
  const [ Fc, setFc ] = useState(false);

  //STATES PARA CONTROLAR ALERTAS E MENSAGEM NO ALERTA
  const [alerte, setalerte ] = useState(false);
  const [ alertem, setalertem ] = useState('');
  const [ alerts, setalerts ] = useState(false);
  const [ alertsm, setalertsm ] = useState('');

  //ESTILIZACAO PARA O COMPONENTE QUE SELECIONA O DIA E OS EXERCICIOS
  const selectStyles = {
    container: {
            marginTop: Platform.OS === 'ios' ? 110 : 30,
            marginBottom: Platform.OS === 'ios' ? 110 : 30
    },
    itemText: {
      fontSize: 16,
      fontWeight: '400'
    },
    selectedSubItemText: {
      fontSize: 18,
      fontWeight: '700',
      color: 'black'
    },
    subItemText: {
      fontSize: 18,
      fontWeight: '400'
    },
    subItem: {
      padding: 7
    },
    selectToggle: {
      marginTop: 15,
      marginBottom: 10,
      paddingBottom: 10,
      borderBottomWidth: 0.5,
      borderBottomColor: '#909090'
    },
    selectToggleText: {
      fontSize: 17,
      color: 'gray',
      fontWeight: '500',
      paddingLeft: 8
    }
  }
  
  //AO SELECIONAR ALGUM EXERCICIO EXECUTA ESSA FUNCAO
  //VERIFICO SE JA SELECIONOU UM DIA
  //DEPOIS EU PEGO OS EXERCICIOS QUE A PESSOA SELECIONOU
  //E SALVO EM UMA VARIAVEL STATE ExerciciosSelected AONDE QUE USO NA LISTA DE EXERCICIOS EM BAIXO
  //AI EU COLOCO ALGUMAS PROPRIEDADE AMAIS COMO QUANTIDADE E ACAO E ORDEM QUE VOU PRECISAR MUDAR
  function onSelectedChanged(itens){
    if(SelectedDay.length == 0) {
      alert('Por favor selecione um dia da semana!');
      return;
    }

    var arr = [];
    var count = 0;
    itens.map(exercicio => {
      Exercicios.map(item => {
        item.children.map((child) => {
          if(child.id == exercicio) {
            let index = ExerciciosSelected.findIndex(e => e.id == child.id);
            count++;
            arr.push({...child, quantidade: index > -1 ? ExerciciosSelected[index].quantidade : '', acao: index > -1 ? ExerciciosSelected[index].acao : '', ordem: count });
          }
        });
      });
    });

    setExerciciosSelected(arr);
    setSelectedItems(itens);
  }

  //EXECUTA AO ABRIR A TELA PEGANDO OS EXERCICIOS E CATEGORIAS
  //VAI NO BANCO DO FIREBASE E BUSCA
  async function obterExercicios(){
    database().ref('/categorias').orderByChild('id').on('value', rcateg => {
      //CORE.CONVERT CONVERTE A RESPOSTA DO FIREBASE
      setListCategorias(core.convertResponse(rcateg));
    });
    database().ref('exercicios').orderByChild('categoria').on('value', rexer => {
      setListExercicios(core.convertResponse(rexer));
    });
  }

  //EXECUTA QUANDO SELECIONA UM DIA DA SEMANA PRA VER SE JA TEM TREINO
  async function obterTreino(d){
    var res = await database().ref('treinos/'+params.alunoId).child(d[0].toString()).orderByChild('ordem').once('value')
    var treinos = res.val();

    //SE NAO SETO VAZIO
    if(treinos == null) {
      setSelectedItems([]);
      setExerciciosSelected([]);
      return;
    }

    //SE JA TEM UM SALVO NA VARIAVEL STATE ExerciciosSelected QUE USO NA LISTA EM BAIXO
    var ids = treinos.map(item => item.id);
    setSelectedItems(ids);
    setExerciciosSelected(treinos);
  }

  //EXECUTA AO APERTAR NO SALVAR
  async function salvarTreino(){
    //VERIFICA SE TEM DIA DA SEMANA SELECIONADO CASO NAO NAO FAZ NADA
    if(SelectedDay.length == 0) {
      setalertem('Por favor selecione um dia da semana!');
      setalerte(true);
      return;
    }

    //SE EXISTE EXERCICIOS CASO NAO N FAZ NADA
    if(ExerciciosSelected.length == 0) {
      setalertem('Por favor selecione os exercicios!');
      setalerte(true);
      return;
    }

    //PASSO EM CADA EXERCICIO PARA VER SE PREENCHEU QUANTIDADE E ACAO
    let err = 0;
    ExerciciosSelected.map(item => {
      if(item.quantidade == '' || item.acao == 0) err++;
      if(item.acao == '' || item.acao == 0) err++;
    });

    //CASO NAO NAO FAZ NADA
    if(err > 0) {
      setalertem('Por favor preencha todas as quantidades e repeticoes ou duraçoes!');
      setalerte(true);
      return;
    }

    //SALVA O TREINO DO DIA
    database().ref('treinos/'+params.alunoId).child(SelectedDay[0].toString()).set(ExerciciosSelected);

    setalertsm('Alterações salvas ou alteradas com sucesso!');
    setalerts(true);
  }

  //EXECUTA AO ABRIR TELA
  useEffect(() => {
    obterExercicios();
  }, []);

  //APOS A FUNCAO OBTEREXERCICIOS SALVAR AS CATEGORIAS E EXERCICIOS EXECUTA O QuE ESTA AQUI DENTRO
  //QUE JUNTA AS CATEGORIAS E EXERCICIOS E CRIA O OBJETO PARA O COMPONENTE QUE SELECIONA OS EXERCICIOS
  useEffect(() => {
    var arr = [];
    ListCategorias.map(c => {
      var obj = {
        name: c.nome,
        id: c.id+500,
        children: []
      }
      
      ListExercicios.map(e => {
        if(e.categoria == c.id)
          obj.children.push({
            name: e.nome,
            id: e.id,
            tipo: e.tipo,
            categoria: c.nome,
            imgUrl: e.imgUrl,
            videoUrl: e.videoUrl
          });
      });
      
      arr.push(obj);
    });

    setExercicios(arr);
  }, [ListExercicios])
  
  return <View style={{ flex: 1 }}>
    <SectionedMultiSelect
      items={WeekDays}
      hideSelect={false}
      single
      uniqueKey="id"
      subKey="children"
      showChips={false}
      selectText="Escolha o dia"
      showDropDowns={true}
      readOnlyHeadings={true}
      expandDropDowns={true}
      onSelectedItemsChange={d => {
        setSelectedDay(d);
        obterTreino(d);
      }}
      selectedItems={SelectedDay}
      confirmText="Confirmar"
      selectedText="selecionados"
      searchPlaceholderText="Pesquise pelo dia..."
      colors={{
        primary: "#11592a"
      }}
      styles={selectStyles}
    />
    <SectionedMultiSelect
      items={Exercicios}
      hideSelect={false}
      uniqueKey="id"
      subKey="children"
      showChips={false}
      selectText="Escolha os exercicios"
      showDropDowns={true}
      readOnlyHeadings={true}
      expandDropDowns={true}
      onSelectedItemsChange={onSelectedChanged}
      selectedItems={SelectedItems}
      confirmText="Confirmar"
      selectedText="selecionados"
      searchPlaceholderText="Pesquise por exercicios..."
      colors={{
        primary: "#11592a"
      }}
      styles={selectStyles}
    />
    <SortableList
      useNativeDriver={false}
      data={ExerciciosSelected}
      scrollEnabled={true}
      rowActivationTime={100}
      onChangeOrder={(nextOrder) => {
        var exercicios = ExerciciosSelected;

        nextOrder.map((item, i) => {
          exercicios[item].ordem = i+1;
        });

        setExerciciosSelected(exercicios);
      }}
      renderRow={({ data, active, index }) => {
        return (
          <View style={styles.item}>
            <Text style={styles.title}>{data.ordem} - {data.name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
              <View style={{ width: 120 }}>
                <Text style={styles.label}>Quantidade</Text>
                <TextInput keyboardType="decimal-pad" value={ExerciciosSelected[index].quantidade} onChangeText={t => {
                  var aux = ExerciciosSelected;
                  aux[index].quantidade = t;
                  setExerciciosSelected(aux);
                  setFc(!Fc);
                }} style={[styles.input, { marginRight: 5 }]}/>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>{data.tipo == 'repeticao' ? 'Repetição'  : 'Duração'}</Text>
                <TextInput value={ExerciciosSelected[index].acao} onChangeText={t => {
                  var aux = ExerciciosSelected;
                  ExerciciosSelected[index].acao = t;
                  setExerciciosSelected(aux);
                  setFc(!Fc);
                }} style={styles.input}/>
              </View>
            </View>
          </View>
        )
      }}
    />
    <AlertError state={alerte} msg={alertem} toggle={() => setalerte(false)}/>
    <SuccessAlert state={alerts} msg={alertsm} toggle={() => setalerts(false)}/>
    <FAB buttonColor="#17402F" iconTextComponent={<Icon name="check"/>} visible={true} onClickAction={salvarTreino}/>
  </View>
}