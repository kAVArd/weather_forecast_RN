import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import axiosMiddleware from './axiosMiddleware';
import rootReducer from './rootReducer';

const enableHotReload = store => {
  if (module.hot) {
    module.hot.accept(() => {
      // eslint-disable-next-line global-require
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};

export default (initState) => {
  const store = createStore(rootReducer, initState, applyMiddleware(axiosMiddleware, thunk));

  enableHotReload(store);
  
  return store;
}

