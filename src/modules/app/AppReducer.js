import { path, assoc } from 'ramda';

import { CHANGE_ACTIVE_TAB } from './AppActions';

export const STATE_KEY = 'app';

export const TABS = {
  MAP: 'map',
  SEARCH: 'search',
};

// unit types by open weather
export const TYPES = {
  METRIC: 'metric',
  IMPERIAL: 'imperial',
}

const initState = {
  activeTab: 'map',
  type: TYPES.METRIC,
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

export const getUnitsType = state => path([STATE_KEY, 'type'], state);

export default AppReducer;