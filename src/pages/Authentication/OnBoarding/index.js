import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import Img from '../../../../assets/svg/onboarding.svg'
import styles from './styles'

function OnBoarding({navigation}){
  return (
      <View style={styles.container}>
        <Img height={Dimensions.get('window').height * 0.25} width={Dimensions.get('window').width - 30}/>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styles.header}>
            <Text style={styles.textBemvindo}>Bem vindo ao,</Text>
            <Text style={styles.textNameApp}>CooperGym</Text>
            <Text style={styles.textMissao}>O app da sua academia.</Text>
            <View style={{ height: 20 }}/>
          </View>
          <TouchableOpacity style={styles.btnContinuar} onPress={() => {
            navigation.navigate('Login');
          }}>
            <Text style={styles.textContinuar}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
  )
}

export default OnBoarding;