<template>
  <a-spin :spinning="isGettingProduct" size="large">
    <div class="max-w-[1400px] mx-auto">
      <a-breadcrumb class="bg-gray-50 px-3 py-2 md:px-[50px]">
        <a-breadcrumb-item>
          <router-link to="/">Trang chủ</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Sản phẩm</a-breadcrumb-item>
        <a-breadcrumb-item>{{ productDetail?.tieuDe }}</a-breadcrumb-item>
      </a-breadcrumb>

      <div class="px-3 md:px-[50px]">
        <!-- begin product info -->
        <div class="md:flex gap-[50px]">
          <a-space
            style="max-width: 600px; max-height: 500px"
            class="product_image md:w-1/2 justify-center md:max-w-[unset] mx-auto"
          >
            <swiper
              :direction="'vertical'"
              :slidesPerView="8"
              :pagination="{
                clickable: true,
              }"
              :autoplay="{
                delay: 2000,
                disableOnInteraction: true,
              }"
              :loop="true"
              :modules="modules"
              class="product_image_slide mx-auto h-[450px] w-[50px]"
              @swiper="onSwiper"
              @slideChange="onSlideChange"
            >
              <swiper-slide
                v-slot="{ isActive }"
                v-for="item in productImages"
                :key="item"
                class="mt-[10px] h-[40px]"
              >
                <div
                  @click="onClickImageBg(item)"
                  :style="
                    isActive
                      ? 'border: 1px solid yellow'
                      : 'border: 1px solid #d9d9d9'
                  "
                >
                  <img class="" alt="example" :src="item" />
                </div>
              </swiper-slide>
            </swiper>
            <img class="w-full max-h-[500px] mx-auto" :src="activeImage" />
          </a-space>

          <div class="product_info md:w-1/2" v-if="productDetail">
            <h1 class="text-2xl">
              {{ productDetail?.tieuDe }}
            </h1>

            <div>
              <div class="mr-3 inline-block">
                Mã SP: {{ productDetail?.maSP }}
              </div>
              <a-rate
                :value="productDetail?.tbDanhGia || 0"
                allow-half
                disabled
              />
              <a-divider type="vertical" class="bg-gray-500" />
              <span>{{ productDetail?.soDanhGia || 0 }} Đánh giá</span>
              <a-divider type="vertical" class="bg-gray-500" />
              <span>{{ productDetail?.daBan || 0 }} Đã bán</span>
            </div>

            <div
              class="product_price flex items-center gap-[20px] bg-gray-100 px-5 py-3 mt-3"
            >
              <template v-if="productDetail?.giaCu && productDetail?.giaCu > 0">
                <span class="font-bold text-xl text-red-500">
                  {{ _formatVnCurrency(productDetail?.giaMoi || 0) }}
                </span>
                <div class="flex items-center gap-[10px] text-[14px]">
                  <del>{{ _formatVnCurrency(productDetail?.giaCu || 0) }}</del>
                  <span class="bg-red-200 text-red-500 p-1"
                    >-{{
                      String(
                        (productDetail?.giaMoi / productDetail?.giaCu) * 100
                      ).slice(0, 2)
                    }}%</span
                  >
                </div>
              </template>
              <span v-else class="font-bold text-xl">
                {{ _formatVnCurrency(productDetail?.giaMoi || 0) }}
              </span>
            </div>

            <fieldset class="vourcher border-dashed mt-3 p-0">
              <legend class="text-base font-semibold">
                Chương trình khuyến mãi
              </legend>
              <ul>
                <template
                  :key="index"
                  v-for="(item, index) in productDetail.vouchers"
                >
                  <li>
                    {{ item.moTa }}
                  </li>
                </template>

                <li>Miễn phí giao hàng cho đơn hàng trên 800k</li>
              </ul>
            </fieldset>

            <a-space direction="vertical" :size="20">
              <a-space class="product_variations mt-5">
                <a-select
                  v-if="
                    productDetail?.loaiBienThe == 'BOTH' ||
                    productDetail?.loaiBienThe == 'COLOR'
                  "
                  v-model:value="selectedVariation1"
                  @change="onThayDoiBienTheMau"
                  class="min-w-[200px]"
                >
                  <a-select-option value="">Chọn màu</a-select-option>
                  <a-select-option
                    :key="index"
                    :value="item.id"
                    v-for="(item, index) in variation1List"
                  >
                    {{ item.giaTri }}
                  </a-select-option>
                </a-select>

                <a-select
                  v-if="
                    productDetail?.loaiBienThe == 'BOTH' ||
                    productDetail?.loaiBienThe == 'SIZE'
                  "
                  v-model:value="selectedVariation2"
                  @change="onThayDoiBienTheSize"
                  class="min-w-[200px]"
                >
                  <a-select-option value="">Chọn size</a-select-option>
                  <a-select-option
                    :key="index"
                    :value="item.id"
                    v-for="(item, index) in variation2List"
                  >
                    {{ item.giaTri }}
                  </a-select-option>
                </a-select>
              </a-space>

              <a-space :size="20">
                <span> Số lượng: </span>
                {{ quantity }} - {{ variationStockCnt }}
                <a-input-number
                  v-model:value="quantity"
                  min="1"
                  :max="variationStockCnt"
                />
                <span v-if="variationStockCnt > 0"
                  >{{ variationStockCnt }} sản phẩm có sẵn</span
                >
                <span v-else>sản phẩm đang hết hàng</span>
              </a-space>
              <a-space>
                <a-button :disabled="variationStockCnt == 0" @click="addToCart"
                  >Thêm giỏ hàng</a-button
                >
                <a-button :disabled="variationStockCnt == 0" @click="buyNow">
                  Mua ngay
                </a-button>
              </a-space>
            </a-space>
          </div>
        </div>
        <!-- end product info -->

        <!-- begin product description -->
        <a-tabs class="mt-5" v-if="productDetail">
          <a-tab-pane key="1" tab="Mô tả sản phẩm">
            <div v-html="productDetail?.moTa" />
          </a-tab-pane>

          <!-- product info additional -->
          <a-tab-pane key="2" tab="Thông tin thêm" force-render>
            <a-descriptions bordered :column="1" class="max-w-[800px]">
              <a-descriptions-item label="Chất liệu">{{
                productDetail.chatLieu
              }}</a-descriptions-item>
              <a-descriptions-item label="Trọng lượng"
                >{{ productDetail.trongLuong }}g</a-descriptions-item
              >
              <a-descriptions-item label="Công nghệ">{{
                productDetail.congNghe
              }}</a-descriptions-item>
              <a-descriptions-item label="Tính năng nổi bật">{{
                productDetail.tinhNang
              }}</a-descriptions-item>
              <a-descriptions-item label="Nơi sản xuất">{{
                productDetail.noiSanXuat
              }}</a-descriptions-item>
            </a-descriptions>
          </a-tab-pane>

          <!-- review -->
          <a-tab-pane key="3" tab="Đánh giá">
            <a-comment v-for="(item, index) in reviewList" :key="index">
              <template #author><a>Người dùng #{{  item?.nguoiTaoId}}</a></template>
              <template #avatar>
                <a-avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              </template>
              <template #content>
                <a-rate :value="item?.soSao || 0" allow-half disabled />
                <p class="m-0">
                 {{ item?.binhLuan }}
                </p>
              </template>
              <template #datetime>
                <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                  <span>{{ dayjs(item?.ngayTao).fromNow() }}</span>
                </a-tooltip>
              </template>
            </a-comment>
          </a-tab-pane>
        </a-tabs>

        <!-- end product description -->

        <section class="mt-[30px]">
          <h3
            class="mb-[20px] w-fit"
            style="
              border-bottom: 3px solid rgba(220, 220, 220, 0.747);
              font-size: 18px;
            "
          >
            Sản phẩm liên quan
          </h3>
          <div
            class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center"
          >
            <a-card
              hoverable
              :bodyStyle="'padding: 10px'"
              style="width: 23%; border: none; box-shadow: none"
              :key="index"
              v-for="(item, index) in relatedProducts"
            >
              <template #cover>
                <div class="relative">
                  <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                    <img :src="item?.anhChinh?.url" class="shadow-sm" />
                  </router-link>

                  <div class="absolute bottom-2 left-[30%] hidden">
                    <button>Xem chi tiết</button>
                  </div>
                </div>
              </template>
              <a-card-meta>
                <template #title>
                  <h3 class="m-0 text-base">
                    <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                      {{ item.tieuDe }}
                    </router-link>
                  </h3>
                </template>
                <template #description>
                  <div class="product_price flex items-center gap-[10px]">
                    <del>{{ item?.giaCu }} vnd</del>
                    <span class="font-bold text-red-500">
                      {{ item?.giaMoi }} vnd
                    </span>
                  </div>

                  <a-space>
                    <a-rate
                      class="text-[14px]"
                      :value="item?.soSaoDanhGia || 0"
                      allow-half
                      disabled
                    />
                    <a-divider type="vertical" class="bg-gray-500" />
                    <span>55 Đã bán</span>
                  </a-space>
                </template>
              </a-card-meta>
            </a-card>
          </div>
        </section>
      </div>
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useCartStore } from "/stores/cart";
import { onMounted, inject } from "vue";
import IProductDetail from "~/types/IProductDetail";
import ProductService from "~/services/ProductService";

const _storeCart = useCartStore();
const _route = useRoute();
const _router = useRouter();
const _formatVnCurrency = function (value: number) {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const productRate = ref<number>(3);

const isGettingProduct = ref<boolean>(true);
const productDetail = ref<IProductDetail>();

const productImages = ref<string[]>([]);
const activeImage = ref<string>("");

const selectedVariation1 = ref<string>("");
const selectedVariation2 = ref<string>("");
const variation1List = ref([]);
const variation2List = ref([]);

const variationStockCnt = ref<number>(0);
const currentProductVariationId = ref<number>();

const quantity = ref<number>(1);

const onThayDoiBienTheMau = (value: string) => {
  console.log("variation 1: ", value);
  currentProductVariationId.value = undefined;
  quantity.value = 1;
  if (!value) {
    variation2List.value = productDetail.value.giaTri2List;
    variationStockCnt.value = productDetail.value.soLuongKho;
    return;
  }

  if (productDetail.value.loaiBienThe == "BOTH") {
    const variationInfo = productDetail.value.giaTri1List.find(
      (item) => item.id == value
    );
    variation2List.value = variationInfo.bienThe2;

    // find stock in this variation
    if (selectedVariation2.value) {
      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri2 == selectedVariation2 && item.giatri1 == value
      );
      console.log("product vatiation: ", productVariation);
      if (productVariation) variationStockCnt.value = productVariation.soLuong;
    }
    // end find stock in this variation
  } else if (productDetail.value.loaiBienThe == "COLOR") {
    const productVariation = productDetail.value.bienTheDTOS.find(
      (item) => item.giatri1 == value
    );
    console.log("product vatiation: ", productVariation);
    if (productVariation) variationStockCnt.value = productVariation.soLuong;
  }
};
const onThayDoiBienTheSize = (value: string) => {
  console.log("variation 2: ", value);
  currentProductVariationId.value = undefined;
  quantity.value = 1;
  if (!value) {
    variation1List.value = productDetail.value.giaTri1List;
    variationStockCnt.value = productDetail.value.soLuongKho;
    return;
  }
  if (productDetail.value.loaiBienThe == "BOTH") {
    const variationInfo = productDetail.value.giaTri2List.find(
      (item) => item.id == value
    );

    variation1List.value = variationInfo.bienThe2;

    // find stock in this variation
    if (selectedVariation1.value) {
      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) =>
          item.giatri1 == selectedVariation1.value && item.giatri2 == value
      );
      console.log("product vatiation: ", productVariation);
      if (productVariation) variationStockCnt.value = productVariation.soLuong;
    }
    // end find stock in this variation
  } else if (productDetail.value.loaiBienThe == "SIZE") {
    const productVariation = productDetail.value.bienTheDTOS.find(
      (item) => item.giatri2 == value
    );
    console.log("product vatiation: ", productVariation);
    if (productVariation) variationStockCnt.value = productVariation.soLuong;
  }
};

const addToCart = (product, qty) => {
  if (variationStockCnt.value == 0) {
    notification.warning({
      message: "Sản phẩm hiện tại đang hết!",
    });
    return;
  }
  product.quantity = qty || 1;

  if (!productDetail.value) return;

  if (productDetail.value.loaiBienThe == "BOTH") {
    console.log("add cart - both");
    if (!selectedVariation1.value || !selectedVariation2.value) {
      notification.warning({
        message: "Vui lòng chọn phân loại sản phẩm!",
      });
      return;
    }
    const productVariation = productDetail.value.bienTheDTOS.find(
      (item) =>
        item.giatri1 == Number(selectedVariation1.value) &&
        item.giatri2 == Number(selectedVariation2.value)
    );

    if (productVariation) {
      console.log("add variation: ", productVariation);
      const cartItemCheck = _storeCart.cart.find(
        (item: any) => item.id == productVariation.id
      );
      let isTurnOffShowRs = false;
      if (cartItemCheck) {
        if (
          cartItemCheck.qty == productVariation.soLuong ||
          cartItemCheck.qty + quantity.value > productVariation.soLuong
        ) {
          isTurnOffShowRs = true;
          notification.warning({
            message: "Sản phẩm trong giỏ hàng đã đạt tối đa!",
          });
        }
        if (
          cartItemCheck.qty < productVariation.soLuong &&
          cartItemCheck.qty + quantity.value > productVariation.soLuong
        ) {
          quantity.value = productVariation.soLuong - cartItemCheck.qty;
        }
      }

      _storeCart.addToCart({
        id: productVariation.id,
        qty: quantity.value,
        anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
        productId: productDetail?.value?.id,
        productName: productDetail?.value?.tieuDe,
        price: productDetail?.value?.giaMoi,
        variation: `Màu: ${productVariation.giaTriObj1.giaTri}, Size: ${productVariation.giaTriObj2.giaTri}`,
        stockCnt: productVariation.soLuong,
        isTurnOffShowRs: isTurnOffShowRs,
      });
    }
  } else {
    if (productDetail.value.loaiBienThe == "COLOR") {
      console.log("add cart - color");
      // for color
      if (!selectedVariation1.value) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }

      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri1 == Number(selectedVariation1.value)
      );
      if (productVariation) {
        const cartItemCheck = _storeCart.cart.find(
          (item: any) => item.id == productVariation.id
        );
        console.log(
          "add variation: ",
          productVariation,
          cartItemCheck,
          quantity.value
        );
        let isTurnOffShowRs = false;
        if (cartItemCheck) {
          if (
            cartItemCheck.qty == productVariation.soLuong ||
            cartItemCheck.qty + quantity.value > productVariation.soLuong
          ) {
            isTurnOffShowRs = true;
            notification.warning({
              message: "Sản phẩm trong giỏ hàng đã đạt tối đa!",
            });
          }
          if (
            cartItemCheck.qty < productVariation.soLuong &&
            cartItemCheck.qty + quantity.value > productVariation.soLuong
          ) {
            quantity.value = productVariation.soLuong - cartItemCheck.qty;
          }
        }
        _storeCart.addToCart({
          id: productVariation.id,
          qty: quantity.value,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Màu: ${productVariation.giaTriObj1.giaTri}`,
          stockCnt: productVariation.soLuong,
          isTurnOffShowRs: isTurnOffShowRs,
        });
      }
    } else {
      console.log("add cart - size");
      // for size
      if (!selectedVariation2.value) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }
      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri2 == Number(selectedVariation2.value)
      );
      console.log("variation: ", productVariation);
      if (productVariation) {
        const cartItemCheck = _storeCart.cart.find(
          (item: any) => item.id == productVariation.id
        );

        let isTurnOffShowRs = false;
        if (cartItemCheck) {
          if (
            cartItemCheck.qty == productVariation.soLuong ||
            cartItemCheck.qty + quantity.value > productVariation.soLuong
          ) {
            isTurnOffShowRs = true;
            notification.warning({
              message: "Sản phẩm trong giỏ hàng đã đạt tối đa!",
            });
          }
          if (
            cartItemCheck.qty < productVariation.soLuong &&
            cartItemCheck.qty + quantity.value > productVariation.soLuong
          ) {
            quantity.value = productVariation.soLuong - cartItemCheck.qty;
          }
        }
        console.log("add variation: ", productVariation);

        _storeCart.addToCart({
          id: productVariation.id,
          qty: quantity.value,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Size: ${productVariation.giaTriObj2.giaTri}`,
          stockCnt: productVariation.soLuong,
          isTurnOffShowRs: isTurnOffShowRs,
        });
      }
    }
  }
};

const buyNow = () => {
  if (productDetail.value.loaiBienThe == "BOTH") {
    console.log("add cart - both");
    if (!selectedVariation1.value || !selectedVariation2.value) {
      notification.warning({
        message: "Vui lòng chọn phân loại sản phẩm!",
      });
      return;
    }
    const productVariation = productDetail.value.bienTheDTOS.find(
      (item) =>
        item.giatri1 == Number(selectedVariation1.value) &&
        item.giatri2 == Number(selectedVariation2.value)
    );

    if (productVariation) {
      _storeCart.fSetBuyNow({
        id: productVariation.id,
        qty: quantity.value,
        anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
        productId: productDetail?.value?.id,
        productName: productDetail?.value?.tieuDe,
        price: productDetail?.value?.giaMoi,
        variation: `Màu: ${productVariation.giaTriObj1.giaTri}, Size: ${productVariation.giaTriObj2.giaTri}`,
        stockCnt: productVariation.soLuong,
      });
      _router.push("/dat-hang?type=NOW&id=" + productVariation.id);
      console.log("buy now variation: ", productVariation);
    }
  } else {
    if (productDetail.value.loaiBienThe == "COLOR") {
      console.log("add cart - color");
      // for color
      if (!selectedVariation1.value) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }

      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri1 == Number(selectedVariation1.value)
      );
      if (productVariation) {
        _storeCart.fSetBuyNow({
          id: productVariation.id,
          qty: quantity.value,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Màu: ${productVariation.giaTriObj1.giaTri}`,
          stockCnt: productVariation.soLuong,
        });
        _router.push("/dat-hang?type=NOW&id=" + productVariation.id);
        console.log("buy now variation: ", productVariation);
      }
    } else {
      console.log("add cart - size");
      // for size
      if (!selectedVariation2.value) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }
      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri2 == Number(selectedVariation2.value)
      );
      console.log("variation: ", productVariation);
      if (productVariation) {
        _storeCart.fSetBuyNow({
          id: productVariation.id,
          qty: quantity.value,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Size: ${productVariation.giaTriObj2.giaTri}`,
          stockCnt: productVariation.soLuong,
        });
        _router.push("/dat-hang?type=NOW&id=" + productVariation.id);
        console.log("buy now variation: ", productVariation);
      }
    }
  }
};

const onClickImageBg = (src: string) => {
  if (typeof src == "object") {
    console.log("click image: ", src[0]);
    activeImage.value = src[0];
  } else activeImage.value = src;
};
const relatedProducts = ref([]);

const reviewList = ref([]);

onMounted(() => {
  ProductService.chiTietSp(Number(_route.params.id))
    .then((res) => {
      console.log("result:  ", res);

      const pImgs = [];
      pImgs.push(res.anhChinh.url);
      pImgs.push(res.anhPhu.map((item) => item.url));
      res.bienTheDTOS.forEach((item) => {
        if (item.anh) pImgs.push(item.anh.url);
      });

      productDetail.value = res;
      variation1List.value = res.giaTri1List;
      variation2List.value = res.giaTri2List;
      variationStockCnt.value = res.tongSp;
      activeImage.value = res.anhChinh.url;
      productImages.value = pImgs;

      ProductService.locSp(
        {
          dmGiay: res?.dmGiay?.id,
        },
        0,
        4
      ).then((res) => {
        console.log("related products: ", res);
        relatedProducts.value = res.content;
      });
    })
    .catch((err) => {
      console.log("fetch product error", err);
    })
    .finally(() => (isGettingProduct.value = false));
  ProductService.getReviewForProduct(Number(_route.params.id)).then((res) => {
    console.log("revierw data", res);
    reviewList.value = res as any;
  });
});
</script>
