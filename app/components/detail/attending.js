import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../../styles/base';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Attending extends Component {
  

  render() {
    const { event } = this.props;
    return (
      <View style={[Base.center, { marginVertical: 12, alignItems: 'stretch'}]}>  
        <Text style={[Base.title2]}>Visitors ({event.attending_count})</Text>
        <Text style={[Base.text]}>{event.going ? (<Text>Du och</Text>) : (<Text></Text>)} 6 av dina vänner kommer</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Attending