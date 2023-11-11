import Axios from './conf/Axios';

const basePath = '/danh-gia'

// const lichSuMua = (payload, page = 0, size = 10) => Axios.get(`${basePath}/lich-su-da-mua?trangThai=${payload}&page=${page}&size=${size} `);

const create = (payload) => Axios.post(`${basePath}/create`, payload);
const find = (payload) => Axios.get(`${basePath}/byIds?ids=${payload}`);
// const chiTietOrder = (payload) => Axios.get(`${basePath}/chi-tiet/${payload}`);
export const danhGiaService = {
    create,find
};