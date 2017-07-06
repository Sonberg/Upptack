import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import Expo from 'expo';
import {Platform, StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, ActivityIndicator} from 'react-native';
import Base from '../styles/base';
import moment from 'moment';
import geopoint from 'latlon-geohash';
import locale_sv from "moment/locale/sv";
import {getEvents, next} from '../api/ticketmaster';
import {eventDate, hasStarted} from '../helpers';

class TicketmasterEvents extends Component {
    
  state = {
    events: [],
    location: null,
    loading: true,
    next: true,
    errorMessage: null,
  }
  
  constructor(props) {
    super(props)
    moment.updateLocale("sv", locale_sv);  
    
    getEvents(null, null, (data, error) => { 
      console.log(data._embedded.events);
      this.setState({
        location: location,
        events: this.state.events.concat(data._embedded.events),
        next: data._links.next._href,
        loading: false
      });
    });
  }
  
  _getLocationAsync = async () => {
    let { status } = await Expo.Permissions.askAsync(Expo.Permissions.LOCATION);
    if (status !== 'granted') {
      
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Expo.Location.getCurrentPositionAsync({});
    
    if (location) {
      
      
    }
  };
  
  componentDidMount() {
    
    // MARK: - Get location
    if (Platform.OS === 'android' && !Expo.Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
    
  }
  
  
  scrollEnd() {  
    if (this.state.next && !this.state.loading) {   
         
      this.setState({loading: true});    
      
      next(this.state.next, function (data, error) {
        
        
        this.setState({
          events: this.state.events.concat(data.data),
          next: data.paging ? data.paging.next : null,
          loading: false
        });
        
      }.bind(this))
    }
  }
  
  render() {
    const { navigation } = this.props;
    const { events } = this.state;
    
    if (!events) {
      return null;
    }
    
    const eventList = _.map(events, (event, id) => {
      var date = event.dates.start.localDate + " " + event.dates.start.localTime;
      var image = event.images ? event.images[0].url : null;
       return ( 
         <View key={id} style={[Base.content, styles.column]}>
           <TouchableHighlight underlayColor="#bbb" onPress={() => navigation.navigate('Detail', { id: event.id, token: this.props.token })}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignContent: 'flex-start',
              alignItems: 'center',
              paddingBottom: 14
            }}> 
          
          <View style={Base.row}>
            
            <Image source={{uri: image ? image : ""}} style={{width: 60, height: 60, marginRight: 12, marginTop: 6, borderRadius: 3, marginBottom: 0}}/>
            <View style={[styles.column, {alignItems: 'flex-start'}]}>
              <Text style={Base.sub} numberOfLines={1}>{event.name ? event.name : ""}</Text>
              <Text style={[Base.text, {marginTop: 2, paddingBottom: 0, height: date ? 'auto' : 0  }]}>{date}</Text>            
              <Text style={[Base.text, {marginTop: 2, paddingBottom: 0}]}> </Text>            
            </View>
          </View>
          
        </View>
        </TouchableHighlight>
      </View>
    )}
  );
    return (
      <ScrollView onMomentumScrollEnd={this.scrollEnd.bind(this)}>
        
        {eventList}
        
        <View style={[Base.center, { marginVertical: 28, alignItems: 'stretch'}]}>    
          <ActivityIndicator animating={this.state.loading}></ActivityIndicator>     
          <Text style={{color: '#bbb', fontFamily: 'System', fontWeight: '500', fontSize: 18, textAlign: 'center', marginVertical: 12}}>
            {this.state.next ? ('Hämtar fler...') : ('Det var allt jag hittade!') }
          </Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  column: {
    flex: 1,
    flexDirection: 'column',
    overflow: 'visible',
    paddingVertical: 6
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

export default TicketmasterEvents