import React, {Component} from 'react';
import {Animated, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import Base from '../styles/base';
import Recommendations from './Recommendations';
import {DangerZone} from 'expo';

const {Lottie} = DangerZone;

class Empty extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      opacity: new Animated.Value(0)
    }
  }
  
  componentDidMount() {
    this.animation.play();
    
    Animated.timing(this.state.opacity, {
     toValue: 1,
     duration: 300,
   }).start();
  }

  render() {

    return (
      <Animated.View style={{paddingTop: 32, opacity: this.state.opacity}}>
        <View style={styles.animationContainer} zIndex={-1}>
          <Lottie loop={true} ref={animation => { this.animation = animation; }} style={styles.animation} source={require('../lottie/empty_status.json')}/>
          <Text style={[Base.sub, styles.text]}>Looks quiet here!</Text>
        </View>
      </Animated.View>
    );

  }
}

const styles = StyleSheet.create({
  animationContainer: {
    height: 260, width: 340,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 28,
    flex: 1
  },
  animation: {
    height: 260, 
    width: 340, 
    justifyContent: 'center', 
    alignSelf: 'center'
  },
  text: {
    fontSize: 22,
    marginBottom: 8
  }
});

export default Empty