import Icon from 'react-native-vector-icons/FontAwesome';
import {eventDate, hasStarted} from '../helpers';
import SearchBar from '../components/SearchBar';
import Item from '../components/Item';
import Empty from '../components/Empty';
import Loading from '../components/Loading';
import Recommendations from '../components/Recommendations';
import Button from 'apsl-react-native-button';
import {events, next, cached, cache} from '../api/facebook';
import React, {Component} from 'react';
import { hasExpired } from '../helpers';
import locale_sv from "moment/locale/sv";
import Base from '../styles/base';
import moment from 'moment';
import _ from 'lodash';
import { 
  FlatList, 
  StyleSheet, 
  Text, 
  Switch,
  View, 
  ScrollView, 
  Image, 
  TouchableHighlight, 
  ActivityIndicator,
  RefreshControl
} from 'react-native';

class FacebookEvents extends Component {
  
  constructor(props) {
    super(props)
    
    moment.updateLocale("sv", locale_sv);

    this.state = {
      events: null,
      loading: false,
      next: null,
      text: props.text,
      token: props.token,
      refreshing: false,
    };

  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({text: nextProps.text, token: nextProps.token });
    this.refresh(nextProps.text, true);
  }
  
  refresh(text, hidden) {
    if (this.state.refreshing || !this.props.token) {
      return;
    }
    
    if (!text && !this.state.text) {
      return;
    }
    
    if (!hidden) {
        this.setState({refreshing: true});
    }
    
    
     cached(text ? text : this.state.text, (data, err) => {
       
       if (data) {
         
         this.setState({refreshing: false, loading: false});
         
         if (error) {
           console.log("error", error);
           
           return;
         }
         
         this.setData(data, true);
         
       } else {
         
         events(text ? text : this.state.text, this.props.filter, this.props.token, (data, error) => { 
           
           this.setState({refreshing: false, loading: false});
           
           if (error) {
             console.log("error", error);
             return;
           }
               
           this.setData(data, true);
           
           cache(text, data, (data, err) => {});
           
         });
         
       }
       
     });
  }
   
  scrollEnd() {
    if (this.state.next && !this.state.loading) {

      this.setState({loading: true});
      
      next(this.state.next, function (data, error) {

        if (error) {
          console.log(error);
        }
        
        this.setData(data, false);
        
      }.bind(this))
    }
  }
  
  _keyExtractor = (item, index) => item.id;
  
  onClick(id) {
    this.props.navigation.navigate('Detail', { id: id, token: this.props.token });
  }
  
  setData(data, reset, text) {
    
    var state = {
      loading: false,
      refreshing: false
    };

    if (data) {

      if (reset) {
        state['events'] = data.data ? data.data : new Array();
      } else {
        state['events'] = data.data ? _.uniqBy(this.state.events.concat(data.data), 'id') : new Array();
      }
      
      state['next'] = data.paging ? data.paging.next : null;
      
    }
    
    if (!this.props.filter.showAll) {
      state['events'] = _.filter(state['events'], function(event) { 
          return !hasExpired(event);
       });
    }
    this.setState(state);
  }
  
  render() {
  
    return (
      <View style={{flex: 1}}>
        <FlatList
          style={{paddingTop: 6}}
          data={this.state.events}
          extraData={this.state}
          ref="listRef"
          refreshing={this.state.refreshing}
          onEndReached={this.scrollEnd.bind(this)}
          keyExtractor={this._keyExtractor}
          ListEmptyComponent={<Empty cities={this.props.cities} />}
          ListFooterComponent={() => this.state.next ? (<Loading loading={this.state.loading} error={this.state.error} next={this.state.next} />) : (<Recommendations {...this.state} cities={this.props.cities}/>)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh.bind(this)}
            />
          }
          renderItem={(data) => {
            
            let event = data.item;
            let date = eventDate(event);
            
             return (<Item 
               id={event.id} 
               title={event.name} 
               sub={event.owner.name} 
               onClick={this.onClick.bind(this)}
               date={date} 
               image={event.cover ? event.cover.source : null }/>)
           }}
        />
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  
});

export default FacebookEvents