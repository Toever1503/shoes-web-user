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
    noiSanXuat: ""
};

export type EProductVariation = "COLOR" | "SIZE" | "BOTH";
export interface IFileModel {
    id: number
    url: string
    path?: string
    name?: string
}