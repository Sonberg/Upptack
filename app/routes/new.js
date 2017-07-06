/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import {firebase, helpers} from 'redux-react-firebase'
import Base from '../styles/base';
//import Form from '../components/form';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import {
  Dimensions,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Image
} from 'react-native';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;
const window = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

@firebase(['/events'])
@connect(({firebase}) => ({
  events: [{name: "Hyltebruk Festival", color: '#D2CAC8', going: true}],
  auth: pathToJS(firebase, 'auth'),
  profile: pathToJS(firebase, 'profile')
}))
//dataToJS(firebase, '/events')
//
class New extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: new Animated.Value(0),
      height: new Animated.Value((Dimensions.get('window').height - 140) / 2),
      event: {}
    };
  }

  update(event) {
    this.setState({event: event});
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [
        0, HEADER_SCROLL_DISTANCE
      ],
      outputRange: [
        HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT
      ],
      extrapolate: 'clamp'
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [
        0, HEADER_SCROLL_DISTANCE / 2,
        HEADER_SCROLL_DISTANCE
      ],
      outputRange: [
        1, 1, 0
      ],
      extrapolate: 'clamp'
    });
    
    const headerOpacity = this.state.scrollY.interpolate({
      inputRange: [
        0, HEADER_SCROLL_DISTANCE / 2,
        HEADER_SCROLL_DISTANCE
      ],
      outputRange: [
        0, 0, 1
      ],
      extrapolate: 'clamp'
    });
    
    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [
        0, HEADER_SCROLL_DISTANCE
      ],
      outputRange: [
        0, -50
      ],
      extrapolate: 'clamp'
    });

    const barMarginTop = this.state.scrollY.interpolate({
      inputRange: [
        24, HEADER_SCROLL_DISTANCE * 0.7
      ],
      outputRange: [
        HEADER_SCROLL_DISTANCE, 28
      ],
      extrapolate: 'clamp'
    });
    const {auth, events, navigation} = this.props;
    console.log(this);
    
    // MARK : - View
    return (
          <View style={Base.body}>
            <View style={Base.bar}>
              <View style={Base.seperator}></View>
            </View>
              
              <View style={Base.content}>

                <Animated.View underlayColor={'rgba(0,0,0,0)'} style={[Base.center , { height: this.state.height, borderBottomColor: '#fefefe', borderBottomWidth: 1  }]}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('Facebook', { event: this.state.event })}>
                    <Text style={Base.title}>Synka från Facebook</Text>
                  </TouchableHighlight>

                </Animated.View> 
                       
                <Animated.View underlayColor={'rgba(0,0,0,0)'} style={[Base.center, { height: this.state.height }]}>
                  <TouchableHighlight onPress={() => this.props.navigation.navigate('Form', { event: this.state.event })}>
                    <Text style={Base.title}>Fyll i själv</Text>
                  </TouchableHighlight>
                </Animated.View>
                
              </View>
              
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
  }

});

New.navigationOptions = {
  header: null,
  tabBarLabel: "Skapa",
};

export default New;
