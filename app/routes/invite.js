/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';


import {
    AppRegistry,
    StyleSheet,
    Text,
    Button,
    View,
    TouchableHighlight,
    ListView
} from 'react-native';

export default class Invite extends Component {
  
  static navigationOptions = {
    header: null
  }

    constructor(props) {
        super(props)

        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r1
        });
        this.state = {
            dataSource: ds.cloneWithRows([
              "Kalle",
              "Freddy",
              "Marcus"
            ])
        }
    }


    renderRow(data) {
        const { navigate } = this.props.navigation;
        return (
            <TouchableHighlight onPress={() => console.log("mark user") } underlayColor="#FFFFFF">
                <View style={styles.row}>
                    <Text style={styles.text}>{data}</Text>
                    <View style={styles.seperator}></View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <ListView style={styles.container} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)}></ListView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    row: {
        padding: 12,
    },
    text: {
        paddingTop: 4,
        paddingBottom: 4,
        fontFamily: 'Arial',
        fontSize: 16,
        textAlign: 'left'
    },
    seperator: {
      backgroundColor: '#BBB9BB',
      height: 1,
    },

});
