import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from 'apsl-react-native-button';
import Base from '../../styles/base';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Ticket extends Component {
  

  render() {

    const { event } = this.props;

    return (
      <View style={[{ paddingVertical: 12, alignItems: 'stretch', display: event.ticket_uri ? 'block' : 'none'}]}>  
        <View style={[Base.row, Base.center, { justifyContent: 'space-between'}]}>
          <View>
            <Text style={[Base.title2]}>Ticket</Text>
            <Text style={[Base.text]} numberOfLines={1}>{event.ticket_uri}</Text>
          </View>
          <Icon name="ticket" size={18} color="#666"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Ticket