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
    case SET_LOCATION: {
      const location = R.prop('payload', action);

      return {
        ...state,
        location,
      }
    }
    case `${FETCH_CURRENT_WEATHER}_SUCCESS`: {
      const currentWeather = R.path(['payload', 'data'], action);

      console.log(JSON.stringify(currentWeather, null, 2));

      return {
        ...state,
        currentWeather,
      };
    }
    // case `${FETCH_CURRENT_WEATHER}_FAIL`: {
    //   console.log(action);
    //   return state;
    // }
    default: { return state; }
  }
};

export const getCurrentInfo = (state) => R.compose(
  R.pick(['location', 'currentWeather']),
  R.prop(STATE_KEY)
)(state);

export const getForecasts = state => R.pathOr([], [STATE_KEY, 'forecasts'], state);

export default MapReducer;