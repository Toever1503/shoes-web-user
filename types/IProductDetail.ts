import IBrandType from "./IBrandType"
import ICategoryType from "./ICategoryType"

export default interface IProductDetail {
    id: number;
    tieuDe: string;
    maSP: string;
    dmGiay: ICategoryType;
    thuongHieu: IBrandType;
    hienThiWeb: boolean;
    gioiTinh: 'MALE' | 'FEMALE' | 'BOTH';
    giaMoi: number;
    giaCu: number;
    anhChinh: IFileModel;
    anhPhu: IFileModel[];
    moTa: string;
    nguoiTao: number;
    loaiBienThe: EProductVariation;
    vouchers: [];
    chatLieu: "",
    trongLuong: "",
    congNghe: "",
    tinhNang: "",
    noiSanXuat: "",
    bienTheDTOS: {
        id: number;
        bienThe1: number;
        bienThe2: number;
        giatri1: number;
        giatri2: number;
        anh: IFileModel;
        anhSpChinh: IFileModel;
        soLuong: number;
        giaTriObj1: {
            id: number;
            giaTri: string;
        };
        giaTriObj2: {
            id: number;
            giaTri: string;
        };
    }[]
};

export type EProductVariation = "COLOR" | "SIZE" | "BOTH";
export interface IFileModel {
    id: number
    url: string
    path?: string
    name?: string
}