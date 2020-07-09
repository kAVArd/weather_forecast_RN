import * as R from 'ramda';
import { FETCH_CURRENT_WEATHER, SET_LOCATION } from './MapActions';

export const STATE_KEY = 'map';

const initState = {
  location: {
    name: null,
    country: null,
  },
  currentWeather: null,
  forecasts: null,
}

const MapReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_CURRENT_WEATHER: {
      console.log('here');
      return state;
    }
    case SET_LOCATION: {
      const location = R.prop('payload', action);

      console.log(location);

      return {
        ...state,
        location,
      }
    }
    case `${FETCH_CURRENT_WEATHER}_SUCCESS`: {
      const data = R.path(['payload', 'data'], action);

      console.log(data);

      return state;
    }
    case `${FETCH_CURRENT_WEATHER}_FAIL`: {
      console.log(action);
      return state;
    }
    default: { return state; }
  }
};

export const getCurrentInfo = (state) => R.compose(
  R.pick(['location', 'currentWeather']),
  R.prop(STATE_KEY)
)(state);

export const getForecasts = state => R.pathOr([], [STATE_KEY, 'forecasts'], state);

export default MapReducer;