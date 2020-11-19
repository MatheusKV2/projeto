import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const storage = {
  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        return value;
      }
    } catch(e) {
      alert('Erro')
      return null;
    }
  },
  setUserId: async (value) => {
    try {
      await AsyncStorage.setItem('id', value)
    } catch (e) {
      // saving error
    }
  },
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  },
}