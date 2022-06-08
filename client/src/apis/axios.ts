import axios from 'axios';
import config from '../config';

let baseURL =
  process.env.NODE_ENV === 'development'
    ? config.dev.api_url
    : config.prod.api_url;

export const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

export default api;
