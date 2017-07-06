/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {firebase, helpers} from 'redux-react-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/base';
import _ from 'lodash';
import {
  Dimensions,
  TextInput,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Image,
  Switch,
} from 'react-native';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebase(['/events'])
@connect(({firebase}) => ({
  events: [{name: "Hyltebruk Festival", color: '#D2CAC8', going: true}],
  auth: pathToJS(firebase, 'auth'),
  profile: pathToJS(firebase, 'profile')
}))
//dataToJS(firebase, '/events')
//
class Form extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: "Kalle",
      image: null,
      event: props.event ? props.event : {}
    }
    
  }
  
  update(event) {
    this.setState({event : event})
  }


  render() {
    const { events, navigation} = this.props;
    const auth = true;
    // MARK : - View
    return (
          <View style={Base.body}>
            <ScrollView>
              
                <View style={Base.content}>
                
                <View style={Base.center}>
                  <TouchableHighlight >
                    <View style={[Base.imageWrapper, { marginTop: 64 }]}>
                      <Image source={this.state.image ? this.state.image : require('../images/cat.jpg')} style={Base.image}></Image>
                    </View>
                  </TouchableHighlight>
                </View>
                
                
                <View style={[auth ? Base.editable : {}, {marginTop: 24, padding: 4}]}>
                  <TextInput value={this.state.event ? this.state.event.name : ""} editable={auth ? true : false } placeholder="Vad är det för evenemang?" onChangeText={(name) => {this.state.event.name = name; this.update(this.state.event)}} style={[Base.title, Base.input]} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
                </View>
                
                
                <View style={[auth ? Base.editable : {}, {marginTop: 18, padding: 4}]}>
                  <TextInput value={this.state.event ? this.state.event.location : ""} editable={auth ? true : false } placeholder="Var ska ni vara?" onChangeText={(location) => {this.state.event.location = location; this.update(this.state.event)}} style={[Base.title, Base.input]} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
                </View>
                    
                
                <View style={Base.row}>            
                  <View style={[auth ? Base.editable : {}, {marginTop: 18, padding: 4, width: (Dimensions.get('window').width - 54) / 2}]}>
                    <TextInput value="23/5 20.00" editable={auth ? true : false } placeholder="När börjar evenemanget?" onChangeText={(start) => {this.setState({event})}} style={[Base.sub, Base.input]} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
                  </View>
                  <Text style={[Base.sub, {paddingTop: 22}]}>-</Text>
                  <View style={[auth ? Base.editable : {}, {marginTop: 18, padding: 4, width: (Dimensions.get('window').width - 54) / 2}]}>
                    <TextInput value="24/5 03.00" editable={auth ? true : false } placeholder="När slutar evenemanget?" onChangeText={(end) => {this.setState({event})}} style={[Base.sub, Base.input]} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
                  </View>            
                </View>
                
                <View style={[Base.row, { marginTop: 18}]}>
                  <View style={Base.column}>
                    <Text style={[Base.sub, { color: this.state.event.private ? '#000' : '#999' }]}>Privat evenemang</Text>
                    <Text style={[Base.text, {marginTop: 4, color: this.state.event.private ? '#000' : '#888'}]}>Endast synlig för inbjuda gäster</Text>
                  </View>
                  <Switch value={this.state.event ? this.state.event.private : false} style={{marginTop: 8}} onChange={() => {this.state.event.private = !this.state.event.private; this.update(this.state.event)}}></Switch>
                </View>
                
                
                <View style={[Base.row, { marginVertical: 48, alignContent: 'center'}]}> 
                  <TouchableHighlight onPress={() => {this.setState({ event: {}}); this.props.update({})}}>
                    <Text style={{color: '#000', fontFamily: 'System', fontWeight: '500', marginTop: 12}}>Rensa</Text>
                  </TouchableHighlight>
                  <View style={{borderRadius:  22, backgroundColor: '#157EFB', paddingVertical: 12, paddingHorizontal: 22}}>
                    <Text style={{color: 'white', fontFamily: 'System', fontWeight: '500', fontSize: 18}}>Spara</Text>
                  </View>
                </View>
              </View>
              
            </ScrollView>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },
  tabImage: {
    height: 28,
    width: 28,
    borderRadius: 14,
    marginTop: 28,
  }
});

Form.navigationOptions = {
  header: null,
  title: "",
  tabBarLabel: null,
  tabBarIcon: () => (<Image style={{height: 28, width: 28, resizeMode: 'contain', marginTop: 28}} source={require('../images/logo/small.png')}/>)
};

export default Form
