import { OPEN_WEATHER_API_KEY } from 'react-native-dotenv';

const namespace = 'SEARCH';

export const FETCH_FORECAST = `${namespace}/FETCH_FORECAST`;

export const fetchForecast = ({ latitude, longitude }, unitsType) => ({
  type: FETCH_FORECAST,
  payload: {
    request: {
      url: `onecall?appid=${OPEN_WEATHER_API_KEY}&exclude=hourly,minutely,current&lat=${latitude}&lon=${longitude}&units=${unitsType}`,
    },
  },
});