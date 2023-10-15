<template>
  <swiper
    :direction="'vertical'"
    :slidesPerView="7"
    :pagination="{
      clickable: true,
    }"
    :autoplay="{
      delay: 2000,
      disableOnInteraction: true,
    }"
    :loop="true"
    :modules="modules"
    class="mySwiper11 mx-auto h-[320px] w-[40px]"
    @swiper="onSwiper"
    @slideChange="onSlideChange"
  >
    <swiper-slide
      v-slot="{ isActive }"
      v-for="item in 15"
      :key="item"
      class="mt-[10px] h-[40px] w-[33px]"
    >
      <div
        class="h-[50px] w-[40px]"
        :style="isActive ? 'border: 1px solid yellow' : ''"
      >
        <img
          class=""
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup lang="ts">
const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};
</script>
