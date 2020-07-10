import { OPEN_WEATHER_API_KEY } from 'react-native-dotenv';

const namespace='MAP';

export const FETCH_CURRENT_WEATHER = `${namespace}/FETCH_CURRENT_WEATHER`;
export const SET_LOCATION = `${namespace}/SET_LOCATION`;

export const fetchCurrentWeather = ({ latitude, longitude }, unitsType) => ({
  type: FETCH_CURRENT_WEATHER,
  payload: {
    request: {
      url: `onecall?appid=${OPEN_WEATHER_API_KEY}&exclude=hourly,daily,minutely&lat=${latitude}&lon=${longitude}&units=${unitsType}`,
    },
  },
});

export const setLocation = (payload) => ({
  type: SET_LOCATION,
  payload,
});