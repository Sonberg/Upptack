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
  CameraRoll
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
class Facebook extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      name: "Kalle",
      image: null
    }
    
  }


  render() {
    
    return (
          <View style={Base.body}>
            <View style={[Base.bar]}>
              <Text style={Base.title}></Text>
              <View style={Base.seperator}></View>
            </View>
            <ScrollView style={Base.content}>
              
          
              
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

Facebook.navigationOptions = {
  title: "",
  tabBarLabel: "Skapa",
  header: null
};

export default Facebook
