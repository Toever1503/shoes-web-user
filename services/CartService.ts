import FetchInstance from './conf/FetchInstance';

const basePath = '/gio-hang'

const addProduct = (payload: any) => FetchInstance.post(`${basePath}`, payload);
const removeProduct = (id: number) => FetchInstance.del(`${basePath}/remove-item/${id}`);
const myCart = () => FetchInstance.del(`${basePath}/gio-hang-cua-toi`);
const syncCart = (payload: {
    sanPhamBienThe: number;
    soLuong: number
}[]) => FetchInstance.post(`${basePath}/dong-bo-gio-hang`, payload);
export default {
    addProduct,
    removeProduct,
    syncCart,
    myCart
};