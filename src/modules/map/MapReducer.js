import * as R from 'ramda';
import { FETCH_LOCATION_AND_FORECAST } from './MapActions';

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
    case `${FETCH_LOCATION_AND_FORECAST}_SUCCESS`: {
      const data = R.path(['payload', 'data'], action);

      console.log(data);

      const locationName = R.path(['location', 'name'], data);
      const country = R.path(['location', 'country'], data);
      const currentWeather = R.prop('current', data);
      const forecasts = R.path(['forecast', 'forecastday'], data);

      return {
        ...state,
        location: {
          name: locationName,
          country,
        },
        currentWeather,
        forecasts,
      };
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