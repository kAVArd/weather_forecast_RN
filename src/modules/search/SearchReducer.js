import { FETCH_FORECAST } from './SearchActions';
import * as R from 'ramda';
import moment from 'moment';

export const STATE_KEY = 'search';

const initState = {
  forecasts: [],
  isLoading: false,
}

const SearchReducer = (state = initState, action) => {
  switch (action.type) {
    case FETCH_FORECAST: {
      return R.assoc('isLoading', true, state);
    }
    case `${FETCH_FORECAST}_SUCCESS`: {
      const forecasts = R.path(['payload', 'data', 'daily'], action);

      const filteredForecasts = forecasts.map((item, index) => {
        const icon = R.path(['weather', '0', 'icon'], item);

        const date = R.prop('dt', item);

        const formattedDate = moment.unix(date).format('DD.MM');

        return {
          iconUrl: `http://openweathermap.org/img/wn/${icon}@2x.png`,
          date: index === 0 ? 'Today' : formattedDate,
          temp: Math.round(R.path(['temp', 'day'], item)),
          minTemp: Math.round(R.path(['temp', 'min'], item)),
          maxTemp: Math.round(R.path(['temp', 'max'], item)),
          feelsLike: Math.round(R.path(['feels_like', 'day'], item)),
          humidity: R.prop('humidity', item),
          windSpeed: Math.round(R.prop('wind_speed', item)),
          uv: Math.round(R.prop('uvi', item)),
        }
      });

      return {
        ...state,
        isLoading: false,
        forecasts: filteredForecasts,
      };
    }
    default: { return state; }
  }
};

export const getSearchText = state => R.path([STATE_KEY, 'searchText'], state);

export const getForecasts = state => R.path([STATE_KEY, 'forecasts'], state);

export const getIsLoading = state => R.path([STATE_KEY, 'isLoading'], state);

export default SearchReducer;