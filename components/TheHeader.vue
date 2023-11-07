<template>
  <header style="border-bottom: 1px solid rgba(220, 220, 220, 0.736);">
    <div class="flex items-center justify-between gap-[15px] max-w-[1200px] mx-auto px-[100px] py-[30px]">
      <img class="h-[30px] w-[100px]" src="/cover.png">
      <a-space :size="15" class="font-light text-[20px] items-center">

        <router-link to="/danh-sach-san-pham">
          Sản phẩm bán chạy
        </router-link>

        <a-dropdown overlayClassName="px-[50px] py-[20px]">
          <a class="ant-dropdown-link" @click.prevent>
            <span> Giày nam </span>
            <DownOutlined class="text-[14px]" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item :key="item.tenDanhMuc" v-for="item in categoryList">
                <router-link :to="`/giay-nu?danh_muc=${item.id}`">
                  {{ item.tenDanhMuc }}
                </router-link>
              </a-menu-item>

              <a-menu-item :key="item.tenThuongHieu" v-for="item in brandList">
                <router-link :to="`/giay-nu?thuon_hieu=${item.id}`">
                  Giày {{ item.tenThuongHieu }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-dropdown overlayClassName="px-[50px] py-[20px]">
          <a class="ant-dropdown-link" @click.prevent>
            <router-link to="/giay-nu">
              Giày nữ
            </router-link>
            <DownOutlined class="text-[14px]" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item :key="item.tenDanhMuc" v-for="item in categoryList">
                <router-link :to="`/giay-nu?danh_muc=${item.id}`">
                  {{ item.tenDanhMuc }}
                </router-link>
              </a-menu-item>

              <a-menu-item :key="item.tenThuongHieu" v-for="item in brandList">
                <router-link :to="`/giay-nu?thuon_hieu=${item.id}`">
                  Giày {{ item.tenThuongHieu }}
                </router-link>
              </a-menu-item>

            </a-menu>
          </template>
        </a-dropdown>

        <router-link to="/tra-cuu-don">
          Tra cứu đơn hàng
        </router-link>

        <router-link to="/chinh-sach">
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

import ProductService from "~/services/ProductService";

const categoryList = ref<{
  id: number;
  tenDanhMuc: string
}[]>([]);
const brandList = ref<{
  id: number;
  tenThuongHieu: string
}[]>([]);


onMounted(() => {
  ProductService.getAllBrand()
    .then((res: any) => brandList.value = res.content)
    .catch(() => notification.error({
      message: "Không thể lấy dữ liệu thương hiệụ!"
    }));

  ProductService.getAllCategory()
    .then((res: any) => categoryList.value = res.content)
    .catch(() => notification.error({
      message: "Không thể lấy dữ liệu danh mục!"
    }));

});
</script>

<style>
header .ant-menu-title-content {
  font-size: 20px;
  font-weight: 700;
}
</style>
