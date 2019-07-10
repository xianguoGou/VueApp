import axios from 'axios';
import { Indicator } from 'mint-ui';

const isDev = process.env.NODE_ENV === 'development';
const ajax = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/115736' : 'http://rap2api.taobao.org/app/mock/115736',
});

ajax.interceptors.request.use((config) => {
  const newConfig = config;
  Indicator.open('Loading…');
  newConfig.headers['bios-token'] = window.localStorage.getItem('bios-token');
  return newConfig;
});

ajax.interceptors.response.use(resp => new Promise((resolve) => {
  switch (resp.data.code) {
    case 200:
      resolve(resp.data.data);
      break;
    default:
      resolve(resp);
      break;
  }
  Indicator.close();
}),
);

export const getTypes = () => ajax.get('/api/v1/type');
export const getDetailList = id => ajax.get(`/api/v1/detaillist/${id}`);
export const postLogin = params => ajax.post('api/v1/login', params);
export const getDetail = id => ajax.get(`/api/v1/thingdetail/${id}`);
export const getSearch = () => ajax.get('/api/v1/search');

