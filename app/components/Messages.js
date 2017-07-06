/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {Provider, connect} from 'react-redux';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {firebase, helpers} from 'redux-react-firebase'
import TimeAgo from 'react-native-timeago';
const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;
import {
  StyleSheet,
  Dimensions,
  Text,
  Image,
  View,
  TouchableHighlight
} from 'react-native';
import _ from 'lodash';
import Moment from 'moment';

@firebase(props => ([`events/${props.id}/messages`]))
@connect((state, props) => {
  return {
    messages: dataToJS(state.firebase, `events/${props.id}/messages`)
  }
})
class Messages extends Component {
  constructor(props) {
    super(props)
    //  var messages = Object.keys(props.messages).map(function (key) { return props.messages[key]}).filter(function (value) { return ((value.type != 'screenshot') && value.created) });

    /*
  var sorted = _.sortBy(messages, function(o) {
            return new Moment(o.created).format('YYYYMMDD');
        }).reverse();  */

    this.state = {
      messages: props.messages
    }
  }

  like() {}

  /*
<View style={styles.seperator}></View>

    <View style={styles.header}>
        <View style={styles.wrapper}>
          <Icon name="heart-o" size={14} color="#757575" style={styles.icon} /><Text style={styles.greyText}>0</Text>
        </View>
        <View style={styles.wrapper}>
          <Icon name="angle-down" size={14} color="#757575"  style={styles.icon} />
        </View>
        <View style={styles.wrapper}>
          <Icon name="reply-all" size={14} color="#757575" style={styles.icon} /><Text style={styles.greyText}>0</Text>
        </View>
    </View>*/

  render() {
    if (!this.props.messages) {
      return null;
    }

    var sorted = {};
    _.sortBy(Object.keys(this.props.messages), function(o) {
      return new Moment(o.created).format('YYYYMMDD');
    }).reverse().forEach(function(key) {
      sorted[key] = this.props.messages[key];
    }.bind(this));
    
    console.log(sorted);
    const renderRows = _.map(sorted, (message, id) => (
      <TouchableHighlight underlayColor="#FFFFFF" key={id} order={message.created}>
        <View style={styles.row}>
          <View style={styles.wrapper}>
            <View style={styles.imageWrapper}>
              <Image style={{
                marginTop: 4
              }} source={{
                uri: 'https://scontent-arn2-1.xx.fbcdn.net/v/t1.0-1/c0.10.40.40/p40x40/14212724_10209311366714926_9139320033962522425_n.jpg?oh=9730aa7b53d3386386b3a34b5d054b28&oe=5979F534',
                width: 30,
                height: 30
              }}/>
            </View>
            <View style={styles.content}>
              <View style={styles.header}>
                <Text style={styles.user}>Per Sonberg</Text>
                <TimeAgo style={styles.date} time={message.created}/>
              </View>
              <Text style={styles.text}>{message.text}</Text>
            </View>
          </View>

        </View>
      </TouchableHighlight>
    ))

    return (
      <View>
        <View style={styles.container}>{renderRows}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 4
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  imageWrapper: {
    flexGrow: 0
  },
  content: {
    flexGrow: 1,
    paddingLeft: 8,
    width: 100
  },
  row: {
    width: Dimensions.get('window').width - 16*2,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 12,
    marginTop: 4,
    marginBottom: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  user: {
    fontWeight: 'bold',
    fontSize: 14
  },
  date: {
    fontSize: 12,
    flex: 1,
    textAlign: 'right',
    fontWeight: '400',
    color: 'grey'
  },
  text: {
    flex: 2,
    paddingTop: 4,
    fontFamily: 'Arial',
    fontSize: 14,
    textAlign: 'left'
  },
  seperator: {
    backgroundColor: '#f5f5f5',
    height: 1,
    marginTop: 8,
    marginBottom: 8
  },

  icon: {
    marginRight: 8
  },

  greyText: {
    color: '#757575',
    fontSize: 12
  }
});

export default Messages
