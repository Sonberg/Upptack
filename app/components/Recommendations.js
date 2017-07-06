import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/base';
import Button from 'apsl-react-native-button';
import {FlatList, StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import _ from 'lodash';

class Recommendations extends Component {
  
  constructor(props) {
    super(props)
    
    
  };
  
  _keyExtractor = (item, index) => item.name;
  
  _renderItem = ({item}) => (
      <TouchableHighlight style={{ borderWidth: 0, paddingVertical: 12, paddingHorizontal: 16, margin: 0 }}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{fontWeight: 'bold', textAlign: 'center'}}>{item.name}, {item.county}</Text>
          <Text style={{textAlign: 'center', color: '#999'}}>{item.distance} km away</Text>
        </View>
      </TouchableHighlight>
  );

  render() {
    if (this.props.cities) {
      
      return (
        <View style={[Base.center, { marginVertical: 16, alignItems: 'stretch'}]}>    
          <Text style={{color: '#999', paddingBottom: 16, fontFamily: 'System', fontWeight: '500', fontSize: 16, textAlign: 'center', marginVertical: 4}}>Want to discover more events?</Text>
          <FlatList
            data={this.props.cities}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        </View>
      );
      
    }
    
    return null;
  }
}

const styles = StyleSheet.create({

});

export default Recommendations