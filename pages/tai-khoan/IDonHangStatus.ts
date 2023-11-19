export type ETrangThaiDonHang = 'ALL'| 'WAITING_CONFIRM'| 'VNPAY_PAID'| 'DELIVERING'| 'COMPLETED'| 'PHONE_RETURNED'| 'WRONG_SP_RETURNED' | 'CANCELLED';

type IOrderStatusList = {
    label: string;
    value: ETrangThaiDonHang,
    order: number
}
export const ORDER_STATUS_LIST: IOrderStatusList[] = [
    { label: "Chờ xác nhận", value: "WAITING_CONFIRM", order: 2 },
    { label: "VNPAY đã thanh toán", value: "VNPAY_PAID", order: 3 },
    { label: "Đang giao hàng", value: "DELIVERING", order: 4 },
    { label: "Hoàn Tất", value: "COMPLETED", order: 5 },
    { label: "(Hoàn trả) Không nghe máy", value: "PHONE_RETURNED", order: 6 },
    { label: "(Hoàn trả) Sản phẩm sai", value: "WRONG_SP_RETURNED", order: 7 },
    { label: "Hủy bỏ", value: "CANCELLED", order: 8 },
];
export function getLabelOrderStatusByValue(value: ETrangThaiDonHang) {
    const foundStatus = ORDER_STATUS_LIST.find((status) => status.value === value);
    return foundStatus ? foundStatus.label : "Không tìm thấy";
}