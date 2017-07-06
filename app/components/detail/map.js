import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../../styles/base';
import Location from './location';
import {MapView, LinearGradient} from 'expo';
import { MapStyles } from '../../styles/map';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';

class Map extends Component {

  constructor(props) {
    super(props)

    var state = { region: null };
    
    if (props.event.place) {
      state = {
        region: {
          latitude: props.event.place.location ? props.event.place.location.latitude : 0,
          longitude: props.event.place.location ? props.event.place.location.longitude : 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }
      };
    }
    
    this.state = state;
  }

  render() {
    const {event} = this.props;

    if (this.state.region) {
      return (
        <View style={{
          height: 500
        }}>
          <Location event={event} zIndex={100}/>
          <MapView touchEvents='none' pointerEvents='none' provider={MapView.PROVIDER_GOOGLE} liteMode={true} zoomEnabled={false} rotateEnabled={false} scrollEnabled={false} customMapStyle={MapStyles} initialRegion={this.state.region} style={{
            height: 500
          }}>  
            <MapView.Marker coordinate={{
              latitude: event.place.location.latitude,
              longitude: event.place.location.longitude
            }} title={event.name}/>
            <LinearGradient colors={['white', 'rgba(255,255,255,0.1)', 'white']} style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 500
            }}/>
          </MapView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({});

export default Map