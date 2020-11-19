import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    
  },
  imgPerfil: {
    height: height * 0.4
  },
  content: {
    position: 'absolute',
    top: height * 0.38,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.62,
    width,
    paddingTop: 30,
    paddingHorizontal: 15,
    backgroundColor: '#fafafa'
  },
  back: { position: 'absolute', top: Platform.OS == 'ios' ? 50 : 25, left: 10, backgroundColor: '#FBD84A', paddingHorizontal: 7, paddingVertical: 5, borderRadius: 5 },
  backTxt: { fontSize: 15, color: 'black', fontWeight: '600' },
  camera: { height: 40, width: 40, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FBD84A', position: 'absolute', bottom: 25, right: 10, borderRadius: 20 },
  nomeInput: { fontSize: 24, fontWeight: '700', color: 'black', marginBottom: 30 },
  input: { fontSize: 20, fontWeight: '500', color: 'black', margin: 0, padding: 0 , textAlign: 'right'},
  label: { fontSize: 20, fontWeight: '700', color: 'black' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  btnSalvar: { height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#17402F', borderRadius: 5, marginTop: 5 },
  btnSalvarTxt: { fontSize: 16, fontWeight: '700', color: 'white' },
  btnTrocarSenha: { height: 40, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e5e5e5', borderRadius: 5, marginTop: 5 },
  btnTrocarSenhaTxt: { fontSize: 16, fontWeight: '700' }
});

export default styles;