import * as R from 'ramda';
import { FETCH_LOCATION_AND_FORECAST } from './MapActions';

export const STATE_KEY = 'map';

const initState = {
  locationName: null,
  currentTemp: null,
  forecasts: null,
}

const MapReducer = (state = initState, action) => {
  switch (action.type) {
    case `${FETCH_LOCATION_AND_FORECAST}_SUCCESS`: {
      const data = R.path(['payload', 'data'], action);

      console.log(data);

      const locationName = R.path(['location', 'name'], data);
      const country = R.path(['location', 'country'], data);
      const currentTemp = R.path(['current', 'temp_c'], data);
      const forecasts = R.path(['forecast', 'forecastday'], data);

      return {
        ...state,
        locationName: `${locationName}, ${country}`,
        currentTemp,
        forecasts,
      };
    }
    default: { return state; }
  }
};

export const getLocationNameAndTemp = (state) => R.compose(
  R.pick(['locationName', 'currentTemp']),
  R.prop(STATE_KEY)
)(state);

export default MapReducer;