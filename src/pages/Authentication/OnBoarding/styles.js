import { StyleSheet, Dimensions } from 'react-native'

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', backgroundColor: '#17402F' },
  header: { marginTop: 60, paddingHorizontal: 20, justifyContent: 'center'},
  textBemvindo: { fontSize: 20, color: 'white', fontWeight: '700' },
  textNameApp: { fontSize: 50, color: '#FBD84A', fontWeight: '700' },
  textMissao: { fontSize: 14, color: 'white', fontWeight: '400' },
  btnContinuar: { height:50, alignItems: 'center', backgroundColor: '#FBD84A', padding: 15, marginHorizontal: 20, borderRadius: 10, marginTop: 10 },
  textContinuar: { color: '#17402F', fontWeight: '700', textAlign:'center', lineHeight: 22 }
 })

export default styles