import React, {Component} from 'react';
import {Provider, connect} from 'react-redux';
import configureStore from '../store.js';
import AppNavigator from './routes.js';
import {autobind} from 'core-decorators';
import Login from './login.js';
import Expo from 'expo';
import {AsyncStorage} from 'react-native';
import Storage from 'react-native-storage';

const store = configureStore();

class Root extends Component {

  state = {
    authenticated: null,
    fontLoaded: false,
  };

  constructor(props, context) {
    super(props, context);

    var storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: 1000 * 3600 * 24,
      enableCache: true
    });

    global.storage = storage;

    // Have user been authenticated?
    global.storage.load({key: 'authenticated', id: '1003'}).then(ret => {
      this.setState({authenticated: ret});
    })

    // MARK : - Check auth
    store.firebase.auth().onAuthStateChanged((user) => {

      if (user && global.storage) {
        global.storage.save({
          key: 'uid',
          id: '1002',
          data: user.uid,
          expires: 1000 * 60
        });
      }

      global.storage.save({
        key: 'authenticated',
        id: '1003',
        data: user
          ? true
          : false,
        expires: null
      });

      this.setState({
        authenticated: user
          ? true
          : false
      });
    });
  }

  async componentDidMount() {

    // MARK: - Load fonts
    await Expo.Font.loadAsync({'.HelveticaNeueInterface-MediumP4': require('../../fonts/_H_HelveticaNeueInterface.ttf'), 'Rubik-Regular': require('../../fonts/Rubik-Regular.ttf'), 'Rubik-Medium': require('../../fonts/Rubik-Medium.ttf')});
    
    this.setState({ fontLoaded: true });

  }

  render() {

    if (this.state.authenticated === null || !this.state.fontLoaded) {
      console.log("no auth");
      return null;
    }

    if (this.state.authenticated) {
      return (
        <Provider store={store}>
          <AppNavigator/>
        </Provider>
      );
    }

    return (
      <Provider store={store}>
        <Login/>
      </Provider>
    );
  }

}

export default Root