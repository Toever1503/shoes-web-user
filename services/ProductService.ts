import FetchInstance from './conf/FetchInstance';

const basePath = '/san-pham/public'

const locSp = (payload: any, page = 0, size = 10, sort: string = 'id,desc') => FetchInstance.post(`${basePath}?page=${page}&size=${size}&${sort}`, payload);
const chiTietSp = (id: number) => FetchInstance.get(`${basePath}/${id}`);

const getAllCategory = () => FetchInstance.get(`/danh-muc-giay/loc-danh-muc?page=0&size=999&layMacDinh=1`);
const getAllBrand = () => FetchInstance.get(`/thuong-hieu/loc-thuong-hieu?page=0&size=999&layMacDinh=1`);
const getAllColorVariation = () => FetchInstance.get(`${basePath}/get-all-gia-tri-bien-the/1`);
const getAllSizeVariation = () => FetchInstance.get(`${basePath}/get-all-gia-tri-bien-the/2`);
const checkVoucher = (code: string, productIds: number[]) => FetchInstance.get(`/voucher/public/kiem-tra-voucher/${code}?productList=${productIds}`);


// get-all-gia-tri-bien-the
export default {
    locSp,
    chiTietSp,

    getAllCategory,
    getAllBrand,
    getAllColorVariation,
    getAllSizeVariation,
    checkVoucher
};