import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SuccessAlert({state, msg, toggle}){
  return <AwesomeAlert
    show={state}
    showProgress={false}
    title="Sucesso!"
    message={msg}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    confirmButtonColor="#17402F"
    onConfirmPressed={() => {
      toggle();
    }}
  />
}