import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../../styles/base';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import moment from 'moment';
class Date extends Component {
  

  render() {
    
    const start = moment(this.props.start);
    const end = moment(this.props.end);
    
    var date = "";
    
    if (this.props.start) {
      if (start.diff('days') < 4) {
        
        date = start.calendar();
        
        
        
      }  else {    
        
        date = start.format("ll") + " " +  start.format("LT");
        
      }
    }
    
    if (this.props.end) {
      
      date = date + " - " + end.format('LT'); 
      
    }


    return (
      <View style={[Base.center, { marginVertical: 12, alignItems: 'stretch'}]}>  
        <View style={[Base.row, Base.center, { justifyContent: 'space-between'}]}>
          <View>
            <Text style={[Base.title2]}>Date</Text>
            <Text style={[Base.text]}>{date}</Text>
          </View>
          <Icon name="bookmark" size={18} color="#666"/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Date