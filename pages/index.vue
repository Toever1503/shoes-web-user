<template>
  <div>
    <section class="w-full h-[700px] mt-[20px]">
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
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1i977W.img?w=1920&h=1080&q=60&m=2&f=jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1i7OKQ.img?w=1920&h=1080&q=60&m=2&f=jpg"
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            src="https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1i8J7X.img?w=1920&h=1080&q=60&m=2&f=jpg"
          />
        </SwiperSlide>
      </Swiper>
    </section>

    <section>
      <h3 class="text-center text-[24px]">SẢN PHẨM ĐANG BÁN CHẠY</h3>

      <swiper
        :slidesPerView="5"
        :spaceBetween="30"
        :pagination="{
          clickable: true,
        }"
        :modules="modules"
        class="mySwiper w-[80%] mx-auto"
      >
        <swiper-slide v-for="item in 15" :key="item">
        <a-card hoverable style="width: 100%">
            <template #cover>
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            </template>
            <a-card-meta title="Europe Street beat">
              <template #description>www.instagram.com {{ item }}}</template>
            </a-card-meta>
          </a-card></swiper-slide
        >
      </swiper>
    </section>

    <section>
      <h3>SẢN PHẨM ĐƯỢC YÊU THÍCH</h3>
    </section>
  </div>
</template>

<script lang="ts" setup></script>
