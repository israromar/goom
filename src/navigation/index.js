/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
// apikey: AIzaSyDlB2snb6Zk1btPhpBUl4rgq3brTn4uwCI
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthNavigation from './auth_navigation';
import BottomTabNavigation from './bottom_tab_navigation';
import ChatNavigation from './chat_navigation';
import UsersNavigation from './users_navigation';

const appStack = createStackNavigator({
  Home: {
    screen: BottomTabNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
  Chat: {
    screen: ChatNavigation,
    navigationOptions: () => ({
      header: null
    })
  },
  Users: {
    screen: UsersNavigation,
    navigationOptions: () => ({
      header: null
    })
  }
})

const AppNavigator = createSwitchNavigator({
  Auth: AuthNavigation,
  Home: appStack
});

const RootStack = createAppContainer(AppNavigator);
export default RootStack;
