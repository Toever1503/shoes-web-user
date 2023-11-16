<template>
  <div>
    <section class="w-full h-[500px]">
      <Swiper
        class="h-full"
        :modules="[SwiperAutoplay, SwiperEffectCreative]"
        :slides-per-view="1"
        :loop="true"
        :effect="'creative'"
        :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }"
        :creative-effect="{
          prev: {
            shadow: false,
            translate: ['-20%', 0, -1],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }"
      >
        <SwiperSlide>
          <img
            src="https://cf.shopee.vn/file/vn-50009109-c01ffe7818db36dd90e0c8ed0ec2baa1_xxhdpi"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://cf.shopee.vn/file/vn-50009109-ed9104cb971e205afcdd0bf1cf5479c1_xxhdpi"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://cf.shopee.vn/file/vn-50009109-83dd5db23e7386abacc6be4165b2cf2e_xxhdpi"
          />
        </SwiperSlide>
      </Swiper>
    </section>

    <section class="mt-[30px] w-full">
      <div class="flex gap-[20px] justify-center mb-[15px] tabar_product">
        <h4
          @click="onChangeActiveProductTab(1)"
          :class="
            'text-[18px] pb-2 cursor-pointer hover:text-orange-500 duration-150 ease-in-out uppercase' +
            (currentActiveProductTab == 1 ? ' activated text-orange-500' : '')
          "
        >
          Sản phẩm bán chạy
        </h4>
        <h4
          @click="onChangeActiveProductTab(2)"
          :class="
            'text-[18px] pb-2 cursor-pointer hover:text-orange-500 duration-150 ease-in-out uppercase' +
            (currentActiveProductTab == 2 ? ' activated text-orange-500' : '')
          "
        >
          Sản phẩm mới cập nhật
        </h4>
      </div>

      <a-spin :spinning="isLoadingProduct">
        <div class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center">
          <div
            class="p-[10px]"
            style="width: 23%; border: none; box-shadow: none"
            :key="index"
            v-for="(item, index) in productList"
          >
            <div class="relative">
              <router-link class="block h-[450px]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                <img
                  :src="item?.anhChinh?.url"
                  class="shadow-sm h-full rounded-[5px]"
                />
              </router-link>

              <div class="absolute bottom-2 left-[30%] hidden">
                <button>Xem chi tiết</button>
              </div>
            </div>

            <a-space direction="vertical" :size="10" class="mt-[10px]">
              <h3 class="m-0 text-base">
                <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                  {{ item.tieuDe }}
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
                <a-rate
                  class="text-[14px]"
                  :value="item?.tbDanhGia || 0"
                  allow-half
                  disabled
                />
                <a-divider type="vertical" class="bg-gray-500" />
                <span>{{item?.daBan}} Đã bán</span>
              </a-space>
            </a-space>
          </div>
        </div>
      </a-spin>

      <div class="flex justify-center my-[20px]">
        <a-button class="bg-black text-white">
          <router-link to="/dat-hang"> Xem thêm </router-link>
        </a-button>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ProductService from "~/services/ProductService";

const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);

const currentActiveProductTab = ref<number>(1);
const isLoadingProduct = ref<boolean>(false);
const onChangeActiveProductTab = (val: number) =>
  (currentActiveProductTab.value = val);
const productList = ref([]);

onMounted(() => {
  if (isLoadingProduct.value) return;
  isLoadingProduct.value = true;
  ProductService.locSp({
    page: 0,
    size: 8,
  })
    .then((res: any) => {
      console.log("filter product: ", res.content);
      productList.value = res.content;
    })
    .catch((err) => {
      notification.error({
        message: "Không thể lấy dữ liệu sản phẩm!",
      });
      console.log("filter product failed: ", err);
    })
    .finally(() => (isLoadingProduct.value = false));
});
</script>

<style>
.tabar_product h4.activated {
  border-bottom: 2px solid orange;
}
</style>
