<template>
  <div class="bg-[#F8FAFE] w-full">
    <footer
      class="max-w-[1200px] mx-auto  grid lg:flex justify-center lg:justify-center gap-[30px] xl:gap-[80px] px-[20px] lg:px-[100px] 2xl:px-[200px] py-[50px] border-t"
    >
      <div class="grid lg:block justify-center text-center lg:text-left">
        <h2 class="text-2xl font-semibold w-[400px]">
          Shop Giày Thể Thao HAUNV
        </h2>
        <p class="max-w-[300px] mt-[15px] grid gap-[10px]">
          <span>
            Điện thoại:
            <a href="tel:0584843998" class="hover:text-[#524FD5]">
              098 123 4567
            </a>
          </span>

          <span>
            Email:
            <a
              href="mailto:trungtam.gedu@gmail.com"
              class="hover:text-[#524FD5]"
            >
              trungtam.gedu@gmail.com
            </a>
          </span>

          <span>
            Địa chỉ: Số 12N7 ngõ 40, đường Xuân La, P. Xuân La, Q.Tây Hồ, Tp. Hà
            Nội
          </span>
        </p>
      </div>

      <!-- leave your info -->
      <div class="studying_itenerary">
        <div class="text-20px grid gap-[10px] mt-[50px]">
          <router-link to="/danh-sach-san-pham">
            Danh sách sản phẩm
          </router-link>

          <router-link to="/giay-nam"> Giày thể thao nam </router-link>

          <router-link to="/giay-nu"> Giày thể thao nữ </router-link>

          <router-link to="tra-cuu-don"> Tra cứu đơn hàng </router-link>

          <router-link to="/chinh-sach"> Chính sách đổi trả </router-link>
        </div>
      </div>
      <!-- end leave your info -->

      <!-- social media link -->
      <div class="grid justify-center">
        <ul class="flex gap-[10px] justify-center list-none">
          <li>
            <a
              href="https://facebook.com"
              class="flex items-center justify-center gap-[10px] border hover:border-gray-400 rounded-full p-[15px] w-[40px] h-[40px] hover:scale-[1.1] duration-200 ease-in-out"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
          </li>

          <li>
            <a
              href="https://facebook.com"
              class="flex items-center justify-center gap-[10px] border hover:border-gray-400 rounded-full p-[15px] w-[40px] h-[40px] hover:scale-[1.1] duration-200 ease-in-out"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </li>

          <li>
            <a
              href="https://facebook.com"
              class="flex items-center justify-center gap-[10px] border hover:border-gray-400 rounded-full p-[15px] w-[40px] h-[40px] hover:scale-[1.1] duration-200 ease-in-out"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </li>

          <li>
            <a
              href="https://facebook.com"
              class="flex items-center justify-center gap-[10px] border hover:border-gray-400 rounded-full p-[15px] w-[40px] h-[40px] hover:scale-[1.1] duration-200 ease-in-out"
            >
              <i class="fab fa-tiktok"></i>
            </a>
          </li>
        </ul>

        <div class="border max-w-[250px] mx-auto">
          <iframe
            class="mx-auto"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14892.31949776022!2d105.8043306!3d21.0694718!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc88f002df7%3A0xc305100e8153f480!2zVHJ1bmcgdMOibSB0aeG6v25nIGjDoG4gRy1FRFU!5e0!3m2!1svi!2s!4v1694533158294!5m2!1svi!2s"
            width="300px"
            height="250"
            style="border: 0"
            allowfullscreen="true"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </footer>
  </div>
</template>
