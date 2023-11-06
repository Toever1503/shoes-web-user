import FetchInstance from './conf/FetchInstance';

const basePath = '/san-pham/public'

const locSp = (payload: any, page = 0, size = 10) => FetchInstance.post(`${basePath}?page=${page}&size=${size}&sort=id,desc`, payload);
const chiTietSp = (id) => FetchInstance.get(`${basePath}/${id}`);

export default {
    locSp,
    chiTietSp
};