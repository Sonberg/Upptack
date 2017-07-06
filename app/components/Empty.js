import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import { DangerZone } from 'expo';

const { Lottie } = DangerZone;

class Empty extends Component {
  
  state = {
   animation: require('../lottie/empty_status.json')
 };
 
 componentWillMount() {
   this.state.animation.play();
 }


  render() {

    if (this.state.animation) {
      return ( 
        <View style={styles.animationContainer}>
            <Lottie
              ref={animation => {
                this.animation = animation;
              }}
              style={{
                width: 400,
                height: 400,
                backgroundColor: '#eee'}}
              source={this.state.animation}
            />
            <Text>Looks quiet here!</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    paddingTop: 20,
  },
});

export default Empty