import React, {Component} from 'react';
import {connect} from 'react-redux';
import {firebase, helpers} from 'redux-react-firebase'
import Icon from 'react-native-vector-icons/FontAwesome';
import {autobind} from 'core-decorators';
import {
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';
import Expo from 'expo';

const {isLoaded, isEmpty, dataToJS, pathToJS} = helpers;

@firebase()
@connect(({firebase}) => ({
  authError: pathToJS(firebase, 'authError')
}))
@autobind
class Login extends Component {

  static navigationOptions = ({navigation}) => ({title: 'Logga in', headerBackTitle: null});

  constructor(props, context) {
    super(props, context)
    this.state = {
      loading: false
    }
  }

  async login() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync('426135197729533', {
      permissions: ['public_profile', 'email', 'user_location', 'user_events', 'user_managed_groups']
    });

    if (type === 'success') {

      var FIRAuth = this.authenticate(token);

      global.storage.save({
        key: 'token',
        id: '1001',
        data: token,
        expires: null
      });

      // Get the user's name using Facebook's Graph API
      const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);

    }
  }

  authenticate(token) {
    const provider = this.props.firebase.auth.FacebookAuthProvider;
    const credential = provider.credential(token);
    return this.props.firebase.auth().signInWithCredential(credential);
  }

  render() {

    return (
      <View style={styles.container}>
        <Image source={require('../images/logo/Artboard@3x.png')} style={{
          width: Dimensions.get('window').width - 140
        }}/>
        <Icon.Button name="facebook" style={styles.button} onPress={this.login.bind(this)}>Logga in med Facebook</Icon.Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: (Dimensions.get('window').width / 2) - 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {}

});

export default Login
//