import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({ 
  container: { flex: 1, backgroundColor:'#17402F', justifyContent: 'center', paddingHorizontal: 20 },
  header: { height: Dimensions.get('window').height * 0.3, justifyContent: 'center', resizeMode: 'stretch', paddingHorizontal: 30 },
  rowCenter: { flexDirection: 'row', alignItems:'center' },

  textEntrar: { textAlign: 'left', fontSize: 18, color: 'white', fontWeight: '700', marginBottom: 4 },
  textAviso: { textAlign: 'left', fontSize: 12, color: 'white', fontWeight: '500', marginBottom: 15, marginTop: 5 },
  input: { padding: 15, borderRadius: 10, paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#F8F6F6' },
  textSenha: { textAlign: 'right', fontSize: 12, color: 'white', fontWeight: '700' },
  btnEntrar: { height:50, justifyContent:'center', alignItems: 'center', backgroundColor: '#FBD84A', padding: 15, borderRadius: 10, marginTop: 10 },
  textBtnEntrar: { color: '#17402F', fontWeight: '700', textAlign:'center', lineHeight: 22 },
 })

export default styles