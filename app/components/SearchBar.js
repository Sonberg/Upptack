import React, { Component } from 'react';
import {  StyleSheet, Text, TextInput, View, TouchableHighlight, Keyboard, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import Base from '../styles/base';


class SearchBar extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      placeholder: 'Search for city, artist or activity',
      text: props.text,
      open: false
    }
  }
  
  pressSearch() {
    this.setState({open: false});
    if (this.props.onSearch) {
      this.props.onSearch(this.state.text);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({text: nextProps.text});
    }
  }
  
  render() {
    return (
      <View style={[styles.shadow,  {display: 'flex', flexDirection: 'column', alignSelf: 'stretch', backgroundColor: '#f9f9f9',  }]}>
        
        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <TouchableHighlight style={styles.filter} underlayColor="transparent" onPress={() => this.setState({open: !this.state.open})}>
            <Icon name="filter" size={16} color={this.state.open ? "#48226C" : "#666"}/>
          </TouchableHighlight>
          
          <TextInput 
            onSubmitEditing={this.pressSearch.bind(this)}
            returnKeyType="search"
            clearButtonMode="while-editing"
            value={this.state.text} 
            placeholder={this.props.placeholder ? this.props.placeholder  : this.state.placeholder} 
            onChangeText={(text) => {
              
              this.setState({text});
              
              if(this.props.onChangeText) {
                this.props.onChangeText(text)
              }
            }} 
            style={styles.input}
             underlineColorAndroid='rgba(0,0,0,0)'/>
        </View>
        
        <Collapsible collapsed={!this.state.open} style={{paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}>
          {this.props.children}
        </Collapsible>
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
    shadowRadius: 1,
  },
  input: {
    height: 32,
    flexGrow: 1,
    margin: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e5e5e5',
    borderRadius: 6,
    fontSize: 14,
    fontWeight: '400'
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 16
  },
  text: {
    color:  'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  filter: {
    paddingLeft: 16,
    paddingRight: 4
  }
});


module.exports = SearchBar;
