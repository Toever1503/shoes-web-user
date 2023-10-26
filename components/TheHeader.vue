<template>
  <header style="border-bottom: 1px solid rgba(220, 220, 220, 0.736);">
    <div class="flex items-center justify-between gap-[15px] max-w-[1200px] mx-auto px-[100px] py-[30px]">
      <img class="h-[30px] w-[100px]" src="https://sportshoes.web.app/_nuxt/img/logo.f486653.png">
      <a-space :size="30" class="font-semibold text-[20px] items-center">

        <a-dropdown overlayClassName="px-[50px] py-[20px]">
          <a class="ant-dropdown-link" @click.prevent>
            <router-link to="/gio-hang">
              Sản phẩm
            </router-link>
            <DownOutlined />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;">1st menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">2nd menu item</a>
              </a-menu-item>
              <a-menu-item>
                <a href="javascript:;">3rd menu item</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <router-link to="/gio-hang">
          Tra cứu đơn hàng
        </router-link>

        <router-link to="/gio-hang">
          Liên hệ
        </router-link>

        <router-link to="/Chính sách">
          Chính sách đổi trả
        </router-link>

      </a-space>

      <a-space class="items-center">
        <router-link to="/gio-hang">
          <div style="background-image: url('/image/common/Shopping-Bag.svg'); background-size: cover"
            class="w-[18px] h-[18px] cursor-pointer hover:scale(1.1)"></div>
        </router-link>
        <SearchOutlined class="text-[16px] cursor-pointer hover:text-orange-500" />
      </a-space>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  DownOutlined
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";

</script>

<style>
header .ant-menu-title-content {
  font-size: 20px;
  font-weight: 700;
}
</style>
