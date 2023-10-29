<template>
    <div>
        <a-breadcrumb class="bg-gray-50 px-3 md:px-[50px] py-2">
            <a-breadcrumb-item>
                <router-link to="/">Trang chủ</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Danh sách sản phẩm</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="flex gap-[50px] mt-[20px] w-full justify-start px-3 md:px-[50px]">
            <ProductFilterSidebar @filter="onClickFilter" />
            <div>
                <a-space class="items-center justify-end w-full mb-[20px]">
                    <span class="text-xl">Sắp xếp:</span>
                    <a-dropdown>
                        <template #overlay>
                            <a-menu>
                                <a-menu-item key="1">
                                    <UserOutlined />
                                    Bán chạy nhất
                                </a-menu-item>
                                <a-menu-item key="pricePump">
                                    <UserOutlined />
                                    Giá giảm dần
                                </a-menu-item>
                                <a-menu-item key="priceDump">
                                    <UserOutlined />
                                    Giá tăng dần
                                </a-menu-item>
                            </a-menu>
                        </template>
                        <a-button>
                            Mới nhất
                            <DownOutlined />
                        </a-button>
                    </a-dropdown>
                </a-space>

                <div class="flex flex-wrap gap-[20px]">
                    <a-card hoverable :bodyStyle="'padding: 10px'" style="width: 23%; border: none; box-shadow: none;"
                        :key="index" v-for="(item, index) in productList">
                        <template #cover>
                            <div class="relative">
                                <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                                    <img :src="item?.anhChinh?.url" class="shadow-sm" />
                                </router-link>

                                <div class="absolute bottom-2 left-[30%] hidden">
                                    <button>
                                        Xem chi tiết
                                    </button>
                                </div>
                            </div>

                        </template>
                        <a-card-meta>
                            <template #title>
                                <h3 class="m-0 text-base">
                                    <router-link :to="`/san-pham/${item?.tieuDe}/${item?.id}`">
                                        {{ item.tieuDe }}
                                    </router-link>
                                </h3>

                            </template>
                            <template #description>

                                <div class="product_price flex items-center gap-[10px]">
                                    <del>{{ item?.giaCu }} vnd</del>
                                    <span class="font-bold text-red-500">
                                        {{ item?.giaMoi }} vnd
                                    </span>
                                </div>

                                <a-space>
                                    <a-rate class="text-[14px]" :value="item?.soSaoDanhGia || 0" allow-half disabled />
                                    <a-divider type="vertical" class="bg-gray-500" />
                                    <span>55 Đã bán</span>
                                </a-space>
                            </template>
                        </a-card-meta>
                    </a-card>
                </div>

                <div class="flex justify-center mt-[15px]">
                    <a-pagination v-model="paginationCnf"></a-pagination>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { ProductFilterReq } from "~/components/product/ProductFilterSidebar.vue";
import ProductService from "~/services/ProductService";


const productList = ref([]);
const paginationCnf = reactive<{
    current: number;
    pageSize: number;
    total: number;
}>({
    current: 1,
    pageSize: 12,
    total: 0
});

const onClickFilter = (val: ProductFilterReq) => {
    console.log("filter product", val);
}

const onCallApiProductFilter = () => {
    ProductService.locSp({
        page: paginationCnf.current - 1, size: paginationCnf.pageSize
    })
        .then((res: any) => {
            console.log("product filter data", res);
            productList.value = res.content;
            paginationCnf.total = res.totalElements;
        })
        .catch(() => notification.error({
            message: "Lọc thất bại!"
        }));
};

onMounted(() => {
    onCallApiProductFilter();
});
</script>
