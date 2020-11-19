import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17402F'
  },
  fotoModal: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
  img: {
    width,
    minHeight: 300
  },
  closeBtn: {
    position: 'absolute', 
    top: Platform.OS == 'ios' ? 50 : 5,
    left: 15
  }
});

export default styles;