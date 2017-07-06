import React, {Component} from 'react';
import Base from '../../styles/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Location extends Component {
  

  render() {
    
    const {event} = this.props;
    
    if (event.place) {
      
      return (
          <View style={[Base.center, { margin: 16, alignItems: 'stretch', backgroundColor: 'transparent'}]}>  
            <View style={[Base.row, Base.center, { justifyContent: 'space-between'}]}>
              <View>
                <Text style={[Base.title2]}>Location</Text>
                <Text style={[Base.text]}>{(event.place.name !== event.place.location.city ? event.place.name : event.place.location.street )}, {event.place.location.city}</Text>
              </View>
              <Icon name="location-arrow" size={18} color="#666"/>
            </View>
          </View>
      );
    }
    
    return null;
  }
}

const styles = StyleSheet.create({

});

export default Location