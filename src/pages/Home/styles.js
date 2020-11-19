import { StyleSheet, Dimensions, Platform } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS == 'ios' ? 50 : 0,
    backgroundColor: '#17402F'
  },
  header: {
    paddingTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 30,
    color: 'white',
    fontWeight: '700',
  },
  userImg: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  headerLine: {
    borderWidth: 1,
    borderColor: '#FBD84A',
    marginBottom: 40,
    width: '100%'
  },
  todayCard: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 7
  },
  item: { backgroundColor: '#e5e5e5', padding: 10, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  itemTxt: { fontSize: 30, color: '#17402F', fontWeight: '700', marginTop: 5 },
  subtitle1: { fontWeight: '700', fontSize: 18, color: 'white', marginBottom: 10 }, 
  subtitle: { fontWeight: '700', fontSize: 20, color: 'white', marginTop: 30, marginBottom: 10 },
  weekDayItem: { paddingHorizontal: 10, paddingVertical: 5, backgroundColor: 'white', marginRight: 10, borderRadius: 10, height: 130, justifyContent: 'center', alignItems: 'center' }
})

export default styles