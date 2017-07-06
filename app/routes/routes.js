import { StackNavigator, TabNavigator } from 'react-navigation';

import Events from './index.js';
import Detail from './detail.js';
import Invite from './invite.js';
import Import from './import.js';
import Profile from './profile.js';
import New from './new.js';
import Form from './form.js';

let EventNavigator = StackNavigator({
 Home: {
   screen: Events,
   title: "Upptäck"
 },
 Detail: {
   screen: Detail
 },
 Invite: {
   screen: Invite
 }
});


let FormNavigator = StackNavigator({
  New: {
    screen: Form,
    title: "Skapa"
  }
});

let ProfileNavigator = StackNavigator({
  Profile: {
    screen: Profile,
  },
  Import: {
    screen: Import,
    title: "Skapa"
  }
});


export default AppNavigator = TabNavigator({
  Home: {
    screen: EventNavigator,
  },
  New: {
    screen: FormNavigator,
    title: "Skapa"
  },
  Profile: {
    screen: Profile,
    title: "You"
  }

}, {
  tabBarPosition: 'bottom',
  initialRouteName: 'Home',
  swipeEnabled: false,
  animationEnabled: false,
  tabBarOptions: {
    labelStyle: {
      fontSize: 16,
      fontFamily: 'System',
      fontWeight: '500'
      
    },
    inactiveTintColor: '#888',
    activeTintColor: '#000',
    style: {
      backgroundColor: '#fff',
      paddingBottom: 12
    },
  }
});



