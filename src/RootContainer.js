import React from 'react';
import { StatusBar } from 'react-native';

import AppRoutes from './AppRoutes';

const RootContainer = () => (
  <>
    <StatusBar barStyle="dark-content" />
    <AppRoutes />
  </>
);

export default RootContainer;