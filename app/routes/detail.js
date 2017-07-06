/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebase, helpers} from 'redux-react-firebase';

import AttendingButton from '../components/AttendingButton';
import Date from '../components/detail/date';
import Attending from '../components/detail/attending';
import Ticket from '../components/detail/ticket';
import Map from '../components/detail/map';

import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo';
import ReadMore from '@expo/react-native-read-more-text';
import Base from '../styles/base';
import { event } from '../api/facebook';
import { eventDate } from '../helpers';
import moment from 'moment';
import _ from 'lodash';

import {
  Dimensions,
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableHighlight,
  Keyboard,
  Animated
} from 'react-native';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;
const window = Dimensions.get('window');

@firebase(props => ([`events/${props.id}`]))
@connect((state, props) => {
  return {
    FIRevent: dataToJS(state.firebase, `events/${props.id}`),
    profile: pathToJS(firebase, 'profile')
  }
})
class Detail extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      event: null,
      region: null,
      id: props.navigation.state.params.id,
      token: props.navigation.state.params.token,
      loading: true
    };
    
    if (props.navigation.state.params.token) {
      event(props.navigation.state.params.id, props.navigation.state.params.token, (data, error) => { 
        
        if (error) {
          return;
        }
        
        this.setState({ 
          event: data
        });
      });
    }
  }
  
  _renderTruncatedFooter = (handlePress) => {
   return (
     <TouchableHighlight onPress={handlePress} underlayColor="transparent">
       <Text style={[Base.text, {color: '#157EFB', fontWeight:'bold', marginTop: 5}]}>
         Läs mer
       </Text>
    </TouchableHighlight>
   );
 }

 _renderRevealedFooter = (handlePress) => {
   return (
     <TouchableHighlight onPress={handlePress} underlayColor="transparent">
       <Text style={[Base.text, {color: '#157EFB', fontWeight:'bold', marginTop: 5}]}>
         Dölj
       </Text>
    </TouchableHighlight>
   );
 }
 
 _handleTextReady = () => {
    this.setState({ loading: false });
  }


  render() {

    const { params } = this.props.navigation.state;
    const { event } = this.state;
    const date = eventDate(event);
    
    if (!event && this.state.loading) {
        return (<View style={Base.body}/>);
    }

    return (
      <View style={[Base.body]}>
        
        <View style={[Base.bar]}>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
            <TouchableHighlight underlayColor={'rgba(0,0,0,0)'} style={styles.button} onPress={() => this.props.navigation.goBack()}>
              <Icon name="chevron-left" size={20} color="#999" style={{backgroundColor: 'transparent'}}></Icon>
            </TouchableHighlight>
            
            <Text style={[Base.text, {fontWeight: 'bold', color: 'black', fontSize: 18}]}>{date}</Text>
            <Icon name="commenting" size={20} color="#999" style={{backgroundColor: 'transparent'}}></Icon>
          </View>
        </View>
        
        <LinearGradient
        zIndex={100}
        colors={['rgba(0,0,0,0.1)', 'transparent']}
        style={{position: 'absolute', left: 0, right: 0, top: 72, height: 20}} />
        
        <ScrollView bounces={true} style={{flex: 1, paddingTop: 36}} zIndex={1} scrollEventThrottle={16} onScroll={Animated.event( [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}] )}>
        
            <View style={[Base.content, {paddingVertical: 0}]}>
            
            <View style={Base.center}>
              <Image source={{ uri: event.cover.source }} style={{ width: window.width - 16*2, height: window.height*0.30,  borderRadius: 8, backgroundColor: '#eee', resizeMode: 'cover' }}></Image>
            </View>
            
            <View style={[Base.row, { marginTop: 9}]}>
              <View style={Base.column}>
                <View style={[Base.row, { marginVertical: 9}]}>
                  <Text style={[Base.title, {fontSize: 22}]}>{event.name}</Text>
                  <Icon name="lock" size={14} style={{marginLeft: 8, display: event.private ? 'flex' : 'none'}}></Icon>
                </View>
            
                <ReadMore 
                  numberOfLines={3} 
                  renderTruncatedFooter={this._renderTruncatedFooter}
                  renderRevealedFooter={this._renderRevealedFooter}
                  onReady={this._handleTextReady}>
                  
                 <Text style={[Base.text, {marginTop: 12, color: '#888', lineHeight: 20}]} selectable={true}>
                      {event.description}
                  </Text>
                </ReadMore>
                
              </View>
            </View>
            
            
            <AttendingButton event={event} token={this.state.token}/>
            <Date start={event.start_time || ""} end={event.end_time || ""}/>
            <Ticket event={event}/>
            <Attending event={event}/>
          
        </View>
          
        <Map event={event} />
          
        </ScrollView>
      </View>
    );
  }
}


const test = StyleSheet.create({
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    resizeMode: 'cover'
  },
  fill: {
    flex: 1,
    backgroundColor: 'white'
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    overflow: 'hidden'
  },
  bar: {
    marginTop: 32,
    height: 72,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontFamily: 'System',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 18
  },

});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  scrollView: {
    backgroundColor: "#f1f1f1"
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: 0
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 30
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  }
});

Detail.navigationOptions = {
  tabBarLabel: 'Upptäck',
  header: null
};

export default Detail
