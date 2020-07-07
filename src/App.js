// @flow
import React from 'react';
import { Provider } from 'react-redux';

import RootContainer from './RootContainer';

import configureStore from '@store/configureStore';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <RootContainer />
  </Provider>
);



export default App;
