import { path, assoc } from 'ramda';

import { CHANGE_ACTIVE_TAB } from './AppActions';

export const STATE_KEY = 'app';

export const TABS = {
  MAP: 'map',
  SEARCH: 'search',
};

export const SPEED_UNITS = {
  KPH: 'kph',
  MPH: 'mph',
}

export const TEMP_UNITS = {
  C: 'c',
  F: 'f',
};

const initState = {
  activeTab: 'map',
  filters: {
    speed: 'kph',
    temp: 'c',
  },
}

const AppReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_ACTIVE_TAB: {
      const name = path(['payload', 'tabName'], action);

      return assoc('activeTab', name, state);
    }
    default: {
      return state;
    }
  }
};

export const getActiveTab = (state) => path([STATE_KEY, 'activeTab'], state);

export const getFilters = state => path([STATE_KEY, 'filters'], state);

export default AppReducer;