<template>
  <div>
    <section class="w-full h-[500px]">
      <Swiper class="h-full" :modules="[SwiperAutoplay, SwiperEffectCreative]" :slides-per-view="1" :loop="true"
        :effect="'creative'" :autoplay="{
          delay: 8000,
          disableOnInteraction: true,
        }" :creative-effect="{
  prev: {
    shadow: false,
    translate: ['-20%', 0, -1],
  },
  next: {
    translate: ['100%', 0, 0],
  },
}">
        <SwiperSlide>
          <img src="https://cf.shopee.vn/file/vn-50009109-c01ffe7818db36dd90e0c8ed0ec2baa1_xxhdpi" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://cf.shopee.vn/file/vn-50009109-ed9104cb971e205afcdd0bf1cf5479c1_xxhdpi" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="https://cf.shopee.vn/file/vn-50009109-83dd5db23e7386abacc6be4165b2cf2e_xxhdpi" />
        </SwiperSlide>
      </Swiper>
    </section>

    <section class="mt-[30px] w-full hidden">
      <h3 class="text-center text-[24px]">SẢN PHẨM ĐANG BÁN CHẠY</h3>

      <div class="flex gap-[30px] px-[30px] w-full">

        <a-card hoverable :bodyStyle="'padding: 10px'" style="width: 25%; border: none; box-shadow: none;" :key="i"
          v-for="i in 4">
          <template #cover>
            <div class="relative">
              <router-link to="/san-pham/">
                <img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
              </router-link>

              <div class="absolute bottom-2 left-[30%] hidden">
                <button>
                  Xem chi tiết
                </button>
              </div>
            </div>

          </template>
          <a-card-meta>
            <template #title>
              <h3 class="m-0 text-base">
                <router-link to="/san-pham/">
                  Nike Court Vision Low Next Natur
                </router-link>
              </h3>

            </template>
            <template #description>

              <div class="product_price flex items-center gap-[10px]">
                <del>{{ 120 }} vnd</del>
                <span class="font-bold text-red-500">
                  {{ 100 }} vnd
                </span>
              </div>

              <a-space>
                <a-rate class="text-[14px]" :value="3" allow-half disabled />
                <a-divider type="vertical" class="bg-gray-500" />
                <span>55 Đã bán</span>
              </a-space>
            </template>
          </a-card-meta>
        </a-card>


      </div>
      <div class="flex justify-center mt-[20px]">
        <a-button class="bg-black text-white">
          <router-link to="/dat-hang"> Xem thêm </router-link>
        </a-button>
      </div>
    </section>

    <section class="mt-[30px] w-full">
      <div class="flex gap-[20px] justify-center mb-[15px] tabar_product">
        <h4 @click="onChangeActiveProductTab(1)"
          :class="'text-[18px] pb-2 cursor-pointer hover:text-orange-500 duration-150 ease-in-out uppercase' + (currentActiveProductTab == 1 ? ' activated text-orange-500' : '')">
          Sản phẩm bán chạy</h4>
        <h4 @click="onChangeActiveProductTab(2)"
          :class="'text-[18px] pb-2 cursor-pointer hover:text-orange-500 duration-150 ease-in-out uppercase' + (currentActiveProductTab == 2 ? ' activated text-orange-500' : '')">
          Sản phẩm mới cập nhật</h4>
      </div>

      {{ productList[0] }}


      <a-spin :spinning="isLoadingProduct">
        <div class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center">
          <a-card hoverable :bodyStyle="'padding: 10px'" style="width: 23%; border: none; box-shadow: none;" :key="index"
            v-for="(item, index) in productList">
            <template #cover>
              <div class="relative">
                <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                  <img :src="item?.anhChinh?.url" class="shadow-sm" />
                </router-link>

                <div class="absolute bottom-2 left-[30%] hidden">
                  <button>
                    Xem chi tiết
                  </button>
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
                  <a-rate class="text-[14px]" :value="item?.soSaoDanhGia || 0" allow-half disabled />
                  <a-divider type="vertical" class="bg-gray-500" />
                  <span>55 Đã bán</span>
                </a-space>
              </template>
            </a-card-meta>
          </a-card>
        </div>
      </a-spin>

      <div class="flex justify-center mt-[20px]">
        <a-button class="bg-black text-white">
          <router-link to="/dat-hang"> Xem thêm </router-link>
        </a-button>
      </div>
    </section>

  </div>
</template>

<script lang="ts" setup>
import ProductService from '~/services/ProductService';



const currentActiveProductTab = ref<number>(1);
const isLoadingProduct = ref<boolean>(false);
const onChangeActiveProductTab = (val: number) => currentActiveProductTab.value = val;
const productList = ref([]);


onMounted(() => {
  if (isLoadingProduct.value) return;
  isLoadingProduct.value = true;
  ProductService.locSp({
    page: 0, size: 8
  })
    .then((res: any) => {
      console.log("filter product: ", res.content);
      productList.value = res.content;
    })
    .catch(err => {
      notification.error({
        message: "Không thể lấy dữ liệu sản phẩm!"
      });
      console.log("filter product failed: ", err);
    })
    .finally(() => isLoadingProduct.value = false);
});
</script>

<style>
.tabar_product h4.activated {
  border-bottom: 2px solid orange;
}
</style>