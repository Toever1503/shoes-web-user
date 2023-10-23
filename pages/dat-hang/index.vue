<template>
  <div class="px-3 md:px-[50px] w-full">
    <a-breadcrumb class="bg-gray-50 p-2">
      <a-breadcrumb-item>
        <router-link to="/">Trang chủ</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Đặt hàng</a-breadcrumb-item>
      <a-breadcrumb-item>Điền thông tin đặt hàng</a-breadcrumb-item>
    </a-breadcrumb>

    <div class="w-full flex gap-[30px] mt-[30px]">
      <a-card class="w-[50%] shadow-sm">
        <template #title>
          <h3 class="text-2xl" style="border-bottom: 2px solid orange;">
            Thông Tin Mua Hàng
          </h3>
        </template>

        <a-form ref="formRef" :model="formState" :label-col="{ span: 8 }">

          <a-form-item label="Tên người nhận" name="hoTenNguoiNhan"
            :rules="[{ required: true, message: 'Vui lòng không được bỏ trống!' }]">
            <a-input v-model:value="formState.hoTenNguoiNhan" />
          </a-form-item>

          <a-form-item label="Số điện thoại" name="soDienThoaiNhanHang"
            :rules="[{ required: true, message: 'Vui lòng không được bỏ trống!' }]">
            <a-input v-model:value="formState.soDienThoaiNhanHang" />
          </a-form-item>

          <a-form-item label="Địa chỉ email" name="email">
            <a-input v-model:value="formState.email" type="email" />
          </a-form-item>

          <div class="flex justify-end mb-2" v-if="false">
            <a-button v-if="true" size="small">
              Chọn địa chỉ cũ
            </a-button>
          </div>
          <a-form-item label="Tỉnh/TP" name="province" :rules="[{ required: true, message: 'Vui lòng chọn tỉnh/TP!' }]">
            <a-select v-model:value="formState.province" show-search class="w-full min-w-[200px]"
              placeholder="Chọn tỉnh/tp" style="width: 100%" @change="onProvinceChange">
              <a-select-option value="">Chọn tỉnh/tp</a-select-option>
              <a-select-option v-for="(item, index) in provinceList" :key="index" :value="`${item.code}##${item.name}`">
                {{ item.name }}
              </a-select-option>
            </a-select>



          </a-form-item>

          <a-form-item label="Quận/Huyện" name="district"
            :rules="[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]">
            <a-select v-model:value="formState.district" show-search placeholder="Chọn quận/huyện" style="width: 100%"
              @change="onDistrictChange">
              <a-select-option value="">Chọn quận/huyện</a-select-option>
              <a-select-option v-for="(item, index) in districtList" :key="index" :value="`${item.code}##${item.name}`">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Phường/Xã" name="ward" :rules="[{ required: true, message: 'Vui lòng chọn xã/phường!' }]">
            <a-select v-model:value="formState.ward" show-search style="width: 100%">
              <a-select-option value="">Chọn xã/phường</a-select-option>
              <a-select-option v-for="(item, index) in wardList" :key="index" :value="`${item.code}##${item.name}`">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Số nhà" name="diaChiNhanHang"
            :rules="[{ required: true, message: 'Vui lòng không được bỏ trống!' }]">
            <a-input v-model:value="formState.diaChiNhanHang" />
          </a-form-item>

          <a-form-item label="Ghi chú cho shop" name="note">
            <a-input v-model:value="formState.note" />
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

                <a-space class="justify-between w-full items-start">
                  <span class="font-semibold">
                    Giảm giá
                  </span>

                  <div class="grid">
                    <a-space>
                      <a-input size="small"></a-input>
                      <a-button size="small">Áp dụng</a-button>
                    </a-space>
                    <span class="text-end">
                      - 0$
                    </span>
                  </div>
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

                  <a-radio-group v-model:value="formState.phuongThucTT">
                    <a-radio value="VNPAY">Thanh toán qua VNPAY</a-radio>
                    <a-radio value="CODE">Thanh toán khi nhận hàng</a-radio>
                  </a-radio-group>
                </a-space>
                <a-space class="justify-end w-full">
                  <a-button class="bg-black text-white" @click="onSubmitForm">
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
import { reactive, inject, ref } from 'vue';
import PaymentService from '~/services/PaymentService';
import { useCartStore, ICart } from "~/stores/cart";
import type { FormInstance } from 'ant-design-vue';

const _getProvinces = inject("getProvinces", (p: any) => []);
const _storeCart = useCartStore();
const _router = useRouter();

const formRef = ref<FormInstance>();
const onSubmitForm = () => {
  formRef?.value?.validate()
    .then(() => {
      onFinish(formState);
    })
    .catch(error => {
      onFinishFailed(error);
    });
}
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
  phanLoaidIds: number[],
  diaChiNhanHang: string,
  hoTenNguoiNhan: string,
  email?: string;
  soDienThoaiNhanHang: string,
  note: string,
  phuongThucTT: string,
  discount: 0,
  shipFee: 0,
  province: string;
  district: string;
  ward: string;
}

const phoneValidator = () =>
  !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(formState.soDienThoaiNhanHang);

const formState = reactive<FormState>({
  phanLoaidIds: [],
  diaChiNhanHang: '',
  hoTenNguoiNhan: '',
  soDienThoaiNhanHang: '',
  note: '',
  phuongThucTT: 'VNPAY',
  discount: 0,
  shipFee: 0,
  province: '',
  district: '',
  ward: ''
});


type AddressProvinceType = {
  code: string;
  name: string;
  district: AddressDistrictType[];
};
type AddressDistrictType = {
  code: string;
  name: string;
  wards: AddressWardType[];
};
type AddressWardType = {
  code: string;
  name: string;
};

const provinceList = ref<AddressProvinceType[]>([]);
const districtList = ref<AddressDistrictType[]>([]);
const wardList = ref<AddressWardType[]>([]);


const onProvinceChange = () => {
  districtList.value = [];
  wardList.value = [];
  formState.district = "";
  formState.ward = "";
  if (formState.province.split("##").length == 2) {
    const province = _getProvinces({
      p: formState.province.split("##")[0],
    });
    // @ts-ignore
    districtList.value = province[0].districts;
    console.log("on province change: ", province[0]);
  }
};
const onDistrictChange = () => {
  wardList.value = [];
  formState.ward = "";
  if (formState.district.split("##").length == 2) {
    const district: AddressDistrictType[] = districtList.value.filter(
      (item) => formState.district.split("##")[0] == item.code
    );
    wardList.value = district[0].wards;
    console.log("on district change: ", district[0]);
  }
};

const previousAddressId = ref<number>();
const submitted = ref<boolean>(false);
const onFinish = (values: any) => {

  console.log('Success:', values);
  if (submitted.value) return;
  submitted.value = true;
  const payload: any = {
    phuongThucTT: formState.phuongThucTT,
    note: formState.note,
    hoTenNguoiNhan: formState.hoTenNguoiNhan,
    soDienThoaiNhanHang: formState.soDienThoaiNhanHang,
    diaChiNhanHang: undefined,
    diaChiId: undefined,
  };

  if (previousAddressId.value) payload.diaChiId = previousAddressId.value;
  else
    payload.diaChiNhanHang = `${formState.diaChiNhanHang}__${formState.province}__${formState.district}__${formState.ward}`;

  // if (localStorage.getItem("loggedUser"))
  //   payload.gioHangItemIds = this.cart.map((item) => item.id);
  // else
  payload.gioHangTamThoiReqDto = _storeCart.cart.map((item) => ({
    sanPhamBienThe: item.id,
    soLuong: item.qty,
  }));
  console.log("order payload: ", payload);

  PaymentService.checkout(payload)
    .then((res) => {
      const data: any = res;
      console.log("data hang ok:", res);
      if (formState.phuongThucTT == "VNPAY")
        location.replace(data.urlPay);
      else _router.push("/dat-hang/ket-qua?status=SUCCESS&id=" + data.id);
    })
    .catch((err) => {
      console.log("checkout failed: ", err);
      notification.error({
        message: "Đặt hàngg thất bại. Vui lòng thử lại sau!"
      });
    })
    .finally(() => (submitted.value = false));
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
  notification.error({
    message: "Vui lòng kiểm tra lại thông tin!"
  });
};


onMounted(() => {

  console.log("dat hang page mounted")
  // load provinces
  provinceList.value = _getProvinces({ p: undefined });
});
</script>