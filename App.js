import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import HomePage from './src/views/HomePage';
import PlayerPage from './src/views/PlayerPage';
import { reducer, actionCreators } from './src/actions/ReduxImplement';

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
      console.log(`Showing from subcriber: `);
      console.log(store.getState());
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

const TabNavigator = createBottomTabNavigator({
  Home: { screen: HomePage },
  Player: { screen: PlayerPage },
});

const AppContainer = createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nagivatior: {
    flex: 0.086,
    backgroundColor: 'rgb(34,35,38)',
  },
});
