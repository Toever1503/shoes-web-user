<template>
  <a-spin :spinning="isGettingProduct" size="large">
    <div class="px-3 md:px-[50px]">
      <a-breadcrumb class="bg-gray-50 p-2">
        <a-breadcrumb-item>
          <router-link to="/">Trang chủ</router-link>
        </a-breadcrumb-item>
        <a-breadcrumb-item>Sản phẩm</a-breadcrumb-item>
        <a-breadcrumb-item>{{ productDetail?.tieuDe }}</a-breadcrumb-item>
      </a-breadcrumb>

      <!-- begin product info -->
      <div class="md:flex gap-[50px]">
        <a-space
          class="product_image md:w-1/2 max-w-[350px] md:max-w-[unset] mx-auto"
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
          <img :src="activeImage" />
        </a-space>

        <div class="product_info md:w-1/2">
          <h1 class="text-2xl">
            {{ productDetail?.tieuDe }}
          </h1>

          <div>
            <div class="mr-3 inline-block">
              Mã SP: {{ productDetail?.maSP }}
            </div>
            <a-rate v-model:value="productRate" allow-half disabled /> (55 lượt
            đánh giá)
            <a-divider type="vertical" class="bg-gray-500" />
            <span>55 Đánh giá</span>
            <a-divider type="vertical" class="bg-gray-500" />
            <span>55 Đã bán</span>
          </div>

          <div
            class="product_price flex items-center gap-[20px] bg-gray-100 px-5 py-3 mt-3"
          >
            <span class="font-bold text-xl text-red-500">
              {{ productDetail?.giaMoi }} vnd
            </span>
            <div class="flex items-center gap-[10px] text-[14px]">
              <del>{{ productDetail?.giaCu }} vnd</del>
              <span class="bg-red-200 text-red-500 p-1"
                >-{{
                  (productDetail?.giaMoi / productDetail?.giaCu) * 100
                }}%</span
              >
            </div>
          </div>

          <fieldset class="vourcher border-dashed mt-3 p-0">
            <legend class="text-base font-semibold">
              Chương trình khuyến mãi
            </legend>
            <ul>
              <li>Nha ma 29 giam 20k</li>
              <li>Nha ma 29 giam 20k</li>
              <li>Nha ma 29 giam 20k</li>
              <li>Nha ma 29 giam 20k</li>
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
            <a-button :disabled="variationStockCnt == 0" @click="addToCart"
              >Thêm giỏ hàng</a-button
            >
          </a-space>
        </div>
      </div>
      <!-- end product info -->

      <!-- begin product description -->
      <a-tabs class="mt-5">
        <a-tab-pane key="1" tab="Mô tả sản phẩm">
          <div v-html="productDetail?.moTa" />
        </a-tab-pane>

        <!-- product info additional -->
        <a-tab-pane key="2" tab="Thông tin thêm" force-render>
          <a-descriptions bordered :column="1">
            <a-descriptions-item label="Product"
              >Cloud Database</a-descriptions-item
            >
            <a-descriptions-item label="Billing">Prepaid</a-descriptions-item>
            <a-descriptions-item label="Time">18:00:00</a-descriptions-item>
            <a-descriptions-item label="Amount">$80.00</a-descriptions-item>
            <a-descriptions-item label="Discount">$20.00</a-descriptions-item>
            <a-descriptions-item label="Official">$60.00</a-descriptions-item>
          </a-descriptions>
        </a-tab-pane>

        <!-- review -->
        <a-tab-pane key="3" tab="Đánh giá">
          <a-comment>
            <template #author><a>Han Solo</a></template>
            <template #avatar>
              <a-avatar
                src="https://joeschmoe.io/api/v1/random"
                alt="Han Solo"
              />
            </template>
            <template #content>
              <a-rate v-model:value="productRate" allow-half disabled />
              <p class="m-0">
                We supply a series of design principles, practical patterns and
                high quality design resources (Sketch and Axure), to help people
                create their product prototypes beautifully and efficiently.
              </p>
            </template>
            <template #datetime>
              <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                <span>{{ dayjs().fromNow() }}</span>
              </a-tooltip>
            </template>
          </a-comment>
        </a-tab-pane>
      </a-tabs>

      <!-- end product description -->
    </div>
  </a-spin>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { useCartStore } from "/stores/cart";

const _storeCart = useCartStore();

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

const quantity = ref<number>(1);

const onThayDoiBienTheMau = (value: string) => {
  console.log("variation 1: ", value);

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
  console.log("add cart: ", quantity);

  if (productDetail.value.loaiBienThe == "BOTH") {
    if (!selectedVariation1.value || !selectedVariation2.value) {
      notification.warning({
        message: "Vui lòng chọn phân loại sản phẩm!",
      });
      return;
    }
    const productVariation = productDetail.value.bienTheDTOS.find(
      (item) =>
        item.giatri1 == selectedVariation1.value &&
        item.giatri2 == selectedVariation2.value
    );

    if (productVariation) {
      console.log("add variation: ", productVariation);
      _storeCart.addToCart({
        id: productVariation.id,
        qty: quantity,
        anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
        productId: productDetail?.value?.id,
        productName: productDetail?.value?.tieuDe,
        price: productDetail?.value?.giaMoi,
        variation: `Màu: ${productVariation.giaTriObj1.giaTri}, Size: ${productVariation.giaTriObj2.giaTri}`,
      });
    }
  } else {
    if (productDetail.value.loaiBienThe == "COLOR") {
      // for color
      if (!variationVal1) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }

      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri1 == selectedVariation1
      );
      if (productVariation) {
        console.log("add variation: ", productVariation);
        _storeCart.addToCart({
          id: productVariation.id,
          qty: quantity,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Màu: ${productVariation.giaTriObj1.giaTri}`,
        });
      }
    } else {
      // for size
      if (!variationVal2.value) {
        notification.warning({
          message: "Vui lòng chọn phân loại sản phẩm!",
        });
        return;
      }
      const productVariation = productDetail.value.bienTheDTOS.find(
        (item) => item.giatri2 == selectedVariation2
      );
      if (productVariation) {
        console.log("add variation: ", productVariation);

        _storeCart.addToCart({
          id: productVariation.id,
          qty: quantity,
          anh: productVariation?.anh?.url || productVariation?.anhSpChinh?.url,
          productId: productDetail?.value?.id,
          productName: productDetail?.value?.tieuDe,
          price: productDetail?.value?.giaMoi,
          variation: `Size: ${productVariation.giaTriObj2.giaTri}`,
        });
      }
    }
  }
};

onMounted(() => {
  fetch("http://localhost:8082/v1/san-pham/public/1")
    .then((res) => res.json())
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
      variationStockCnt.value = res.soLuongKho;
      activeImage.value = res.anhChinh.url;
      productImages.value = pImgs;
    })
    .catch((err) => {
      console.log("fetch product error", err);
    })
    .finally(() => (isGettingProduct.value = false));
});
</script>
