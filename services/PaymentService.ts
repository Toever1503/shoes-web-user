import FetchInstance from './conf/FetchInstance';

const basePath = '/payment';
const checkout = (payload: any) => FetchInstance.post(`${basePath}/dat-hang`, payload);
const getDetailOrder = (id: any) => FetchInstance.get(`${basePath}/detail/${id}`);

const calcFeeShip = (payload: any) => $fetch("https://partner.viettelpost.vn/v2/order/getPriceAll", {
    method: 'POST',
    body: payload
});

export default {
    checkout,
    getDetailOrder,
    calcFeeShip
};