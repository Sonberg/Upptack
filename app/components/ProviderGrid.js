import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Column as Col, Row} from 'react-native-flexbox-grid';
import Base from '../styles/base';

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight
} from 'react-native';

class ProviderGrid extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      selected: props.selected
    };
  }
  
  select(item) {
    
    this.setState({ selected : item });
    
    if (this.props.select) {
      this.props.select(item);
    }
  }

  renderItem({item, index}) {
    return (
      <Row size={12} style={styles.row}>
        <TouchableHighlight onPress={() => { this.select(item) }} underlayColor="transparent">
          <Text style={[
            Base.sub, {
              fontSize: 20,
              color: this.state.selected === item ? "black" : "#888"
            }
          ]}>{item}</Text>
        </TouchableHighlight>
      </Row>
    );
  }

  _keyExtractor = (item, index) => item;

  render() {

    return (
      <ScrollView style={{
        paddingVertical: 4,
        borderTopColor: "rgba(0,0,0,0.1)",
        borderTopWidth: 1
      }}>
        <FlatList data={[
          "Upptäck",
          "Facebook",
          "Eventful",
          "Ticketmaster",
          "Debaser",
          "Stockholm film festival"
        ]} renderItem={this.renderItem.bind(this)} keyExtractor={this._keyExtractor}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  col: {
    padding: 4
  },
  content: {
    height: 120,
    backgroundColor: '#eee',
    borderRadius: 6
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    margin: 36
  }
});

export default ProviderGrid