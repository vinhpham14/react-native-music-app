import React, { Component } from 'react';
import { StyleSheet, Image, Dimensions } from 'react-native';
import { Provider } from 'react-redux';
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator,
} from 'react-navigation';

import { PersistGate } from 'redux-persist/lib/integration/react';
import HomePage from './src/main-views/HomePage';
import LoginPage from './src/main-views/LoginPage';
import PlayerPage from './src/main-views/PlayerPage';
import SearchPage from './src/main-views/SearchPage';
import PlaylistManagerPage from './src/child-views/PlaylistManagerPage';
import AddToPlaylistPage from './src/child-views/AddToPlaylistPage';
import LibraryPage from './src/main-views/LibraryPage';
import IconGenerator, { iconNames } from './src/components/icon-generator/IconGenerator';
import InputNamePage from './src/child-views/InputNamePage';
import FavoriteSongPage from './src/child-views/FavoriteSongPage';
import { store, persistor } from './src/actions/redux-persist';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      console.log('Store has been modified: ');
      console.log(store.getState());
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}

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
        <Image
          source={require('./src/images/ic-back-arrow.png')}
          style={{ width: 26, height: 26 }}
        />
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

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nagivatior: {
    backgroundColor: 'rgb(34,35,38)',
  },
});
