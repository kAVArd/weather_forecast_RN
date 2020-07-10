// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import RootContainer from './RootContainer';

import configureStore from '@store/configureStore';
import theme from '@components/Theme';

const store = configureStore();

const App = () => (
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <RootContainer />
    </Provider>
  </ThemeProvider>
);



export default App;
