import { StyleSheet, Dimensions } from 'react-native';

const Base = StyleSheet.create({
  //#eee
  body: {
    flex: 1,
    backgroundColor: '#fff'
  },
  seperator:{
    height: 1,
    backgroundColor: '#e9e9e9',
    alignSelf: 'flex-end'
  },
  
  // Nvigation Bar
  bar: {
    paddingTop: 28,
    height: 72,
    backgroundColor: 'white',
    paddingLeft: 16,
    paddingRight: 16,
    //borderBottomColor:'#eee',
    //borderBottomWidth: 1
  },
  
  // Flex Row / column
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'stretch'
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'stretch'
  },
  content: {
    padding: 16,
    width: Dimensions.get('window').width
  },
  
  // Typo
  header: {
    fontFamily: 'System',
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#444'
  },
  title: {
    fontFamily: 'System', 
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
  title2: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
  sub: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: '#666'
  },
  text: {
    fontFamily: 'Rubik-Regular',
    fontSize: 14, 
    fontWeight: '400',
    color: '#888'
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  // TextInput
  input: {
    height: 32,
    textAlign: 'center'
  },
  editable: {
    //borderBottomColor: '#ddd',
    //borderBottomWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 3
  },
  image: {
    height: 140,
    width: 140,
    borderRadius: 70,
    marginBottom: 0
  },
  imageWrapper: {
    height: 152, 
    width: 152, 
    borderRadius: 74, 
    borderWidth: 1, 
    borderColor: '#bbb', 
    marginTop: 42, 
    padding: 5, 
    marginBottom: 4
  }
});

export default Base;