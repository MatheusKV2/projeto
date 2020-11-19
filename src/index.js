import React, { useEffect, useState } from 'react';
import Routes from './routes';
import Main from './navigators/main';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { storage } from './config/storage'
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user1, setUser] = useState(null);
  const [type, setType] = useState('');
  const [sexo, setSexo] = useState('');
  const [nome, setNome] = useState('');

  // FUNCAO QUE EXECUTARA TODA VEZ QUE UM USUARIO E LOGADO OU CRIADO AUTOMATICAMENTE
  async function onAuthStateChanged(user) {
    //CASO TENHA UM USUARIO
    if(user != null) {
      //PEGO O ID PARA VER SE JA EXISTE UM LOGADO
      var id = await storage.get('id');
      //SE JA TIVER PEGO SÓ O TYPO E SETO NA STATE
      var type = await storage.get('type');
      //SE JA TIVER PEGO SÓ O TYPO E SETO NA STATE
      var sexo = await storage.get('sexo');
      //SE JA TIVER PEGO SÓ O TYPO E SETO NA STATE
      var nome = await storage.get('nome');

      //SE NAO TIVER
      if(!id) {
        //SETO O ID GLOBAL
        await storage.setUserId(user.uid);
        //BUSCO USUARIO NO BANCO PARA PEGAR O TIPO DELE SE É (PROFESSOR, ALUNO)
        var r = await database().ref('/users/'+user.uid).once('value');
        //SALVO GLOBALMENTE
        await storage.set('type', r.val().type);
        await storage.set('sexo', r.val().sexo);
        await storage.set('nome', r.val().nome);
        setType(r.val().type);
        setSexo(r.val().sexo);
        setNome(r.val().nome);

        //COLOCO NA STATE PARA LA EM BAIXO ATUALIZAR E VALIDAR SE TIVER JOGA PRO APP SE NAO NAO JOGA
        setUser(user);
      } else {
        setType(type);
        setSexo(sexo);
        setNome(nome);
        //COLOCO NA STATE PARA LA EM BAIXO ATUALIZAR E VALIDAR SE TIVER JOGA PRO APP SE NAO NAO JOGA
        setUser(user);
      }
    } else {
      setType('');
      setNome('');
      setUser(null);
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    //AO ABRIR ATRIBUI A FUNCAO CRIADA PARA O AUTENTICADOR CHAMAR QUANDO HOUVER LOGIN E OU CADASTRO
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  //SE NAO TIVER USUARIO LOGADO, ELE JOGA PRO NAVEGADOR INICIAL (LOGIN)
  if (!user1) {
    return (
      <Routes/>
    );
  }
  
  //SE NAO ELE VAI PRO NAVEGADOR PRINCIPAL
  return (
    <NavigationContainer>
      {/* PASSO O TIPO PRO NAVEGADOR PRINCIPAL PARA EU ACESSAR NAS TELAS */}
      <Main type={type} sexo={sexo} nome={nome}/>
    </NavigationContainer>
  );
}