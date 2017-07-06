/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { firebase, helpers } from 'redux-react-firebase';
import Icon from 'react-native-vector-icons/FontAwesome';
import FacebookEvents from '../providers/FacebookEvents';
import TicketmasterEvents from '../providers/TicketmasterEvents';
import ProviderGrid from '../components/ProviderGrid';
import SearchBar from '../components/SearchBar';
import Recommendations from '../components/Recommendations';
import { Ionicons } from '@expo/vector-icons';
import {locationByIp, nearby } from '../api/location';
import Button from 'apsl-react-native-button';
import Collapsible from 'react-native-collapsible';
import Base from '../styles/base';
import _ from 'lodash';
import Expo from 'expo';
import {
  Platform,
  Dimensions,
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Animated,
  Image,
  Switch
} from 'react-native';

const { Constants, Location, Permissions } = Expo;

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebase()
@connect(({firebase}) => ({
  auth: pathToJS(firebase, 'auth')
}))
class Events extends Component {
  
  state = {
    events: [],
    cities: [],
    open: false,
    selected: "Facebook",
    text: 'Stockholm',
    filter: {
      showAll: false,
      interval: 'all'
    }
  };
  
  /**
   * Fetch facebook-access token from localstorage
   * @method constructor
   * @param  {[type]} props   Props from parent route
   */
  constructor(props) {
    super(props)
    
    global.storage.load({
     key: 'token',
     id: '1001'
   }).then(ret => {
     
     this.setState({token: ret});
     
   });
    
  }
  
  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
        // 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      } else {
        this._getLocationAsync();
      }
  }
  
   _getLocationAsync = () => {
     Permissions.askAsync(Permissions.LOCATION).then((resp) => {
       
       if (resp.status !== 'granted') {
         //'Permission to access location was denied';
         return;
       }
       
       let manager = Location.watchPositionAsync({enableHighAccuracy: true}, (location) => {
         
         nearby(location.coords.latitude, location.coords.longitude, (data, error) => {
           
           let response = data.map((city) => ({ name: city[1], county: city[3], distance: city[7] }));
           
           this.setState({
             cities: response,
             text: response.length ? response[0].name : "Stockholm"
           });
           
           if (manager) {
             manager.remove();
           }
           
         });
       });
       
     })
    
  };
   
  
  /**
   * Open / Close provider menu
   * @method toggle
   */
  toggle() {
    this.setState({open: !this.state.open});
  }
  
  /**
   * Save text and tell child-view to update result
   * @param  {String} text Search string
   */
  search(text) {
    this.setState({ text: text });
  } 
  
  /**
   * New provider was selected
   * @param  {String} item Provider name
   */
  select(item) {
    this.setState({ selected: item, open: false });
  }
  
  render() {
    const {firebase, auth, navigation} = this.props;
    
    const handleLogout = () => {
     firebase.logout()
   }

    // MARK : - View
    return (
      <View style={Base.body}>
        <View style={Base.bar}>
          <View style={[{flexDirection: 'row', justifyContent: 'space-between'}]}>
            <View><Text style={[Base.header, { marginTop: 4}]}>{this.state.selected}</Text></View>
            <View></View>
            <Button onPress={this.toggle.bind(this)} style={{borderWidth: 0, marginBottom: 0}} underlayColor="transparent">
              {this.state.open ? (<Ionicons name='md-close' size={24}/>) : (<Ionicons name='md-arrow-dropdown' size={24}/>)}
            </Button>
          </View>
        </View>
        <Collapsible collapsed={!this.state.open}>
          <ProviderGrid selected={this.state.selected} select={this.select.bind(this)} />
        </Collapsible>
        
        <SearchBar
          text={this.state.text}
          onSearch={this.search.bind(this)}>
          
          <View style={[Base.row, {alignItems: 'center' }]}>
            <TouchableHighlight underlayColor="transparent" style={[styles.button,]} onPress={() => this.setState({filter: {interval: 'all'}})}>
              <Text style={this.state.filter.interval === 'all' ?  styles.textActive : styles.text}>
                Alla
              </Text>
            </TouchableHighlight>
            
            <TouchableHighlight underlayColor="transparent" style={[styles.button]} onPress={() => this.setState({filter: {interval: 'today'}})}>
              <Text  style={this.state.filter.interval === 'today' ?  styles.textActive : styles.text}>
                Idag
              </Text>
            </TouchableHighlight>
            
            <TouchableHighlight underlayColor="transparent" style={[styles.button]} onPress={() => this.setState({filter: {interval: 'week'}})}>
              <Text style={this.state.filter.interval === 'week' ?  styles.textActive : styles.text}>
                Kommande veckan
              </Text>
            </TouchableHighlight>

          </View>
        </SearchBar>
        
        <FacebookEvents ref="view" {... this.state} {... this.props}></FacebookEvents>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    marginTop: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  fill: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  border:{
    height: 1,
    backgroundColor: '#e9e9e9'
  },
  bar: {
    marginTop: 28,
    height: 44,
    backgroundColor: 'white'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width - 32
  },
  title: {
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: 'System',
    fontSize: 34
  },
  text: {
    fontFamily: 'System',
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'black'
  },

  image: {
    height: 28,
    width: 28,
    borderRadius: 14,
    marginTop: 5
  },
  
  
  button: {
  },
  textActive: {
    color: 'black',
    fontWeight: 'bold'
  },
  text: {
    
  }

});

Events.navigationOptions = {
  tabBarLabel: "Upptäck",
  header: null,
  headerMode: 'none',
  tabbarVisiböe: false
};

export default Events
