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
      <router-link to="/gio-hang">
        <ShoppingCartOutlined class="text-[16px] cursor-pointer hover:text-orange-500" />
      </router-link>
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
</script>

<style>
header .ant-menu-title-content {
  font-size: 20px;
  font-weight: 700;
}
</style>
