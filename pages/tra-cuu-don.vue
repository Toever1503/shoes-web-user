<template>
    <div class="mx-auto">
        <a-breadcrumb class="bg-gray-50 md:px-[50px] px-3 py-2">
            <a-breadcrumb-item>
                <router-link to="/">Trang chủ</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Tra cứu đơn hàng</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="mx-auto max-w-[1000px] pt-[20px]">

            <section class="px-3 md:px-[50px]">
                <a-card class="bg-white shadown rounded px-6">
                    <div class="container">
                        <h1 class="text-center font-bold text-3xl pt-5">Tra cứu đơn hàng</h1>
                        <p class=" text-center mt-7">Để tra cứu thông tin đơn hàng, quý khách vui lòng nhập mã đơn hàng hoặc
                            số
                            điện thoại đặt hàng.
                        </p>
                    </div>
                    <div>
                        <label for="oderId" class="font-bold block mb-3">Mã đơn hàng/Số điện thoại</label>
                        <a-input v-model:value="q" type="text" id="oderId" name="oderId" placeholder="..." />
                    </div>
                    <div class=" flex justify-center mt-[15px]">
                        <a-button @click="onSearch" type="primary" :loading="isSearching">
                            Tìm kiếm
                        </a-button>
                    </div>
                </a-card>
            </section>
            <section class="mt-[20px] px-3 md:px-[50px]" v-show="hasTracked">
                <h3 class="m-0 py-3">
                    Kết quả tìm kiếm
                </h3>
                <a-table :columns="columns" :loading="isSearching" bordered :data-source="orderData" :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'image'">
                            <router-link :to="`/san-pham/${record.productName}/${record.productId}`">
                                <a-image class="bordered" :preview="false" :width="100" :src="record.anh" />
                            </router-link>
                        </template>

                        <template v-if="column.dataIndex === 'diaChi'">
                            {{ record.diaChi.tenNguoiNhan }}
                        </template>
                        <template v-if="column.dataIndex === 'trangThai'">
                            {{ getLabelOrderStatusByValue(record.trangThai) }}
                        </template>

                        <template v-if="column.dataIndex === 'price'">
                            <p>{{ _formatVnCurrency(record.tongGiaCuoiCung) }}</p>
                        </template>

                        <template v-if="column.dataIndex === 'ngayTao'">
                            <p>{{ $dayjs(record.ngayTao).format("DD/MM/YYYY HH:mm") }}</p>
                        </template>

                        <template v-else-if="column.dataIndex === 'action'">
                            <a-button @click="onShowDetailOrder(record)">
                                Chi tiết
                            </a-button>
                        </template>
                    </template>
                </a-table>

                <a-modal :open="detailOrder.isOpen" width="900px" @cancel="onCloseDetailOrder" :footer="null"
                    title="Đơn hàng chi tiết">
                    <a-table bordered :pagination="false" :columns="detailOrder.columns" :scroll="{ x: 700 }"
                        :dataSource="detailOrder.chiTietDonHang">
                        <template #bodyCell="{ column, text, record }">
                            <template v-if="column.dataIndex === 'giaTien'">
                                {{ _formatVnCurrency(text) }}
                            </template>

                            <template v-else-if="column.dataIndex === 'soLuong'">
                                {{ text }}
                            </template>
                            <template v-else-if="column.dataIndex === 'sanPham'">
                                {{ record?.sanPham?.tieuDe }} <br>
                                {{ record?.motaPhanLoai }}
                            </template>
                            <template v-else-if="column.dataIndex === 'sanPham.anhChinh'">
                                <a-image :width="100" :src="record?.sanPham?.anhChinh?.url" />
                            </template>
                            <template v-else-if="column.dataIndex === 'tongTien'">
                                {{ _formatVnCurrency(record.giaTien * record.soLuong) }}
                            </template>
                        </template>

                        <template #footer>
                            <a-card class="mb-[15px]">
                                <div>
                                    <p class="text-[16px] font-bold">Tên người nhận</p>

                                    <p>{{ detailOrder?.data?.diaChi.tenNguoiNhan }}</p>

                                    <a-divider />

                                    <p class="text-[16px] font-bold">Thông tin liên hệ</p>

                                    <p>SDT: {{ detailOrder?.data?.diaChi.sdt }}</p>
                                    <p>Email: {{ detailOrder?.data?.diaChi.email || "-" }}</p>

                                    <a-divider />

                                    <p class="text-[16px] font-bold">Địa chỉ giao hàng</p>

                                    <p>
                                        {{ detailOrder?.data?.diaChi.diaChi.replaceAll(/__[0-9]+##/g, ", ") }}
                                    </p>

                                    <p class="text-[16px] font-bold">Ghi chú</p>
                                    <p>{{ detailOrder?.data?.ghiChu || "-" }}</p>
                                    <!-- <a-badge status="processing" text="Running" /> -->
                                </div>
                            </a-card>

                            <a-card>
                                <div class="w-full text-center grid grid-cols-3 justify-between">
                                    <div class="flex gap-[10px]">
                                        Tổng tiền sản phẩm({{ detailOrder?.data?.tongSp }} đôi)
                                    </div>
                                    <p></p>
                                    <p>{{ _formatVnCurrency(detailOrder?.data?.tongGiaTien) }}</p>
                                </div>

                                <div class="w-full text-center grid grid-cols-3 justify-between">
                                    <div class="flex gap-[10px]">Giảm giá</div>
                                    <p></p>
                                    <p>{{ _formatVnCurrency(detailOrder?.data?.tongTienGiamGia) }}</p>
                                </div>

                                <div class="w-full text-center grid grid-cols-3 justify-between">
                                    <div class="flex gap-[10px]">Phí ship</div>
                                    <p></p>
                                    <p>{{ _formatVnCurrency(detailOrder?.data?.phiShip) }}</p>
                                </div>

                                <div class="w-full text-center grid grid-cols-3 justify-between">
                                    <div class="flex gap-[10px]">Phương thức thanh toán</div>
                                    <p></p>
                                    <p>{{ detailOrder?.data?.phuongThucTT }}</p>
                                </div>

                                <div class="w-full text-center grid grid-cols-3 justify-between font-bold">
                                    <div class="flex gap-[10px]">Tổng tiền thanh toán</div>
                                    <p></p>
                                    <p>{{ _formatVnCurrency(detailOrder?.data?.tongGiaCuoiCung) }}</p>
                                </div>
                            </a-card>
                        </template>
                    </a-table>
                </a-modal>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { orderUserService } from "~/services/OrderUser";
import { getLabelOrderStatusByValue } from "./tai-khoan/IDonHangStatus";
const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);

const q = ref<string>("");

const orderData = ref([]);
const isSearching = ref<boolean>(false);
const onSearch = () => {
    if (!q.value) {
        notification.warning({
            message: "Vui lòng không được bỏ trống!"
        })
        return;
    }
    onTrackOrder();
};

const columns: any = [
    {
        title: "STT",
        dataIndex: "stt",
        align: "center",
    },
    {
        title: "Mã đơn hàng",
        dataIndex: "maDonHang",
        align: "center",
    },
    {
        title: "Người nhận",
        dataIndex: "diaChi",
        align: "center",
    },
    {
        title: "Tổng thanh toán",
        dataIndex: "price",
        align: "center",
    },
    {
        title: "Trạng thái",
        dataIndex: "trangThai",
        align: "center",
    },
    {
        title: "Ngày đặt",
        dataIndex: "ngayTao",
        align: "center",
    },
    {
        title: "Hành động",
        dataIndex: "action",
        align: "center",
    }
];

const detailOrder = reactive<any>({
    isOpen: false,
    columns: [
        {
            title: "Ảnh",
            dataIndex: "sanPham.anhChinh",
            key: "sanPham.anhChinh",
            align: "center",
        },
        {
            title: "Sản phẩm",
            dataIndex: "sanPham",
            key: "sanPham",
            align: "center",
        },

        {
            title: "Giá Tiền",
            dataIndex: "giaTien",
            key: "giaTien",
            align: "center",
        },
        {
            title: "Số lượng",
            dataIndex: "soLuong",
            key: "soLuong",
            align: "center",
        },
        {
            title: "Tổng tiền",
            dataIndex: "tongTien",
            key: "tongTien",
            align: "center",
        },
    ],
    data: {},
    chiTietDonHang: []
});
const onShowDetailOrder = (record: any) => {
    detailOrder.chiTietDonHang = record.chiTietDonHang;
    detailOrder.data = record;
    detailOrder.isOpen = true;
};
const onCloseDetailOrder = () => detailOrder.isOpen = false;

const hasTracked = ref<boolean>(false);
const onTrackOrder = () => {
    if (isSearching.value) return;
    isSearching.value = true;
    orderUserService.trackOrder(q.value)
        .then(({ data }) => {
            console.log("order track: ", data);
            orderData.value = data.map((item: any, index: number) => ({ ...item, stt: index + 1 }));
        })
        .catch(() => {
            notification.error({
                message: "Lỗi không thể tìm kiếm!"
            });
        })
        .finally(() => { hasTracked.value = true; isSearching.value = false });
}


</script>