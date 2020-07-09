import axios from 'axios';
import axiosMiddlewareFactory from 'redux-axios-middleware';
import AppConfig from '@config';

const axiosClient = axios.create({
  baseURL: `${AppConfig.baseWeatherURL}`,
  responseType: 'json',
});

const axiosMiddleware = axiosMiddlewareFactory(
  axiosClient,
);

export default axiosMiddleware;