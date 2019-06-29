import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor, actionCreators } from './actions/redux-persist';
import { createContainer } from './router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      console.log('Store change: ');
      console.log(store.getState());
    });
  }

  componentWillUnmount() {
    // console.log('unmounting');
    // if (store.getState().user.id === -1) {
    //   store.dispatch(
    //     actionCreators.setAppState({
    //       isOpenFirstTime: true
    //     })
    //   );
    // }
    // console.log(store.getState());

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

const AppContainer = createContainer();
