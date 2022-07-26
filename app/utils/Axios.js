import axios from 'axios';

const qualificameApiAxios = axios.create();
const qualificameAuthAxios = axios.create();
const qualificameVentasApi = axios.create();

qualificameApiAxios.defaults.headers.common['Content-Type'] = 'application/json';
qualificameAuthAxios.defaults.headers.common['Content-Type'] = 'application/json';
//Allow the use of array parameter with key value
qualificameVentasApi.defaults.headers.common['Content-Type'] = 'application/json';
qualificameVentasApi.defaults.headers.common['authorization'] = '3d524a53c110e4c22463b10ed32cef9d';

export { qualificameApiAxios, qualificameAuthAxios, qualificameVentasApi };
