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
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1
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
  txtInfo: {
    fontSize: 13,
    fontWeight: '400',
    color: 'grey',
    marginBottom: 2
  },
  textComum: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1976D2'
  },
  btnVerTreino: {
    position: 'absolute',
    bottom: 5,
    right: 5
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

export default styles;