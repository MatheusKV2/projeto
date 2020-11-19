import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17402F',
    paddingHorizontal: 15,
  },
  input: {
    height: 40,
    backgroundColor: '#E8E8EA',
    fontWeight: '700',
    width: '100%',
    borderRadius: 10,
    paddingLeft: 10,
  },
  row: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    minHeight: 60,
    backgroundColor: 'white',
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  itemImg: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    marginRight: 15
  },
  txtNome: {
    fontSize: 18,
    fontWeight: '600',
  },
  txtFormacao: {
    fontSize: 12,
    fontWeight: '400',
    color: 'grey',
    marginBottom: 2
  },
  textComum: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1976D2'
  },
  emptyComponent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyComponentLottie: {
    height: 150,
    marginTop: 10,
    backgroundColor: 'transparent'
  },
  emptyComponentTxt: {
    color: 'white',
    fontWeight: '700',
    marginTop: 10
  }
})
//#2196F3
export default styles;