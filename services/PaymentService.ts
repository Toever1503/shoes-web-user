import FetchInstance from './conf/FetchInstance';

const basePath = '/payment';
const checkout = (payload: any) => FetchInstance.post(`${basePath}/dat-hang`, payload);
const getDetailOrder = (id: any) => FetchInstance.get(`${basePath}/detail/${id}`);

export default {
    checkout,
    getDetailOrder
};