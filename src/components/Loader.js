import React from 'react';
import { View, Modal } from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({ loaderVisible, closeLoader }) => (
  <Modal 
    visible={loaderVisible}
    onDismiss={closeLoader}
    onRequestClose={closeLoader}
    transparent={true}
    animationType="fade"
  >
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
      <LottieView source={require('../../assets/json/loader.json')} style={{ height: 110, backgroundColor: 'transparent' }} loop autoPlay/>
    </View>
  </Modal>
)

export default Loader;