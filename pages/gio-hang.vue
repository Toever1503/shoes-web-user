<template>
  <div>
    <a-breadcrumb class="bg-gray-50 px-3 py-2 md:px-[50px]">
      <a-breadcrumb-item>
        <router-link to="/">Trang chủ</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Giỏ hàng</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="page_content px-3 md:px-[50px]">
      <a-table class="mt-[20px]" :columns="columns" :data-source="_storeCart.cart" bordered :pagination="false">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'image'">
            <router-link :to="`/san-pham/${record.productName}/${record.productId}`">
              <a-image class="bordered" :preview="false" :width="100" :src="record.anh" />
            </router-link>
          </template>

          <template v-if="column.dataIndex === 'product'">
            <router-link :to="`/san-pham/${record.productName}/${record.productId}`">
              <h3 class="m-0">
                {{ record.productName }}
              </h3>
            </router-link>
            <p>{{ record.variation }}</p>
          </template>

          <template v-if="column.dataIndex === 'price'">
            <p>{{ _formatVnCurrency(record.price) }} </p>
          </template>

          <template v-if="column.dataIndex === 'qty'">
            <a-input-number v-model:value="record.qty" @change="(val: any) => updateQty(Number(val), record as ICart)" />
          </template>

          <template v-else-if="column.dataIndex === 'action'">
            <DeleteOutlined @click="_storeCart.removeCartItem(record.id)"
              class="mx-auto text-xl hover:text-red-500 cursor-pointer duration-150 ease-in-out" />
          </template>
        </template>
      </a-table>

      <div class="flex justify-end">
        <div class="mt-[20px] w-1/2 bordered">
          <a-descriptions :column="1">
            <template #title>
              <h3 class="bg-main text-white m-0 p-3">
                Tổng thanh toán (Tạm tính)
              </h3>
            </template>
            <a-descriptions-item class="px-5" label="Tổng sản phẩm">
              <div class="text-end w-full">{{ _storeCart.cartTotalQty }}</div>
            </a-descriptions-item>

            <a-descriptions-item class="px-5" label="Tổng Tiền">
              <div class="text-end w-full">
                {{ _formatVnCurrency(_storeCart.cartTotalAmount) }}
              </div>
            </a-descriptions-item>

            <a-descriptions-item class="px-5">
              <div class="text-end w-full">
                <a-button class="bg-black text-white">
                  <router-link to="/dat-hang"> Đặt hàng </router-link>
                </a-button>
              </div>
            </a-descriptions-item>
          </a-descriptions>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { useCartStore, ICart } from "~/stores/cart";

const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);
const _storeCart = useCartStore();

const columns: any = [
  {
    title: "Ảnh",
    dataIndex: "image",
    align: "center",
  },
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
    title: "Số lượng",
    dataIndex: "qty",
    align: "center",
  },
  {
    title: "Hành động",
    dataIndex: "action",
    align: "center",
    width: "120px",
  },
];

const updateQty = (val: number, record: ICart) => {
  console.log("on change qty: ", val, record);
  _storeCart.updateCartQuantity({ ...record, qty: val });
};
</script>

