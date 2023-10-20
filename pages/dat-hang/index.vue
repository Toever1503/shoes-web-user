<template>
  <div class="px-3 md:px-[50px] w-full">
    <a-breadcrumb class="bg-gray-50 p-2">
      <a-breadcrumb-item>
        <router-link to="/">Trang chủ</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Đặt hàng</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="w-full flex gap-[30px] mt-[30px]">
      <a-card class="w-[50%] shadow-sm">
        <template #title>
          <h3 class="text-2xl" style="border-bottom: 2px solid orange;">
            Thông Tin Mua Hàng
          </h3>
        </template>

        <a-form>

          <a-form-item label="Tên người nhận" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Số điện thoại" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Địa chỉ email" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Tỉnh/TP" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Quận/Huyện" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Phường/Xã" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Số nhà" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>

          <a-form-item label="Ghi chú cho shop" name="username"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-input v-model:value="formState.username" />
          </a-form-item>


        </a-form>

      </a-card>

      <a-space class="w-[50%]" direction="vertical">
        <a-card class="w-full shadow-sm">
          <template #title>
            <h3 class="text-2xl" style="border-bottom: 2px solid orange;">
              Thông Tin Đơn Hàng
            </h3>
          </template>

          <a-table :columns="columns" :data-source="_storeCart.cart" :pagination="false">
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

            <template #footer>
              <a-space direction="vertical" class="w-full">

                <a-space class="justify-between w-full">
                  <span class="font-semibold">
                    Tổng tiền sản phẩm
                  </span>

                  <span>
                    44$
                  </span>
                </a-space>

                <a-space class="justify-between w-full">
                  <span class="font-semibold">
                    Phí ship
                  </span>

                  <span>
                    5$
                  </span>
                </a-space>

                <a-space class="justify-between w-full">
                  <span class="font-semibold">
                    Giảm giá
                  </span>

                  <span>
                    0$
                  </span>
                </a-space>

                <a-space class="justify-between w-full">
                  <span class="font-semibold">
                    Tổng tiền thanh toán
                  </span>

                  <span class="text-red-500">
                    100$
                  </span>
                </a-space>


                <a-space class="w-full" direction="vertical">
                  <span class="font-semibold">
                    Chọn hình thức thanh toán
                  </span>

                  <a-radio-group>
                    <a-radio :value="1">Option A</a-radio>
                    <a-radio :value="2">Option B</a-radio>
                  </a-radio-group>
                </a-space>
                <a-space class="justify-end w-full">
                  <a-button>
                    Đặt hàng
                  </a-button>
                </a-space>


              </a-space>
            </template>
          </a-table>

        </a-card>
      </a-space>


    </div>


  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import { useCartStore, ICart } from "/stores/cart";

const _storeCart = useCartStore();

const columns: any = [
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
interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>