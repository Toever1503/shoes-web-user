export interface IProductFilterModel {
    name?: string;
    category?: number;
    color?: number;
    sizeId?: number;
    brand?: number;
    priceStart: number;
    priceEnd: number;
    soSaoDanhGia?: number;
    priceRange: [number, number]
};

export interface IProductFilterReq{
    dmGiay?: number;
    thuongHieu?: number;
    khoangGia?: number[];
    hienThiWeb?: boolean;
    tieuDe?: string;
    mau?: number;
    sizeId?: number;
    soSaoDanhGia?: number;
    gioiTinh?: 'MALE' | 'FEMALE';
  }