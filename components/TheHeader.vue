<template>
  <header>
    <div class="flex items-center justify-end gap-[15px] max-w-[1200px] mx-auto px-[100px]">
      <a-menu
        class="justify-center"
        style="border: none"
        v-model:selectedKeys="current"
        mode="horizontal"
        :items="items"
      />
      <nuxt-link href="/dang-nhap" v-if="authen == null || authen == undefined">Đăng nhập</nuxt-link>
      <ul v-else>
        <li class="flex items-center gap-[10px]">
          <nuxt-link href="/tai-khoan">Xin chào {{authen}}</nuxt-link>
          <a href="#">Đăng xuất</a>
        </li>
      </ul>

      <ShoppingCartOutlined class="text-[16px] cursor-pointer hover:text-orange-500" />
      <SearchOutlined class="text-[16px] cursor-pointer hover:text-orange-500" />
    </div>
  </header>
</template>

<script lang="ts" setup>
import { h, ref } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { fetchInstance } from "~/services/FetchInstance";
import userVue from "~/layouts/user.vue";
const current = ref<string[]>(["mail"]);
const items = ref<MenuProps["items"]>([
  {
    key: "mail",
    label: "Sản phẩm",
    title: "Sản phẩm",
    children: [
      {
        key: "3",
        label: "Option 3",
        title: "Option 3",
      },
      {
        key: "4",
        label: "Option 4",
        title: "Option 4",
      },
    ],
  },
  {
    key: "app",
    label: "Tra cứu đơn",
    title: "Tra cứu đơn",
  },
  {
    key: "app",
    label: "Chính sách giao hàng",
    title: "Chính sách giao hàng",
  },
  {
    key: "alipay",
    label: h("a", { href: "https://antdv.com", target: "_blank" }, "Liên hệ"),
    title: "Liên hệ",
  },
]);

const authen = fetchInstance.getCookie("username");
</script>

<style>
header .ant-menu-title-content {
  font-size: 20px;
  font-weight: 700;
}
</style>
