import React from 'react';
import { Modal, TouchableOpacity, Text, Dimensions, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BarcodeMask } from '@nartc/react-native-barcode-mask';
export default function Camera({ navigation, visible, toggle, qrcode, setqrcode }){
  return <Modal visible={visible} onDismiss={toggle} onRequestClose={toggle}>
    <RNCamera
      autoFocus={"on"}
      captureAudio={false}
      type={RNCamera.Constants.Type.back}
      style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      androidCameraPermissionOptions={{
        title: "Permissão para usar a câmera",
        message:
          "Nós precisamos de sua permissão para utilizar a câmera do seu celular",
        buttonPositive: "Ok",
        buttonNegative: "Cancelar"
      }}
      onGoogleVisionBarcodesDetected={({ barcodes }) => {
        if(!isNaN(parseInt(barcodes[0].data))) {
          setqrcode(barcodes[0].data);
        }
      }}
    >
      <TouchableOpacity style={{ position: 'absolute', top: Platform.OS == 'ios' ? 50 : 20, left: 15 }} onPress={toggle}>
        <Text style={{ color: 'white', fontSize: 18 }}>{"< Voltar"}</Text>
      </TouchableOpacity>
      {/* <BarcodeMask width={Dimensions.get('window').width - 100} height={200} showAnimatedLine={false} transparency={1}/> */}
    </RNCamera>
  </Modal>
}
//<BarcodeMask width={Dimensions.get('window').width} height={100} showAnimatedLine={false} transparency={1}/>