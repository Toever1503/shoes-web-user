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
          <img src="/image/banner/banner2.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/image/banner/banner1.jpg" />
        </SwiperSlide>

        <SwiperSlide>
          <img src="/image/banner/banner.jpg" />
        </SwiperSlide>
      </Swiper>
    </section>

    <!-- sale products -->
    <section class="mt-[30px] w-full">
      <div class="flex gap-[20px] justify-center mb-[15px] tabar_product">
        <h4 :class="'text-[18px] pb-2 duration-150 ease-in-out uppercase'">
          Sản phẩm bán chạy
        </h4>
      </div>

      <a-spin :spinning="saleProductList.length == 0">
        <div class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center">
          <div style="width: 23%; border: none; box-shadow: none" :key="index" v-for="(item, index) in saleProductList">
            <div class="relative">
              <router-link class="block h-[450px]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                <img :src="item?.anhChinh?.url"
                  class="shadow-sm h-full rounded-[5px] hover:scale-[1.05] duration-200 easy-in-out" />
              </router-link>

              <div class="absolute bottom-2 left-[30%] hidden">
                <button>Xem chi tiết</button>
              </div>

            </div>

            <a-space direction="vertical" :size="10" class="mt-[10px]">
              <h3 class="m-0 text-base">
                <router-link class="font-[600]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
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
                <div v-if="item?.giaCu && item?.giaCu > 0 && item?.giaCu > item?.giaMoi">
                  <span class="bg-red-200 text-red-500 p-1">-{{
                    String(
                      ((item?.giaCu - item?.giaMoi) / item?.giaCu) * 100
                    ).slice(0, 2)
                  }}%</span>
                </div>
              </div>

              <a-space>
                <a-rate class="text-[14px]" :value="item?.tbDanhGia || 0" allow-half disabled />
                <a-divider type="vertical" class="bg-gray-500" />
                <span>{{ item?.daBan || 0 }} Đã bán</span>
              </a-space>
            </a-space>
          </div>
        </div>
      </a-spin>

      <div class="flex justify-center my-[20px]">
        <a-button type="primary">
          <router-link :to="`/danh-sach-san-pham?sort=daBan,desc`">
            Xem tất cả
          </router-link>
        </a-button>
      </div>
    </section>

    <!-- latest products -->
    <section class="mt-[30px] w-full">
      <div class="flex gap-[20px] justify-center mb-[15px] tabar_product">
        <h4 :class="'text-[18px] pb-2 cursor-pointer hover:text-[#4096ff] duration-150 ease-in-out uppercase'">
          Sản phẩm mới cập nhật
        </h4>
      </div>


      <a-spin :spinning="latestProductList.length == 0">
        <div class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center">
          <div style="width: 23%; border: none; box-shadow: none" :key="index" v-for="(item, index) in latestProductList">
            <div class="relative">
              <router-link class="block h-[450px]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                <img :src="item?.anhChinh?.url"
                  class="shadow-sm h-full rounded-[5px] hover:scale-[1.05] duration-200 easy-in-out" />
              </router-link>

              <div class="absolute bottom-2 left-[30%] hidden">
                <button>Xem chi tiết</button>
              </div>
            </div>

            <a-space direction="vertical" :size="10" class="mt-[10px]">
              <h3 class="m-0 text-base">
                <router-link class="font-[600]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
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
                <div v-if="item?.giaCu && item?.giaCu > 0 && item?.giaCu > item?.giaMoi">
                  <span class="bg-red-200 text-red-500 p-1">-{{
                    String(
                      ((item?.giaCu - item?.giaMoi) / item?.giaCu) * 100
                    ).slice(0, 2)
                  }}%</span>
                </div>
              </div>

              <a-space>
                <a-rate class="text-[14px]" :value="item?.tbDanhGia || 0" allow-half disabled />
                <a-divider type="vertical" class="bg-gray-500" />
                <span>{{ item?.daBan || 0 }} Đã bán</span>
              </a-space>
            </a-space>
          </div>
        </div>
      </a-spin>

      <div class="flex justify-center my-[20px]">
        <a-button type="primary">
          <router-link :to="`/danh-sach-san-pham?sort=id,desc`">
            Xem tất cả
          </router-link>
        </a-button>
      </div>
    </section>

    <section class="mt-[30px] w-full">
      <div class="flex gap-[20px] justify-center mb-[15px] tabar_product">
        <h4 :class="'text-[18px] pb-2 cursor-pointer hover:text-[#4096ff] duration-150 ease-in-out uppercase'">
          Sản phẩm được yêu thích
        </h4>
      </div>

      <a-spin :spinning="likeProductList.length == 0">
        <div class="flex flex-wrap gap-[20px] px-[30px] w-full justify-center">
          <div style="width: 23%; border: none; box-shadow: none" :key="index" v-for="(item, index) in likeProductList">
            <div class="relative">
              <router-link class="block h-[450px]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                <img :src="item?.anhChinh?.url"
                  class="shadow-sm h-full rounded-[5px] hover:scale-[1.05] duration-200 easy-in-out" />
              </router-link>

              <div class="absolute bottom-2 left-[30%] hidden">
                <button>Xem chi tiết</button>
              </div>
            </div>

            <a-space direction="vertical" :size="10" class="mt-[10px]">
              <h3 class="m-0 text-base">
                <router-link class="font-[600]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
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
                <div v-if="item?.giaCu && item?.giaCu > 0 && item?.giaCu > item?.giaMoi">
                  <span class="bg-red-200 text-red-500 p-1">-{{
                    Math.floor(Number(
                      ((item?.giaCu - item?.giaMoi) / item?.giaCu) * 100
                    ))
                  }}%
                  </span>
                </div>
              </div>

              <a-space>
                <a-rate class="text-[14px]" :value="item?.tbDanhGia || 0" allow-half disabled />
                <a-divider type="vertical" class="bg-gray-500" />
                <span>{{ item?.daBan || 0 }} Đã bán</span>
              </a-space>
            </a-space>
          </div>
        </div>
      </a-spin>

      <div class="flex justify-center my-[20px]">
        <a-button type="primary">
          <router-link :to="`/danh-sach-san-pham?sort=tbDanhGia,desc`">
            Xem tất cả
          </router-link>
        </a-button>
      </div>
    </section>

    <section class="my-[50px] h-[200px] px-[20px]">
      <swiper :slidesPerView="4" :spaceBetween="30" class="mySwiper" :loop="true" :effect="'creative'" :autoplay="{
        delay: 8000,
        disableOnInteraction: true,
      }">
        <SwiperSlide>
          <img class="ư-full h-full" src="/image/brand/nike.jpeg" />
        </SwiperSlide>

        <SwiperSlide>
          <img class="ư-full h-[200px]" src="/image/brand/adidas.png" />
        </SwiperSlide>

        <SwiperSlide>
          <img class="ư-full h-[200px]" src="/image/brand/new-balance.png" />
        </SwiperSlide>

        <SwiperSlide>
          <img class="ư-full h-[200px]" src="/image/brand/converse.jpeg" />
        </SwiperSlide>

        <SwiperSlide>
          <img class="ư-full h-[200px]" src="/image/brand/puma.png" />
        </SwiperSlide>

        <SwiperSlide>
          <img class="ư-full h-[200px]" src="/image/brand/vans.jpeg" />
        </SwiperSlide>
      </swiper>

    </section>

  </div>
</template>

<script lang="ts" setup>
import ProductService from "~/services/ProductService";

const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);

const currentActiveProductTab = ref<number>(1);
const isLoadingProduct = ref<boolean>(false);

const latestProductList = ref([]);
const saleProductList = ref([]);
const likeProductList = ref([]);

const onCallApi = () => {
  if (isLoadingProduct.value) return;
  isLoadingProduct.value = true;

  const payload: any = {
    page: 0,
    size: 8,

  };
  ProductService.locSp({ ...payload, sort: 'daBan,desc' })
    .then((res: any) => {
      console.log("filter product: ", res.content);
      saleProductList.value = res.content;
    })
    .catch((err) => {
      notification.error({
        message: "Không thể lấy dữ liệu sản phẩm!",
      });
      console.log("filter product failed: ", err);
    });
  ProductService.locSp({ ...payload, sort: 'id,desc' })
    .then((res: any) => {
      console.log("filter product: ", res.content);
      latestProductList.value = res.content;
    })
    .catch((err) => {
      notification.error({
        message: "Không thể lấy dữ liệu sản phẩm!",
      });
      console.log("filter product failed: ", err);
    });
  ProductService.locSp({ ...payload, sort: 'tbDanhGia,desc' })
    .then((res: any) => {
      console.log("filter product: ", res.content);
      likeProductList.value = res.content;
    })
    .catch((err) => {
      notification.error({
        message: "Không thể lấy dữ liệu sản phẩm!",
      });
      console.log("filter product failed: ", err);
    });
};
onMounted(() => {
  onCallApi();
});
</script>

<style>
.tabar_product h4.activated {
  border-bottom: 2px solid #4096ff;
}
</style>
