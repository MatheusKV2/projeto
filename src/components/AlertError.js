import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function AlertError({state, msg, toggle}){
  return <AwesomeAlert
    show={state}
    showProgress={false}
    title="Atenção"
    message={msg}
    closeOnTouchOutside={true}
    closeOnHardwareBackPress={true}
    showConfirmButton={true}
    confirmText="OK"
    confirmButtonColor="#DD6B55"
    onConfirmPressed={() => {
      toggle();
    }}
  />
}