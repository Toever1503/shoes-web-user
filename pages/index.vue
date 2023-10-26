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

    <section class="mt-[30px] w-full">
      <h3 class="text-center text-[24px]">SẢN PHẨM ĐANG BÁN CHẠY</h3>

      <div class="flex gap-[30px] px-[30px] w-full">

        <a-card hoverable :bodyStyle="'padding: 10px'" style="width: 25%; border: none; box-shadow: none;" :key="i" v-for="i in 4">
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
      <h3 class="text-center text-[24px]">SẢN PHẨM ĐƯỢC YÊU THÍCH</h3>

      <div class="flex gap-[30px] px-[30px] w-full">

        <a-card hoverable :bodyStyle="'padding: 10px'" style="width: 25%; border: none; box-shadow: none;" :key="i" v-for="i in 4">
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
    
  </div>
</template>

<script lang="ts" setup></script>
