export interface IProductFilterModel {
    name?: string;
    category?: number;
    color?: number;
    size?: number;
    brand?: number;
    priceStart: number;
    priceEnd: number;
    priceRange: [number, number]
};

export interface IProductFilterReq{
    dmGiay?: number;
    thuongHieu?: number;
    khoangGia?: number[];
    hienThiWeb?: boolean;
    tieuDe?: string;
    mau?: number;
    size?: number;
    gioiTinh?: 'MALE' | 'FEMALE';
  }