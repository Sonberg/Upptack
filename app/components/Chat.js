
import React, { Component } from 'react';
import {  Animated, StyleSheet, Text, TextInput, View, TouchableHighlight, Keyboard, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Moment from 'moment';


class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      placeholder: 'Kommentera',
      event: props.event,
      rowOpacity: new Animated.Value(0),
      visibleHeight: new Animated.Value(0)
    }
  }


  componentDidMount = ()=> {
    Animated.timing(this.state.rowOpacity, {
        toValue: 1,
        duration: 600,
    }).start()
}

componentWillMount () {
  Keyboard.addListener('keyboardWillShow', (e) => this.keyboardWillShow(e));
  Keyboard.addListener('keyboardWillHide', (e) => this.keyboardWillHide(e));
}

keyboardWillShow (e) {
  Animated.timing(this.state.visibleHeight, {
      toValue: e.endCoordinates.height - 9,
      duration: 200,
  }).start();
}

keyboardWillHide (e) {
  Animated.timing(this.state.visibleHeight, {
      toValue: 0,
      duration: 200,
  }).start();
}


  send() {
    if (this.state.text.length > 1) {
      this.props.firebase.push(`/events/${this.props.id}/messages`, {text: this.state.text, type: 'message', created: Moment().format(), user: '000'})
      this.setState({
        text: ''
      })
    }
  }


  render() {
    return (
      <View style={styles.shadow}>
      <Animated.View style={[ {display: 'flex', flexDirection: 'row', alignSelf: 'stretch', opacity: this.state.rowOpacity, backgroundColor: '#f5f5f5' }]}>
        <TouchableHighlight style={[styles.button, { width: 40,  backgroundColor: '#333'}]}><Text style={styles.text}><Icon style={{width: 20}} color="white" name="camera"></Icon></Text></TouchableHighlight>
        <TextInput value={this.state.text} placeholder={this.state.placeholder} onChangeText={(text) => this.setState({text})} style={styles.input} underlineColorAndroid='rgba(0,0,0,0)'></TextInput>
        <TouchableHighlight underlayColor="transparent" underlineColorAndroid="transparent" style={styles.button} onPress={this.send.bind(this)}><Text style={styles.text}><Icon name="send"></Icon></Text></TouchableHighlight>
        <Animated.View style={{height: this.state.visibleHeight}}></Animated.View>
      </Animated.View>
    </View>
    );
  }
}


const styles = StyleSheet.create({
  seperator: {
    backgroundColor: '#BBB9BB',
    height: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {},
    shadowOpacity: 0.3,
    shadowRadius: 1
  },
  input: {
    height: 40,
    flexGrow: 1,
    paddingLeft: 8,
    backgroundColor: '#f5f5f5',
    fontSize: 14
  },
  button: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    padding: 14,
    height: 40,
    width: 80
  },
  text: {
    color:  'black',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});


module.exports = Chat;
