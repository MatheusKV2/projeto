import React from 'react';
import database from '@react-native-firebase/database';

export const core = {
  convertResponse: (snapshot) => {
      var arr = snapshot.val()
      if(arr == null) return [];

      var json = [];
      var keys = Object.keys(arr);
      keys.map(item => {
        arr[item].id = item;
        json.push(arr[item]);
      });
      return json;
  },
  removeAcento: (text) => {
      text = text.toLowerCase();                                                         
      text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
      text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
      text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
      text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
      text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
      text = text.replace(new RegExp('[Ç]','gi'), 'c');
      return text;                 
  }   
}