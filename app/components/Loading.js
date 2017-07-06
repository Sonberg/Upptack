import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/base';
import Button from 'apsl-react-native-button';
import {ActivityIndicator, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Loading extends Component {
  
  constructor(props) {
    super(props)
    
  }
  

  render() {

    return (
      <View style={[Base.center, { marginVertical: 12, alignItems: 'stretch', display: this.props.loading ? 'block' : 'none'}]}>    
        <ActivityIndicator animating={this.props.loading}></ActivityIndicator>     
        <Text style={{color: '#bbb', fontFamily: 'System', fontWeight: '500', fontSize: 18, textAlign: 'center', marginVertical: 12}}>
          {this.props.next ? ('Hämtar fler...') : ('Det var allt jag hittade!') }
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Loading