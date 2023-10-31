<template>
  <div class="px-3 md:px-[50px] w-full">
    <a-breadcrumb class="bg-gray-50 p-2">
      <a-breadcrumb-item>
        <router-link to="/">Trang chủ</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Đặt hàng</a-breadcrumb-item>
      <a-breadcrumb-item>Kết quả</a-breadcrumb-item>
    </a-breadcrumb>

    <section class="p-5 text-center" v-if="_route.query.status == 'SUCCESS'">
      <h3 class="text-2xl mb-0">Đơn hàng đã được tạo thành công!</h3>
      <p class="mb-3 text-[#777c87]">
        Mã đơn hàng của bạn là: #{{ orderDetail?.maDonHang }}
        <br>
        Chúng tôi sẽ liên hệ lại với bạn để xác nhận đơn hàng. Cảm ơn quý khách đã sử dụng dịch vụ!
      </p>

      <a-card>
        <h3 class="text-2xl" style="border-bottom: 2px solid orange;">
          Thông Tin Đơn Hàng
        </h3>
        <a-table :columns="tblCols" :data-source="tbLData" :pagination="false">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.dataIndex === 'product'">
              <div class="w-[500px]">
                <router-link class="m-0" :to="`/san-pham/${record.sanPham.tieuDe}/${record.sanPham.id}`">
                  <span class="m-0">
                    {{ record.sanPham.tieuDe }}
                  </span>
                </router-link>
                <p class="m-0">
                  {{ record?.motaPhanLoai }}
                  -
                  x{{ record.soLuong }}
                </p>
              </div>
            </template>

            <template v-if="column.dataIndex === 'price'">
              <span>{{ _formatVnCurrency(record.giaTien) }} vnd</span>
            </template>

            <template v-if="column.dataIndex === 'qty'">
              <span>{{ _formatVnCurrency(record.giaTien * record.soLuong) }} </span>
            </template>

          </template>

          <template #footer>

            <a-space direction="vertical" class="w-full">

              <a-space class="justify-between w-full">
                <span class="font-semibold">
                  Tổng sản phẩm
                </span>

                <span>
                  {{ orderDetail?.tongSp | 0 }}
                </span>
              </a-space>

              <a-space class="justify-between w-full">
                <span class="font-semibold">
                  Tổng tiền sản phẩm
                </span>

                <span>
                  {{ _formatVnCurrency(orderDetail?.tongTienSp) }}
                </span>
              </a-space>

              <a-space class="justify-between w-full">
                <span class="font-semibold">
                  Phí ship
                </span>

                <span>
                  {{ _formatVnCurrency(orderDetail?.phiShip) }}
                </span>
              </a-space>

              <a-space class="justify-between w-full items-start">
                <span class="font-semibold">
                  Giảm giá
                </span>

                <span class="text-end">
                  {{ _formatVnCurrency(orderDetail?.tongTienGiamGia) }}
                </span>
              </a-space>

              <a-space class="justify-between w-full">
                <span class="font-semibold">
                  Hình thức thanh toán
                </span>

                <span>
                  {{ orderDetail?.phuongThucTT }}
                </span>
              </a-space>

              <a-space class="justify-between w-full">
                <span class="font-semibold">
                  Tổng tiền thanh toán
                </span>

                <span class="text-red-500">
                  {{ _formatVnCurrency(orderDetail?.tongGiaCuoiCung) }}
                </span>
              </a-space>


              <div class="w-full">
                <a-button class="bg-black text-white mx-auto w-fit">
                  <router-link to="/">Tiếp tục mua sắm </router-link>
                </a-button>
              </div>


            </a-space>
          </template>
        </a-table>
      </a-card>

    </section>

    <a-result v-else status="error" title="Thanh toán thất bại!">
      <template #extra>
        <div class="w-full">
          <a-button class="bg-black text-white mx-auto w-fit">
            <router-link to="/">Tiếp tục mua sắm </router-link>
          </a-button>
        </div>
      </template>

    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, ICart } from "~/stores/cart";
import { useRoute, useRouter } from "vue-router";
import PaymentService from "~/services/PaymentService";
import { onMounted } from "vue";

const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);
const _route = useRoute();
const _router = useRouter();
const _storeCart = useCartStore();


const tblCols: any = [
  {
    title: "Sản phẩm",
    className: "product",
    dataIndex: "product",
    align: "center",
  },
  {
    title: "Giá",
    dataIndex: "price",
    align: "center",
  },
  {
    title: "Tổng",
    dataIndex: "qty",
    align: "center",
  }
];
const tbLData = ref([]);
const orderDetail = ref();

onMounted(() => {
  if (!_route.query.status) _router.push("/404");
  else {
    if (_route.query.status == "SUCCESS") {
      if (_route.query.id)
        PaymentService.getDetailOrder(_route.query.id)
          .then((res: any) => {
            console.log("detail order: ", res);
            orderDetail.value = res;
            tbLData.value = res.chiTietDonHang;
            _storeCart.fSetCart([]);
          })
          .catch((err) => {
            console.log("get detail order failed: ", err);
            _router.push("/404");
          });

      else _router.push("/404");
    } else if (_route.query.status == "FAILED") {

    } else _router.push("/404");
  }

})

</script>