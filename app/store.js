import {reduxReactFirebase, firebaseStateReducer} from 'redux-react-firebase';
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
});


const config = {
    apiKey: "AIzaSyASbK0VH-ncLrO1lJcLTzvFB6AX-beIfUs",
    authDomain: "studentklubben-65ea0.firebaseapp.com",
    databaseURL: "https://studentklubben-65ea0.firebaseio.com",
    projectId: "studentklubben-65ea0",
    storageBucket: "studentklubben-65ea0.appspot.com",
    messagingSenderId: "705508111851",
  }

const createStoreWithFirebase = compose(
    reduxReactFirebase(config, {userProfile: 'users'}),
)(createStore)

//const loggerMiddleware = createLogger();
const middleware = applyMiddleware(compose(thunkMiddleware));

export default initialState => createStoreWithFirebase(rootReducer, initialState, middleware);