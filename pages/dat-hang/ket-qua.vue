<template>
    <div class="px-3 md:px-[50px] w-full">
        <a-breadcrumb class="bg-gray-50 p-2">
            <a-breadcrumb-item>
                <router-link to="/">Trang chủ</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Đặt hàng</a-breadcrumb-item>
            <a-breadcrumb-item>Kết quả</a-breadcrumb-item>
        </a-breadcrumb>

        <section class="p-5 text-center">
            <h3 class="text-2xl mb-0">Đơn hàng đã được tạo thành công!</h3>
            <p class="mb-3 text-[#777c87]">
                Mã đơn hàng của bạn là: #883738
                <br>
                Chúng tôi sẽ liên hệ lại với bạn để xác nhận đơn hàng. Cảm ơn quý khách đã sử dụng dịch vụ!
            </p>

            <h3 class="text-2xl" style="border-bottom: 2px solid orange;">
              Thông Tin Đơn Hàng
            </h3>
            {{ orderDetail }}
            <a-table :columns="tblCols" :data-source="tbLData" :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'product'">
                <router-link class="m-0" :to="`/san-pham/${record.productName}/${record.productId}`">
                  <span class="m-0">
                    {{ record.productName }}
                  </span>
                </router-link>
                <p class="m-0">
                  {{ record.variation }}
                  -
                  x{{ record.qty }}
                </p>
              </template>

              <template v-if="column.dataIndex === 'price'">
                <span>{{ record.price }} vnd</span>
              </template>

              <template v-if="column.dataIndex === 'qty'">
                <span>{{ record.price * record.qty }} vnd</span>
              </template>

            </template>
          </a-table>
        </section>
    </div>
</template>

<script setup lang="ts">
import { useCartStore, ICart } from "~/stores/cart";
import {useRoute, useRouter} from "vue-router";
import PaymentService from "~/services/PaymentService";

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
            .then((res) => {
              console.log("detail order: ", res);
              orderDetail.value = res;
            //   _storeCart.forceResetCartItem();
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