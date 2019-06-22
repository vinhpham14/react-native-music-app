import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

import HomePage from './main-views/HomePage';
import LoginPage from './main-views/LoginPage';
import PlayerPage from './main-views/PlayerPage';
import SearchPage from './main-views/SearchPage';
import PlaylistManagerPage from './child-views/PlaylistManagerPage';
import AddToPlaylistPage from './child-views/AddToPlaylistPage';
import LibraryPage from './main-views/LibraryPage';
import IconGenerator, { iconNames } from './components/icon-generator/IconGenerator';
import InputNamePage from './child-views/InputNamePage';
import FavoriteSongPage from './child-views/FavoriteSongPage';

const LibraryStack = createStackNavigator(
  {
    Library: LibraryPage,
    PlaylistManager: PlaylistManagerPage,
    InputName: InputNamePage,
    FavoriteSongs: FavoriteSongPage,
  },
  {
    initialRouteName: 'Library',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'rgb(34,35,38)',
      },
      headerBackImage: (
        <Image source={require('./images/ic-back-arrow.png')} style={{ width: 26, height: 26 }} />
      ),
      headerTitleStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
      },
    },
    headerLayoutPreset: 'center',
  }
);

LibraryStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index === 2) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const PlayerStack = createStackNavigator(
  {
    Player: PlayerPage,
    AddToPlaylist: AddToPlaylistPage,
  },
  {
    initialRouteName: 'Player',
  }
);

PlayerStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index === 1) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeStack = createStackNavigator(
  {
    Login: LoginPage,
  },
  {
    initialRouteName: 'Login',
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomePage },
    Player: { screen: PlayerStack },
    Search: { screen: SearchPage },
    Library: { screen: LibraryStack },
    Login: {
      screen: LoginPage,
      navigationOptions: {
        showIcon: false,
        tabBarLabel: 'homezz',
      },
    },
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => getTabBarIcon(navigation, focused),
    }),
    tabBarOptions: {
      style: {
        backgroundColor: 'rgb(34,35,38)',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
      },
      labelStyle: { fontWeight: '400' },
      activeTintColor: 'white',
      inactiveTintColor: 'rgb(122,123,125)',
    },
  }
);

const getTabBarIcon = (navigation, focused) => {
  const { routeName } = navigation.state;
  let iconName = '';
  if (routeName === 'Home') {
    iconName = iconNames.HomeTabButton;
  } else if (routeName === 'Player') {
    iconName = iconNames.PlayerTabButton;
  } else if (routeName === 'Search') {
    iconName = iconNames.SearchTabButton;
  } else if (routeName === 'Library') {
    iconName = iconNames.Library;
  }

  return <IconGenerator iconName={iconName} size={25} onFocused={focused} />;
};

export const createContainer = () => createAppContainer(TabNavigator);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   nagivatior: {
//     backgroundColor: 'rgb(34,35,38)',
//   },
// });
