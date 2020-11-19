import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export default function SureAlert({state, cancel, confirm}){
  return <AwesomeAlert
    show={state}
    showProgress={false}
    title="Atenção"
    message={"Você tem certeza?"}
    closeOnTouchOutside={false}
    closeOnHardwareBackPress={false}
    showCancelButton={true}
    showConfirmButton={true}
    cancelText="Não"
    cancelButtonColor="grey"
    confirmText="Sim"
    confirmButtonColor="#17402F"
    onCancelPressed={cancel}
    onConfirmPressed={confirm}
  />
}