import Axios from './conf/Axios';

const basePath = '/don-hang'

const lichSuMua = (payload, page = 0, size = 10) => Axios.get(`${basePath}/lich-su-da-mua?trangThai=${payload}&page=${page}&size=${size} `);

const chiTietOrder = (payload) => Axios.get(`${basePath}/chi-tiet/${payload}`);
const trackOrder = (q: string) => Axios.get(`${basePath}/public/tra-cuu?q=${q}`);
export const orderUserService = {
    lichSuMua,
    chiTietOrder,
    trackOrder
};