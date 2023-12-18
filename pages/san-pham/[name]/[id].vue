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
          <a-space style="max-width: 600px; max-height: 500px"
            class="product_image md:w-1/2 justify-center md:max-w-[unset] mx-auto">
            <swiper @swiper="onSwiper" :modules="modules" :direction="'vertical'" :slidesPerView="8" :loop="true"
              :autoplay="true" class="product_image_slide mx-auto h-[450px] w-[50px]" @onSlideChange="onSlideChange"
              @realIndexChange="realIndexChange">
              <swiper-slide v-slot="{ isActive }" v-for="(item, index) in productImages" :key="item"
                class="mt-[10px] h-[40px]">
                <div @click="onClickImageBg(item, index)" :style="false
                  ? 'border: 1px solid yellow'
                  : 'border: 1px solid #d9d9d9'
                  ">
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
              <a-rate :value="productDetail?.tbDanhGia || 0" allow-half disabled />
              <a-divider type="vertical" class="bg-gray-500" />
              <span>{{ productDetail?.soDanhGia || 0 }} Đánh giá</span>
              <a-divider type="vertical" class="bg-gray-500" />
              <span>{{ productDetail?.daBan || 0 }} Đã bán</span>
            </div>

            <div class="product_price flex items-center gap-[20px] bg-gray-100 px-5 py-3 mt-3">
              <template v-if="productDetail?.giaCu && productDetail?.giaCu > 0">
                <span class="font-bold text-xl text-red-500">
                  {{ _formatVnCurrency(productDetail?.giaMoi || 0) }}
                </span>
                <div class="flex items-center gap-[10px] text-[14px]">
                  <del>{{ _formatVnCurrency(productDetail?.giaCu || 0) }}</del>
                  <span class="bg-red-200 text-red-500 p-1">-{{
                    Math.floor(
                      Number(((productDetail?.giaCu - productDetail?.giaMoi) / productDetail?.giaCu) * 100)
                    )
                  }}%</span>
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
                <template :key="index" v-for="(item, index) in productDetail.vouchers">
                  <li class="capitalize">
                    Nhập mã: <span class="font-[600] text-red-500">{{item.maGiamGia}}</span>
                    {{ item.moTa }}
                  </li>
                </template>

                <li>Miễn phí giao hàng cho đơn hàng trên 800k</li>
              </ul>
            </fieldset>

            <a-space direction="vertical" :size="20">
              <a-space class="product_variations mt-5">
                <a-select v-if="productDetail?.loaiBienThe == 'BOTH' ||
                  productDetail?.loaiBienThe == 'COLOR'
                  " v-model:value="selectedVariation1" @change="onThayDoiBienTheMau" class="min-w-[200px]">
                  <a-select-option value="">Chọn màu</a-select-option>
                  <a-select-option :key="index" :value="item.id" v-for="(item, index) in variation1List">
                    {{ item.giaTri }}
                  </a-select-option>
                </a-select>

                <a-select v-if="productDetail?.loaiBienThe == 'BOTH' ||
                  productDetail?.loaiBienThe == 'SIZE'
                  " v-model:value="selectedVariation2" @change="onThayDoiBienTheSize" class="min-w-[200px]">
                  <a-select-option value="">Chọn size</a-select-option>
                  <a-select-option :key="index" :value="item.id" v-for="(item, index) in variation2List">
                    {{ item.giaTri }}
                  </a-select-option>
                </a-select>
              </a-space>

              <span class="cursor-pointer hover:text-blue-400" @click="showSizeGuide">
                ⍟ Hướng dẫn chọn size
               <a-modal :open="isShowSizeGuide" :footer="null" @cancel="hideSizeGuide" style="top: 0 !important;">
                <div class="w-full flex justify-center py-[50px] h-full">
                  <a-image :preview="false" src="/image/size-guide.jpg" />
                </div>
               </a-modal>
               
              </span>

              <a-space :size="20">
                <span> Số lượng: </span>
                <a-input-number v-model:value="quantity" min="1" :max="variationStockCnt" />
                <span v-if="variationStockCnt > 0">{{ variationStockCnt }} sản phẩm có sẵn</span>
                <span v-else>sản phẩm đang hết hàng</span>
              </a-space>
              <a-space>
                <a-button :disabled="variationStockCnt == 0" @click="addToCart">Thêm giỏ hàng</a-button>
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
          <a-tab-pane key="1">
            <template #tab>
              <h3 class="font-[600] m-0">Mô tả sản phẩm</h3>
            </template>
            <div v-html="productDetail?.moTa" />
          </a-tab-pane>

          <!-- product info additional -->
          <a-tab-pane key="2" force-render>
            <template #tab>
              <h3 class="font-[600] m-0">Thông tin thêm</h3>
            </template>
            <a-descriptions bordered :column="1" class="max-w-[800px]">
              <a-descriptions-item label="Chất liệu">{{
                productDetail.chatLieu
              }}</a-descriptions-item>
              <a-descriptions-item label="Trọng lượng">{{ productDetail.trongLuong }}g</a-descriptions-item>
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
          <a-tab-pane key="3">
            <template #tab>
              <h3 class="font-[600] m-0">Đánh giá</h3>
            </template>
            <a-spin :spinning="reviewPagination.loading">
              <a-comment v-for="(item, index) in reviewList" :key="index">
                <template #author><a>{{ item?.nguoiTao?.name }}</a></template>
                <template #avatar>
                  <a-avatar :src="item?.nguoiTao?.anh" alt="Han Solo" />
                </template>
                <template #content>
                  <a-rate :value="item?.soSao || 0" allow-half disabled />
                  <p class="m-0" v-if="item?.isHide">
                    {{item?.binhLuan?.replace(/./g, '*')}}
                  </p>
                  <p class="m-0" v-else>
                    item?.binhLuan
                  </p>
                </template>
                <template #datetime>
                  <a-tooltip :title="dayjs().format('YYYY-MM-DD HH:mm:ss')">
                    <span>{{ dayjs(item?.ngayTao).fromNow() }}</span>
                  </a-tooltip>
                </template>
              </a-comment>
            </a-spin>

            <div class="flex justify-center">
              <a-pagination v-model:current="reviewPagination.current" :showSizeChanger="false"
                :total="reviewPagination.total" @change="reviewPagination.onChange" />
            </div>
          </a-tab-pane>
        </a-tabs>

        <!-- end product description -->

        <section class="my-[30px] ">
          <h3 class="mb-[20px] w-fit" style="
                              border-bottom: 2px solid black;
                              font-size: 18px;
                            ">
            Sản phẩm liên quan
          </h3>
          <div class="flex flex-wrap gap-[20px] w-full">
            <div style="width: 23%; border: none; box-shadow: none" :key="index" v-for="(item, index) in relatedProducts">
              <div class="relative">
                <router-link class="block h-[300px]" :to="`/san-pham/${item?.slug}/${item?.id}`">
                  <img :src="item?.anhChinh?.url"
                    class="shadow-sm h-full rounded-[5px] hover:scale-[1.05] duration-200 easy-in-out" />
                </router-link>

                <div class="absolute top-2 left-2" v-if="item?.tongSp > 0">
                  <div class="font-[600] bordered p-1 w-fit rounded-[4px] mx-auto text-[12px] bg-red-500 text-white">
                    Đã bán hết
                  </div>
                </div>
                
                <div class="absolute top-[10px] right-[10px]" v-if="item?.giaCu && item?.giaCu > 0 && item?.giaCu > item?.giaMoi">
                  <span class="bg-red-200 text-red-500 p-1">-{{
                    Math.floor(Number(
                      ((item?.giaCu - item?.giaMoi) / item?.giaCu) * 100
                    ))
                  }}%</span>
                </div>
              </div>

              <a-space direction="vertical" :size="10" class="mt-[10px]">
                <h3 class="m-0 text-base">
                  <router-link class="font-[600]" :to="`/san-pham/${item?.slug}/${item?.id}`">
                    {{ item.tieuDe.slice(0, 50) }}
                  </router-link>
                </h3>

                <div class="product_price flex items-center gap-[10px]">
                  <template v-if="item?.giaCu && item?.giaCu > 0">
                    <del>{{ _formatVnCurrency(item?.giaCu) }}</del>
                    <span class="font-bold text-red-500">
                      {{ _formatVnCurrency(item?.giaMoi) }}
                    </span>
                  </template>

                  <span v-else class="font-bold text-red-500">
                    {{ _formatVnCurrency(item?.giaMoi) }}
                  </span>
                  
                </div>

                <a-space>
                  <a-rate class="text-[14px]" :value="item?.tbDanhGia || 0" allow-half disabled />
                  <a-divider type="vertical" class="bg-gray-500" />
                  <span>{{ item?.daBan || 0}} Đã bán</span>
                </a-space>
              </a-space>
            </div>
            
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
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Scrollbar, Controller } from 'swiper/modules';


const _storeCart = useCartStore();
const _route = useRoute();
const _router = useRouter();
const _formatVnCurrency = function (value: number) {
  return Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const isGettingProduct = ref<boolean>(true);
const productDetail = ref<IProductDetail>();


const swiperInstance = ref();
const modules = [Autoplay, Scrollbar, Controller];
const productImages = ref<string[]>([]);
const activeImage = ref<string>("");
const activeImageIndex = ref<number>(0);
const onSwiper = (swiper) => {
  console.log("on swiper", swiper)
  swiperInstance.value = swiper;
}

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

const addToCart = () => {
  if (variationStockCnt.value == 0) {
    notification.warning({
      message: "Sản phẩm hiện tại đang hết!",
    });
    return;
  }

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

const onClickImageBg = (src: string, index: number) => {
  if (typeof src == "object") {
    console.log("click image: ", src[0]);
    activeImage.value = src[0];
  } else activeImage.value = src;
};
const relatedProducts = ref([]);

const reviewList = ref([]);
const reviewPagination = reactive({
  loading: false,
  current: 1,
  pageSize: 10,
  total: 10,
  onChange: (current: number) => {
    reviewPagination.current = current;
    onCallApiGetReview()
  }
})
const onCallApiGetReview = () => {
  if (reviewPagination.loading) return;
  reviewPagination.loading = true;
  ProductService.getReviewForProduct(Number(_route.params.id), reviewPagination.current - 1, reviewPagination.pageSize)
    .then((res: any) => {
      console.log("revierw data", res);
      reviewList.value = res.content;
      reviewPagination.total = res.totalElements;
    })
    .finally(() => reviewPagination.loading = false);
}
const onSlideChange = (e: any) => {
  console.log("slide changed", e.activeIndex);
  activeImageIndex.value = e.activeIndex as number;
  activeImage.value = productImages.value[swiperInstance.value.activeIndex]
}
const realIndexChange = (e) => {
  console.log("realIndexChange changed", e.activeIndex);
}

const isShowSizeGuide = ref<boolean>(false);
const showSizeGuide = () => (isShowSizeGuide.value = true);
const hideSizeGuide = () => (isShowSizeGuide.value = false);
onMounted(() => {
  productImages.value = [];
  ProductService.chiTietSp(Number(_route.params.id))
    .then((res) => {
      console.log("result:  ", productImages.value.length);

      const pImgs = [];
      pImgs.push(res.anhChinh.url);
      res.anhPhu.forEach(item => {
        pImgs.push(item.url);
      })
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

  onCallApiGetReview()
});
</script>
