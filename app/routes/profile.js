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
  Image,
} from 'react-native';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebase(['/users/UZjMhrxoWQZGAXJhBh4jw1gBpHx1'])
@connect(({firebase}) => ({
  auth: pathToJS(firebase, 'auth'),
  user: dataToJS(firebase, '/users/UZjMhrxoWQZGAXJhBh4jw1gBpHx1'),
}))
class Profile extends Component {

  render() {
    const { auth, navigation} = this.props;
    var url, name;
  
    if (auth && auth.providerData) {
      url = auth.providerData[0].photoURL;
      name = auth.displayName;
    } else {
      return null;
    }
  
    
    // MARK : - View
    return (
          <View style={Base.body}>
            <ScrollView style={Base.content}>
              
              <View style={Base.center}>
                  <View style={[Base.imageWrapper, { marginTop: 64 }]}>
                    <Image source={{uri: url}} style={Base.image}></Image>
                  </View>
              </View>
              
              <View style={Base.center}>
                <Icon.Button name="location-arrow" style={{margin: 8, marginBottom: 0, marginTop: 0}} backgroundColor="transparent" color="grey" size={10}>
                  Halmstad, Sverige
                </Icon.Button>
              </View>
              
              <View style={auth ? Base.editable : {}}>
                <TextInput value={name} editable={auth ? true : false } placeholder="Vad heter du?" onChangeText={(name) => this.setState({name})} style={[Base.title, Base.input]} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
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

Profile.navigationOptions = {
  header: null,
  tabBarLabel: 'You'
};

export default Profile
