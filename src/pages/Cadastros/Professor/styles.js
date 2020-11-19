import { StyleSheet, Dimensions } from 'react-native';
const { width, height }  = Dimensions.get('window');

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#17402F',
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    // fontStyle: 'italic',
    paddingLeft: 2,
    color: 'white'
  },
  input: {
    width: width-30,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 8,

    paddingLeft: 5
  },
  sinput: {
    height: 30,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  btnCadastrar: {
    backgroundColor: '#FBD84A',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,

    marginTop: 15
  },
  btnText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700'
  }
});

export default styles;