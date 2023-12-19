<template>
  <header style="border-bottom: 1px solid rgba(220, 220, 220, 0.736)">
    <div class="flex items-center justify-between gap-[15px] max-w-[1200px] mx-auto px-[100px] py-[30px]">
      <router-link to="/">
        <img class="h-[30px] w-[100px]" src="/cover.png" />
      </router-link>
      <a-space :size="15" class="text-[20px] items-center font-[600]">
        <router-link to="/danh-sach-san-pham"> Tất cả sản phẩm </router-link>

        <a-dropdown overlayClassName="px-[50px] py-[20px]">
          <a class="ant-dropdown-link" @click.prevent>
            <span> Giày nam </span>
            <DownOutlined class="text-[14px]" />
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item :key="item.tenDanhMuc" v-for="item in categoryList">
                <router-link :to="`/giay-nam?danh_muc=${item.id}`">
                  {{ item.tenDanhMuc }}
                </router-link>
              </a-menu-item>

              <a-menu-item :key="item.tenThuongHieu" v-for="item in brandList">
                <router-link :to="`/giay-nam?thuong_hieu=${item.id}`">
                  Giày {{ item.tenThuongHieu }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <a-dropdown overlayClassName="px-[50px] py-[20px]">
          <a class="ant-dropdown-link" @click.prevent>
            <router-link to="/giay-nu"> Giày nữ </router-link>
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
                <router-link :to="`/giay-nu?thuong_hieu=${item.id}`">
                  Giày {{ item.tenThuongHieu }}
                </router-link>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>

        <router-link to="/tra-cuu-don"> Tra cứu đơn hàng </router-link>

        <router-link to="/chinh-sach"> Chính sách đổi trả </router-link>
      </a-space>

      <a-space class="items-center" :size="20">
        <router-link to="/gio-hang">
        <a-badge :count="_storeCart.cartTotalQty" :offset="[4,0]" >
          <div style="
                          background-image: url('/image/common/Shopping-Bag.svg');
                          background-size: cover;
                        " class="w-[18px] h-[18px] cursor-pointer hover:scale-[1.05] duration-200 easy-in-out"></div>
          </a-badge>
        </router-link>
        <SearchOutlined @click="onClickShowSearchModal"
          class="text-[16px] cursor-pointer hover:text-[#4096ff] hover:scale-[1.05] duration-200 easy-in-out" />

        <nuxt-link class="font-bold text-lg text-[#000000e0] no-underline" href="/dang-nhap"
          v-if="authen == null || authen == undefined">Đăng nhập</nuxt-link>
        <a-dropdown v-else class="ml-[10px]">
          <a class="ant-dropdown-link flex items-center gap-[5px]" @click.prevent>
            {{ loggedUserName }}
            <a-avatar size="small">
              <template #icon>
                <UserOutlined class="hover:scale-[1.05] duration-200 easy-in-out" />
              </template>
            </a-avatar>
          </a>
          <template #overlay>
            <a-menu>
              <a-menu-item><nuxt-link href="/tai-khoan/thong-tin">Thông tin cá nhân
                </nuxt-link>
              </a-menu-item>
              <a-menu-item><nuxt-link href="/tai-khoan/lich-su-mua">Lịch sử mua hàng</nuxt-link>
              </a-menu-item>
              <a-menu-item><nuxt-link href="/tai-khoan/doi-mat-khau">Đổi mật khẩu</nuxt-link>
              </a-menu-item>
              <a-menu-item @click="logOut">Đăng xuất</a-menu-item>
              <!--            <a-sub-menu key="test" title="sub menu">-->
              <!--              <a-menu-item>3rd menu item</a-menu-item>-->
              <!--              <a-menu-item>4th menu item</a-menu-item>-->
              <!--            </a-sub-menu>-->
              <!--            <a-sub-menu title="disabled sub menu" disabled>-->
              <!--              <a-menu-item>5d menu item</a-menu-item>-->
              <!--              <a-menu-item>6th menu item</a-menu-item>-->
              <!--            </a-sub-menu>-->
            </a-menu>
          </template>
        </a-dropdown>
      </a-space>
    </div>
  </header>
  <div v-show="isShowSearchModal" @click.self="onClickCloseSearchModal"
    class="absolute top-0 left-0 bg-[#00000080] w-full h-full z-[11] flex justify-center items-center">

    <div class="w-[500px] bg-white p-[50px] rounded-[4px] grid gap-[15px] relative">
      <label>Nhập từ khoá cần tìm:</label>
      <a-input v-model:value="searchVal" placeholder="...." />

      <div class="flex justify-center">
        <a-button type="primary" @click="onClickSearch"> Tìm</a-button>
      </div>

      <CloseOutlined @click="onClickCloseSearchModal"
        class="absolute top-[15px] right-[15px] cursor-pointer hover:scale-[1.05] duration-200 easy-in-out" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { h, ref } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import { MenuProps } from "ant-design-vue";
import { fetchInstance } from "~/services/FetchInstance";
import userVue from "~/layouts/user.vue";
import ProductService from "~/services/ProductService";

const _storeCart = useCartStore();
const _router = useRouter();

const loggedUserName = ref<string>("");
const isShowSearchModal = ref<boolean>(false);
const searchVal = ref<String>("");

const onClickSearch = () => {
  if (!searchVal.value) {
    notification.warning({
      message: "Vui lòng nhập từ khoá tìm kiếm!"
    });
    return;
  }

  _router.push("/tim-kiem?q=" + searchVal.value);
  onClickCloseSearchModal();
}

const onClickCloseSearchModal = () => {
  searchVal.value = "";
  isShowSearchModal.value = false;
}

const onClickShowSearchModal = () => {
  isShowSearchModal.value = true;
}
// hau
const categoryList = ref<
  {
    id: number;
    tenDanhMuc: string;
  }[]
>([]);
const brandList = ref<
  {
    id: number;
    tenThuongHieu: string;
  }[]
>([]);

onMounted(() => {
  ProductService.getAllBrand()
    .then((res: any) => (brandList.value = res.content))
    .catch(() =>
      notification.error({
        message: "Không thể lấy dữ liệu thương hiệụ!",
      })
    );

  ProductService.getAllCategory()
    .then((res: any) => (categoryList.value = res.content))
    .catch(() =>
      notification.error({
        message: "Không thể lấy dữ liệu danh mục!",
      })
    );
  loggedUserName.value = localStorage.getItem("username") || "";
});


// vinh
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

const authen = ref<string | null>(window.localStorage.getItem("username"));

const logOut = () => {
  notification.success({
    message: "Đăng xuất thành công!"
  });
  localStorage.removeItem("loggedUser");
  localStorage.removeItem("username");
  localStorage.removeItem("auth");
  setTimeout(() => window.location.href = window.location.origin, 200);
};

onMounted(() => {
  authen.value = window.localStorage.getItem("username");
})
</script>

<style>
header .ant-menu-title-content {
  font-size: 20px;
  font-weight: 700;
}
</style>
