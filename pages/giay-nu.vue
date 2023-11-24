<template>
  <div class="">
    <a-breadcrumb class="bg-gray-50 px-3 md:px-[50px] py-2">
      <a-breadcrumb-item>
        <router-link to="/">Trang chủ</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>Giày nữ</a-breadcrumb-item>
    </a-breadcrumb>

    <div
      class="flex gap-[50px] mt-[20px] w-full justify-start px-3 md:px-[50px]"
    >
      <ProductFilterSidebar @filter="onClickFilter" />
      <div class="w-full">
        <a-space class="items-center justify-end w-full mb-[20px]">
          <span class="text-xl">Sắp xếp:</span>
          <a-dropdown>
            <template #overlay>
              <a-menu @click="onClickSort">
                <a-menu-item key="latest">
                  <UserOutlined />
                  Mới nhất
                </a-menu-item>
                <a-menu-item key="sale">
                  <UserOutlined />
                  Bán chạy nhất
                </a-menu-item>
                <a-menu-item key="priceDown">
                  <UserOutlined />
                  Giá giảm dần
                </a-menu-item>
                <a-menu-item key="priceUp">
                  <UserOutlined />
                  Giá tăng dần
                </a-menu-item>
              </a-menu>
            </template>
            <a-button>
              {{ filterSortBy.title }}
              <DownOutlined />
            </a-button>
          </a-dropdown>
        </a-space>

        <a-spin :class="{ 'flex justify-center': isFiltering }" :spinning="isFiltering">
          <div v-if="productList.length > 0" class="flex flex-wrap gap-[20px]">
            <div style="width: 23%; border: none; box-shadow: none" :key="index" v-for="(item, index) in productList">
              <div class="relative">
                <router-link class="block h-[300px]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                  <img :src="item?.anhChinh?.url" class="shadow-sm h-full rounded-[5px] hover:scale-[1.05] duration-200 easy-in-out" />
                </router-link>

                <div class="absolute bottom-2 left-[30%] hidden">
                  <button>Xem chi tiết</button>
                </div>
              </div>

              <a-space direction="vertical" :size="10" class="mt-[10px]">
                <h3 class="m-0 text-base">
                  <router-link class="font-[600]" :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                    {{ item.tieuDe.slice(0, 50) }}
                  </router-link>
                </h3>

                <div class="product_price flex items-center gap-[10px]">
                  <template v-if="item?.giaCu && item?.giaCu > 0">
                    <del>{{ _formatVnCurrency(item?.giaCu) }}</del>
                    <span class="font-bold text-red-500">
                      {{ _formatVnCurrency(item?.giaMoi) }}
                    </span>
                  </template>

                  <span v-else class="font-bold text-red-500">
                    {{ _formatVnCurrency(item?.giaMoi) }}
                  </span>
                </div>

                <a-space>
                  <a-rate class="text-[14px]" :value="item?.tbDanhGia || 0" allow-half disabled />
                  <a-divider type="vertical" class="bg-gray-500" />
                  <span>{{ item?.daBan }} Đã bán</span>
                </a-space>
              </a-space>
            </div>
          </div>
          <template v-else-if="!isFiltering && productList.length == 0">
            <a-result status="404" sub-title="Không tìm thấy sản phẩm nào!">
            </a-result>

          </template>
        </a-spin>

        <div class="flex justify-center mt-[15px]">
          <a-pagination v-model="paginationCnf"></a-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  IProductFilterModel,
  IProductFilterReq,
} from "@/types/IProductFilter";
import ProductService from "~/services/ProductService";

const _route = useRoute();
const _formatVnCurrency = inject("formatVnCurrency", (p: number) => 0);

const productList = ref([]);
const paginationCnf = reactive<{
  current: number;
  pageSize: number;
  total: number;
}>({
  current: 1,
  pageSize: 12,
  total: 0,
});

const filterModel = reactive<IProductFilterReq>({
  hienThiWeb: true,
  gioiTinh: "FEMALE",
});
const filterSortBy = reactive({
  title: "Mới nhất",
  by: "id,desc",
});
const onClickSort = (event: any) => {
  console.log("sort by: ", event);

  switch (event.key) {
    case "latest":
      filterSortBy.title = "Mới nhất";
      filterSortBy.by = "id,desc";
      break;
    case "sale":
      filterSortBy.title = "Bán chạy nhất";
      filterSortBy.by = "daBan,desc";
      break;
    case "priceDown":
      filterSortBy.title = "Giá giảm dần";
      filterSortBy.by = "giaMoi,desc";
      break;
    case "priceUp":
      filterSortBy.title = "Giá tăng dần";
      filterSortBy.by = "giaMoi,asc";
      break;
    default:
      break;
  }

  onCallApiProductFilter();
};
const onClickFilter = (val: IProductFilterModel) => {
  filterModel.thuongHieu = val.brand;
  filterModel.dmGiay = val.category;
  filterModel.mau = val.color;
  filterModel.sizeId = val.sizeId;
  filterModel.tieuDe = val.name || undefined;
  if (val.priceStart > 0 || val.priceEnd > 0)
    filterModel.khoangGia = val.priceRange;

  console.log("filter product", filterModel);
  onCallApiProductFilter();
};

const isFiltering = ref<boolean>(false);
const onCallApiProductFilter = () => {
  if (isFiltering.value) return;

  isFiltering.value = true;
  productList.value = [];
  ProductService.locSp(
    filterModel,
    paginationCnf.current - 1,
    paginationCnf.pageSize,
    filterSortBy.by
  )
    .then((res: any) => {
      console.log("product filter data", res);
      productList.value = res.content;
      paginationCnf.total = res.totalElements;
    })
    .catch(() =>
      notification.error({
        message: "Lọc thất bại!",
      })
    )
    .finally(() => isFiltering.value = false);
};

onMounted(() => {
  if (_route.query.thuong_hieu)
    filterModel.thuongHieu = _route.query?.thuong_hieu
      ? Number(_route.query?.thuong_hieu)
      : undefined;
  if (_route.query.danh_muc)
    filterModel.dmGiay = _route.query?.danh_muc
      ? Number(_route.query?.danh_muc)
      : undefined;
  onCallApiProductFilter();
});
</script>
