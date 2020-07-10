import * as R from 'ramda';
import { FETCH_CURRENT_WEATHER, SET_LOCATION } from './MapActions';

export const STATE_KEY = 'map';

const initState = {
  location: null,
  forecasts: null,
}

const MapReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_LOCATION: {
      const { name, country } = R.prop('payload', action);

      return {
        ...state,
        location: {
          ...state.location,
          name,
          country,
        },
      }
    }
    case `${FETCH_CURRENT_WEATHER}_SUCCESS`: {
      const current = R.path(['payload', 'data', 'current'], action);

      const icon = R.path(['weather', '0', 'icon'], current);

      const filteredWeather = {
        iconUrl: `http://openweathermap.org/img/wn/${icon}@2x.png`,
        temp: Math.round(R.prop('temp', current)),
        feelsLike: Math.round(R.prop('feels_like', current)),
        humidity: R.prop('humidity', current),
        windSpeed: R.prop('wind_speed', current),
        uv: Math.round(R.prop('uvi', current)),
      }

      return {
        ...state,
        location: {
          ...state.location,
          currentWeather: filteredWeather,
        },
      };
    }
    // case `${FETCH_CURRENT_WEATHER}_FAIL`: {
    //   console.log(action);
    //   return state;
    // }
    default: { return state; }
  }
};

export const getLocationInfo = (state) => R.path([STATE_KEY, 'location'], state);

export const getForecasts = state => R.pathOr([], [STATE_KEY, 'forecasts'], state);

export default MapReducer;