import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Base from '../styles/base';
import Button from 'apsl-react-native-button';
import {StyleSheet, Text, View, Image, TouchableHighlight} from 'react-native';
import {me, attend, rsvp} from '../api/facebook';

class AttendingButton extends Component {
  
  constructor(props) {
    super(props)
    
    this.state = {
      loading: true,
      rsvp_status: null
    }
    
    this.update()
  }
  
  attend() {
    attend(this.props.event.id, this.props.token, (data, error) => {
      this.setState({ rsvp_status: "attending" });
    });
  }
  
  update() {
    rsvp(this.props.event.id, this.props.token, (data, error) => {
      this.setState({ 
        rsvp_status: data ? data.rsvp_status : false, 
        loading: false });
    });
  }

  render() {

    return (
      <View style={[Base.center, styles.wrapper]}>                    
          <Button 
            underlayColor="white" 
            isLoading={this.state.loading} 
            onPress={this.attend.bind(this)} 
            style={[styles.button, { backgroundColor: this.state.rsvp_status === "attending" ? '#157EFB' : '#bbb', borderWidth: 0 }]}>
            <Text style={styles.text}>{this.state.rsvp_status === "attending" ? (<Icon name="check" size={18}/>) : (<Text>Are you going?</Text>)}</Text>
          </Button>
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: { marginVertical: 28, alignItems: 'stretch'},
  text: {color: 'white', fontFamily: 'System', fontWeight: '500', fontSize: 18, textAlign: 'center'},
  button: {borderRadius:  22, paddingVertical: 12, paddingHorizontal: 22},
  
  star: {
    borderRadius:22,
    height: 44,
    width: 44,
    
  }
});

export default AttendingButton