import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import HomePage from './src/views/HomePage';
import PlayerPage from './src/views/PlayerPage';
import { reducer, actionCreators } from './src/actions/ReduxImplement';
import IconGenerator, { iconNames } from './src/components/icon-generator/IconGenerator';

// Get all the data
// Init global store
const store = createStore(reducer);

export default class App extends Component {
  store = createStore(reducer);

  constructor(props) {
    super(props);

    const { playingTrack, playlist, screen, currentTime, listOfSubjectInfo } = store.getState();

    this.state = {
      playingTrack,
      playlist,
      screen,
      currentTime,
      listOfSubjectInfo,
    };
  }

  componentWillMount() {
    this.unsubscribe = store.subscribe(() => {
      const { playingSong, playlist, screen, currentTime, listOfSubjectInfo } = store.getState();

      this.setState({ playingSong, playlist, screen, currentTime, listOfSubjectInfo });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // const { listOfSubjectInfo } = this.state;

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
  },
  {
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
      labelStyle: { fontWeight: '300' },
      activeTintColor: 'white',
      inactiveTintColor: 'white',
    },
  }
);

const getTabBarIcon = (navigation, focused) => {
  const { routeName } = navigation.state;
  let iconName = '';
  if (routeName === 'Home') {
    iconName = iconNames.Home;
  } else if (routeName === 'Player') {
    iconName = iconNames.Player;
  }

  return <IconGenerator iconName={iconName} size={25} onFocused={focused} />;
};

const AppContainer = createAppContainer(TabNavigator);

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nagivatior: {
    flex: 0.086,
    backgroundColor: 'rgb(34,35,38)',
  },
});
