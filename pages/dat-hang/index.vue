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
          <h3 class="text-2xl" style="border-bottom: 2px solid orange">
            Thông Tin Mua Hàng
          </h3>
        </template>

        <a-form ref="formRef" :model="formState" :label-col="{ span: 8 }">
          <a-form-item label="Tên người nhận" name="hoTenNguoiNhan" :rules="[
            { required: true, message: 'Vui lòng không được bỏ trống!' },
          ]">
            <a-input v-model:value="formState.hoTenNguoiNhan"
              @change="formState.hoTenNguoiNhan = _removeSpecialChars(formState.hoTenNguoiNhan).replace(/^\s+/, '')" />
          </a-form-item>

          <a-form-item label="Số điện thoại" name="soDienThoaiNhanHang"
            :rules="[{ required: true, validator: handleValidateTypePhone }]">
            <a-input v-model:value="formState.soDienThoaiNhanHang"
              @change="formState.soDienThoaiNhanHang = formState.soDienThoaiNhanHang.replace(/[^0-9@]/g, '')"
              :maxLength="10" />
          </a-form-item>

          <a-form-item label="Địa chỉ email" name="email" :rules="[{ validator: handleValidateTypeEmail }]">
            <a-input v-model:value="formState.email" :maxLength="255"
              @change="formState.email = formState.email.replace(/^\s+/, '')" type="email" />
          </a-form-item>

          <div class="flex justify-end mb-2" v-if="false">
            <a-button v-if="true" size="small"> Chọn địa chỉ cũ </a-button>
          </div>
          <a-form-item label="Tỉnh/TP" name="province" :rules="[{ required: true, message: 'Vui lòng chọn tỉnh/TP!' }]">
            <a-select v-model:value="formState.province" show-search class="w-full min-w-[200px]"
              placeholder="Chọn tỉnh/tp" style="width: 100%" @change="onProvinceChange">
              <a-select-option value="">Chọn tỉnh/tp</a-select-option>
              <a-select-option v-for="(item, index) in provinceList" :key="index"
                :value="`${item.PROVINCE_ID}##${item.PROVINCE_NAME}`">
                {{ item.PROVINCE_NAME }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Quận/Huyện" name="district"
            :rules="[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]">
            <a-select v-model:value="formState.district" show-search placeholder="Chọn quận/huyện" style="width: 100%"
              @change="onDistrictChange">
              <a-select-option value="">Chọn quận/huyện</a-select-option>
              <a-select-option v-for="(item, index) in districtList" :key="index"
                :value="`${item.DISTRICT_ID}##${item.DISTRICT_NAME}`">
                {{ item.DISTRICT_NAME }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Phường/Xã" name="ward" :rules="[{ required: true, message: 'Vui lòng chọn xã/phường!' }]">
            <a-select v-model:value="formState.ward" show-search style="width: 100%">
              <a-select-option value="">Chọn xã/phường</a-select-option>
              <a-select-option v-for="(item, index) in wardList" :key="index"
                :value="`${item.WARDS_ID}##${item.WARDS_NAME}`">
                {{ item.WARDS_NAME }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="Số nhà" name="diaChiNhanHang" :rules="[
            { required: true, message: 'Vui lòng không được bỏ trống!' },
          ]">
            <a-input v-model:value="formState.diaChiNhanHang"
              @change="formState.diaChiNhanHang = _removeSpecialChars(formState.diaChiNhanHang).replace(/^\s+/, '')" />
          </a-form-item>

          <a-form-item label="Ghi chú cho shop" name="note">
            <a-textarea v-model:value="formState.note"
              @change="formState.note = _removeSpecialChars(formState.note).replace(/^\s+/, '')" :maxLength="255" />
          </a-form-item>
        </a-form>
      </a-card>

      <a-space class="w-[50%]" direction="vertical">
        <a-card class="w-full shadow-sm">
          <template #title>
            <h3 class="text-2xl" style="border-bottom: 2px solid orange">
              Thông Tin Đơn Hàng
            </h3>
          </template>

          <a-table :columns="columns" :data-source="_storeCart.variationNow
            ? [_storeCart.variationNow]
            : _storeCart.cart
            " :pagination="false">
            <template #bodyCell="{ column, text, record }">
              <template v-if="column.dataIndex === 'product'">
                <router-link class="m-0" :to="`/san-pham/${record.productName}/${record.productId}`">
                  <span class="m-0">
                    {{ record.productName }}
                  </span>
                </router-link>
                <p class="m-0">
                  {{ record.variation }}
                  - x{{ record.qty }}
                </p>
              </template>

              <template v-if="column.dataIndex === 'price'">
                <span>{{ _formatVnCurrency(record.price) }}</span>
              </template>

              <template v-if="column.dataIndex === 'qty'">
                <span>{{ _formatVnCurrency(record.price * record.qty) }}</span>
              </template>
            </template>

            <template #footer>
              <a-space direction="vertical" class="w-full">
                <a-space class="justify-between w-full">
                  <span class="font-semibold"> Tổng tiền sản phẩm </span>

                  <span>
                    {{ _formatVnCurrency(_storeCart.cartTotalAmount) }}</span>
                </a-space>

                <a-space class="justify-between w-full">
                  <span class="font-semibold"> Phí ship </span>

                  <span> {{ _formatVnCurrency(formState.shipFee) }} </span>
                </a-space>

                <a-space class="justify-between w-full items-start">
                  <span class="font-semibold"> Giảm giá </span>

                  <div class="grid">
                    <a-modal :open="false" title="Danh sách mã giảm giá" :footer="null" :closable="false">
                      <a-space class="w-full mb-[15px]">
                        <a-input v-model:value="voucherModel.q" class="w-full" placeholder="Nhập mã giảm giá"></a-input>
                        <a-button :disabled="voucherModel.q" @click="onCheckVoucher">Áp dụng</a-button>
                      </a-space>

                      <div class="mt-[20px]">
                        <a-space class="items-center bordered w-full p-[15px] rounded-[4px] cursor-pointer">
                          <a-radio />
                          <div>
                            <h4 class="font-[700] m-0">Mã SJSHNS</h4>
                            <span>
                              Giảm 100k nhân dịp giáng sinh
                            </span>
                          </div>
                        </a-space>
                        <a-divider />
                       
                      </div>

                      <div class="flex justify-center">
                        <a-button type="primary">
                          Đồng ý
                        </a-button>
                      </div>


                    </a-modal>
                    <a-space>
                      <a-input class="w-[100px]" style="outline: none !important"  v-model:value="voucherModel.q"
                        size="small" placeholder="Mã giảm giá"></a-input>
                      <a-button size="small" @click="onCheckVoucher"
                        >Áp dụng</a-button
                      >
                    </a-space>

                    <span v-if="voucherModel.hasChecked && !voucherModel.isValid" class="text-end text-red-500">
                      {{ voucherModel.error }}
                    </span>
                    <span v-else class="text-end text-green-500">
                      {{ voucherModel.success }}
                    </span>
                  </div>
                </a-space>

                <a-space class="justify-between w-full">
                  <span class="font-semibold"> Tổng tiền thanh toán </span>

                  <span class="text-red-500">
                    {{ _formatVnCurrency(totalPay) }}
                  </span>
                </a-space>

                <a-space class="w-full" direction="vertical">
                  <span class="font-semibold"> Chọn hình thức thanh toán </span>

                  <a-radio-group v-model:value="formState.phuongThucTT">
                    <a-radio value="VNPAY">Thanh toán qua VNPAY</a-radio>
                    <a-radio value="COD">Thanh toán khi nhận hàng</a-radio>
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
import { reactive, inject, ref } from "vue";
import PaymentService from "~/services/PaymentService";
import { useCartStore, ICart } from "~/stores/cart";
import type { FormInstance } from "ant-design-vue";
import ProductService from "~/services/ProductService";

const _removeSpecialChars = inject("removeSpecialChars", (val: string) => val);
const _getProvinces = inject("getProvinces", (p: any) => []);
const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);
const _storeCart = useCartStore();
const _router = useRouter();

const formRef = ref<FormInstance>();
const onSubmitForm = () => {
  formRef?.value
    ?.validate()
    .then(() => {
      onFinish(formState);
    })
    .catch((error) => {
      onFinishFailed(error);
    });
};
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
  },
];
interface FormState {
  phanLoaidIds: number[];
  diaChiNhanHang: string;
  hoTenNguoiNhan: string;
  email?: string;
  soDienThoaiNhanHang: string;
  note: string;
  phuongThucTT: string;
  discount: number;
  shipFee: number;
  province: string;
  district: string;
  ward: string;
  totalPay: number;
}

const phoneValidator = () =>
  !/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(
    formState.soDienThoaiNhanHang
  );

const formState = reactive<FormState>({
  phanLoaidIds: [],
  diaChiNhanHang: "",
  hoTenNguoiNhan: "",
  soDienThoaiNhanHang: "",
  note: "",
  phuongThucTT: "VNPAY",
  discount: 0,
  shipFee: 0,
  province: "",
  district: "",
  ward: "",
  totalPay: 0,
});

type AddressProvinceType = {
  PROVINCE_ID: string;
  PROVINCE_NAME: string;
  district: AddressDistrictType[];
};
type AddressDistrictType = {
  DISTRICT_ID: string;
  DISTRICT_NAME: string;
  wards: AddressWardType[];
};
type AddressWardType = {
  WARDS_ID: string;
  WARDS_NAME: string;
};

const voucherModel = reactive<{
  hasChecked: Boolean;
  isValid: Boolean;
  isChecking: Boolean;
  error: string;
  success: string;
  voucherInfo?: Object;
  q: string;
  discountPrice: number;
}>({
  hasChecked: false,
  isValid: false,
  isChecking: false,
  error: "",
  success: "",
  voucherInfo: undefined,
  q: "",
  discountPrice: 0,
});

const onCheckVoucher = () => {
  if (voucherModel.isChecking) return;

  voucherModel.hasChecked = true;
  voucherModel.discountPrice = 0;
  voucherModel.voucherInfo = undefined;

  if (!voucherModel.q) {
    voucherModel.isValid = false;
    voucherModel.error = "Vui lòng nhập mã code giảm giá!";
  } else {
    voucherModel.isChecking = true;
    const productIds: number[] = [];
    new Set(_storeCart.cart.map((item) => item.productId)).forEach((i) => {
      productIds.push(i);
    });
    ProductService.checkVoucher(voucherModel.q, productIds)
      .then((res: any) => {
        voucherModel.voucherInfo = res;
        voucherModel.isValid = true;
        console.log("voucher info: ", res);
        if (res.giamGiaTheo == "PERCENT") {
          const priceDiscount =
            _storeCart.cartTotalAmount * (res.phanTramGiam / 100);
          voucherModel.success =
            "Áp mã thành công, bạn được giảm " +
            _formatVnCurrency(priceDiscount);
          voucherModel.discountPrice = priceDiscount;
        } else {
          voucherModel.success =
            "Áp mã thành công, bạn được giảm " + _formatVnCurrency(res.giaGiam);
          voucherModel.discountPrice = res.giaGiam;
        }
      })
      .catch((err) => {
        console.log("check voucher failed: ", err.response.status);
        voucherModel.isValid = false;
        if (err.response.status == 404)
          voucherModel.error = "Rất tiếc, mã giảm giá không tồn tại!";
        else
          voucherModel.error =
            "Rất tiếc, sản phẩm của bạn không phù hợp với mã giảm này!";
      })
      .finally(() => (voucherModel.isChecking = false));
  }
};

const handleValidateTypePhone = (rule, value) => {
  if (!value) return Promise.reject('Vui lòng không bỏ trống!');
  if (value && !/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
    return Promise.reject('Số điện thoại không đúng!');
  }
  return Promise.resolve();
};

const handleValidateTypeEmail = (rule, value) => {
  if (value && !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g.test(value)) {
    return Promise.reject('Email không hợp lệ!');
  }
  return Promise.resolve();
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
      (item) => formState.district.split("##")[0] == item.DISTRICT_ID
    );
    wardList.value = district[0].wards;
    console.log("on district change: ", district[0]);
  }
  calcShipFee();
};

const previousAddressId = ref<number>();
const submitted = ref<boolean>(false);
const onFinish = (values: any) => {
  console.log("Success:", values);
  if (submitted.value) return;
  submitted.value = true;
  const payload: any = {
    email: formState.email,
    phuongThucTT: formState.phuongThucTT,
    note: formState.note,
    hoTenNguoiNhan: formState.hoTenNguoiNhan,
    soDienThoaiNhanHang: formState.soDienThoaiNhanHang,
    diaChiNhanHang: undefined,
    diaChiId: undefined,
    maGiamGiaId: voucherModel?.voucherInfo?.id || undefined,
    shipFee: formState.shipFee,
    totalPay: formState.totalPay,
  };

  if (previousAddressId.value) payload.diaChiId = previousAddressId.value;
  else
    payload.diaChiNhanHang = `${formState.diaChiNhanHang}__${formState.ward}__${formState.district}__${formState.province}`;

  if (_storeCart.variationNow)
    payload.gioHangTamThoiReqDto = [
      {
        sanPhamBienThe: _storeCart.variationNow.id,
        soLuong: _storeCart.variationNow.qty,
      },
    ];
  else
    payload.gioHangTamThoiReqDto = _storeCart.cart.map((item) => ({
      sanPhamBienThe: item.id,
      soLuong: item.qty,
    }));
  console.log("order payload: ", payload);

  PaymentService.checkout(payload)
    .then((res) => {
      const data: any = res;
      console.log("data hang ok:", res);
      localStorage.setItem("lastAddress", payload.diaChiNhanHang);
      localStorage.setItem("lastOrderReceipent", formState.hoTenNguoiNhan);
      localStorage.setItem("lastOrderPhone", formState.soDienThoaiNhanHang);
      localStorage.setItem("lastOrderEmail", formState.email || "");
      if (formState.phuongThucTT == "VNPAY") location.replace(data.urlPay);
      else _router.push("/dat-hang/ket-qua?status=SUCCESS&id=" + data.id);
    })
    .catch((err) => {
      console.log("checkout failed: ", err.response?._data?.code);
      notification.error({
        message: "Đặt hàng thất bại. " + (err.response?._data?.code != 9999 ? err.response?._data?.message : ""),
      });
    })
    .finally(() => (submitted.value = false));
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  notification.error({
    message: "Vui lòng kiểm tra lại thông tin!",
  });
};

const totalPay = computed(() => {
  if (_storeCart.variationNow)
    formState.totalPay =
      _storeCart.variationNow.qty * _storeCart.variationNow.price +
      formState.shipFee -
      voucherModel.discountPrice;
  else
    formState.totalPay =
      _storeCart.cartTotalAmount +
      formState.shipFee -
      voucherModel.discountPrice;
  return formState.totalPay;
});

const calcShipFee = () => {
  const DEFAULT_FEE = 6000;
  const payload = {
    SENDER_PROVINCE: 1,
    SENDER_DISTRICT: 1,
    RECEIVER_PROVINCE: Number(formState.province.split("##")[0]),
    RECEIVER_DISTRICT: Number(formState.district.split("##")[0]),
    PRODUCT_TYPE: "HH",
    PRODUCT_WEIGHT: _storeCart.variationNow
      ? _storeCart.variationNow.qty * 400
      : _storeCart.cartTotalQty * 400,
    PRODUCT_PRICE: 0,
    MONEY_COLLECTION: 0,
    TYPE: 1,
  };

  fetch("https://api.viettelpost.vn/api/tmdt/getPriceAll", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    redirect: "follow",
  })
    .then((response) => response.json())
    .then((result) => {
      result = result.sort((r1, r2) => r1.GIA_CUOC - r2.GIA_CUOC);
      console.log(result);

      if (result.length == 0) {
      } else {
        formState.shipFee =
          Math.ceil((result[0].GIA_CUOC + DEFAULT_FEE) / 1000) * 1000;
      }
    })
    .catch((error) => {
      console.log("error", error);
      formState.shipFee = 30000;
    });
};

onMounted(() => {
  console.log("dat hang page mounted");
  // load provinces
  provinceList.value = _getProvinces({ p: undefined });
  if (localStorage.getItem("lastAddress")) {
    try {
      const lastAddress = String(localStorage.getItem("lastAddress")).split(
        "__"
      );
      console.log("last add: ", lastAddress);
      formState.diaChiNhanHang = lastAddress[0];
      formState.province = lastAddress[3];
      onProvinceChange();
      formState.district = lastAddress[2];
      onDistrictChange();
      formState.ward = lastAddress[1];
    } catch (err) {
      console.log(err);
    }
    formState.hoTenNguoiNhan = localStorage.getItem("lastOrderReceipent") || "";
    formState.soDienThoaiNhanHang = localStorage.getItem("lastOrderPhone") || "";
    formState.email = localStorage.getItem("lastOrderEmail") || "";
  }
});
</script>
