<template>
    <section class="w-full h-[200px] px-[20px]">
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
</template>