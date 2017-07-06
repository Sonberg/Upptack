import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/base';
import _ from 'lodash';

import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Item extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {

    return (
      <View id={this.props.id} style={[styles.column]}>
        <TouchableHighlight style={[Base.content, { paddingVertical: 4}]} underlayColor="#eee" onPress={() => {this.props.onClick(this.props.id)}}>
         <View style={{
           flex: 1,
           flexDirection: 'row',
           justifyContent: 'space-between',
           alignContent: 'flex-start',
           alignItems: 'center',
         }}> 
       
       <View style={Base.row}>
         
         <Image source={this.props.image ? {uri: this.props.image} : {}} 
           style={{width: 60, height: 60, marginRight: 12, marginTop: 6, borderRadius: 3, marginBottom: 0, backgroundColor: "#f0f0f0"}}/>
         <View style={[styles.column, {alignItems: 'flex-start'}]}>
           <Text style={Base.sub} numberOfLines={1}>{this.props.title}</Text>           
           <Text style={[Base.text, {marginTop: 4, paddingBottom: 0}]}>{this.props.sub} </Text> 
           <Text style={[Base.text, {marginTop: 2, paddingBottom: 0}]}>{this.props.date ? this.props.date : ""}</Text>            
         </View>
       </View>
       
     </View>
     </TouchableHighlight>
   </View>
    );
  }
}

const styles = StyleSheet.create({
  column: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'visible',
    paddingTop: 4,
    paddingBottom: 6,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  small: {
    paddingBottom: 12,
    fontSize: 12,
    color: '#333'
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
  },
  image: {
    height: 64,
    width: 64,
    marginRight: 12,
    borderRadius: 32
  }
});

export default Item