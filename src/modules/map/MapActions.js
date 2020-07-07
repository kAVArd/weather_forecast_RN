import { WEATHER_API_KEY } from 'react-native-dotenv';

const namespace='MAP';

export const FETCH_LOCATION_AND_FORECAST = `${namespace}/FETCH_LOCATION_AND_FORECAST`;

export const fetchLocationAndForecast = (coordinates) => ({
  type: FETCH_LOCATION_AND_FORECAST,
  payload: {
    request: {
      url: `forecast.json?key=${WEATHER_API_KEY}&q=${coordinates}&days=7`,
    },
  },
});