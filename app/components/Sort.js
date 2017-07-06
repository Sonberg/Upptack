import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Blueprint extends Component {
  

  render() {

    return (
      <View style={[Base.row, {marginTop: 12, alignItems: 'center' }]}>
        <Text style={{fontWeight: 'bold'}}>Sortering</Text>
        <TouchableHighlight style={[styles.button, styles.active]}>
          <Text style={styles.textActive}>
            Populäritet
          </Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={[styles.button]}>
          <Text  style={styles.text}>
            Datum
          </Text>
        </TouchableHighlight>
        
        <TouchableHighlight style={[styles.button]}>
          <Text style={styles.text}>
            Nya
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({

});

export default Blueprint