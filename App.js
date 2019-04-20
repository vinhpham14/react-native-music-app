import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomePage from './src/views/HomePage';
import PlayerPage from './src/views/PlayerPage';
import SearchPage from './src/views/SearchPage';
import { reducer } from './src/actions/ReduxImplement';
import IconGenerator, { iconNames } from './src/components/icon-generator/IconGenerator';

// Get all the data
// Init global store
const store = createStore(reducer);

export default class App extends Component {
  // store = createStore(reducer);

  constructor(props) {
    super(props);

    const { playingTrack, playlist, screen, currentTime, listOfSubjectInfo } = store.getState();

    // this.state = {
    //   playingTrack,
    //   playlist,
    //   screen,
    //   currentTime,
    //   listOfSubjectInfo,
    // };
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      // const { playingSong, playlist, screen, currentTime, listOfSubjectInfo } = store.getState();
      // this.setState({ playingSong, playlist, screen, currentTime, listOfSubjectInfo });
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
        <AppContainer />
      </Provider>
    );
  }
}

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomePage },
    Player: { screen: PlayerPage },
    Search: { screen: SearchPage },
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => getTabBarIcon(navigation, focused),
    }),
    tabBarOptions: {
      style: {
        backgroundColor: 'rgb(34,35,38)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
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
