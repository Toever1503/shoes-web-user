<template>
    <!-- begin filter -->
    <a-form ref="formRef" :model="formState" layout="vertical" class="w-[300px] filter_form">
        <a-form-item name="name" class="mb-4 w-[250px]">
            <a-input v-model:value="formState.name" placeholder="Nhập từ khoá tìm kiếm..."></a-input>
        </a-form-item>

        <a-form-item name="category" class="w-full mb-3">
            <template #label class="w-full">
                <span class="font-semibold block w-full"
                    style="border-bottom: 2px solid rgba(220, 220, 220, 0.747); font-size: 18px">Danh mục</span>
            </template>
            <a-radio-group v-model:value="formState.category" class="grid">
                <a-radio :value="val.id" :key="val.id" v-for="val in categoryList">{{ val.tenDanhMuc }} </a-radio>
            </a-radio-group>
        </a-form-item>


        <a-form-item name="color" class="w-full mb-3">
            <template #label>
                <label class="font-semibold block w-full"
                    style="border-bottom: 2px solid rgba(220, 220, 220, 0.747); font-size: 18px">Màu</label>
            </template>
            <a-radio-group v-model:value="formState.color">
                <a-radio :value="val.id" :key="val.id" v-for="val in colorList">{{ val.giaTri }}</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item name="size" class="w-full mb-3">
            <template #label>
                <label class="font-semibold block w-full"
                    style="border-bottom: 2px solid rgba(220, 220, 220, 0.747); font-size: 18px">Size</label>
            </template>
            <a-radio-group v-model:value="formState.size">
                <a-radio :value="val.id" :key="val.id" v-for="val in sizeList">{{ val.giaTri }}</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-form-item name="priceRange" class="w-full">
            <template #label>
                <label class="font-semibold block w-full"
                    style="border-bottom: 2px solid rgba(220, 220, 220, 0.747); font-size: 18px">Giá</label>
            </template>
            <a-slider v-model:value="formState.priceRange" @change="onRangePriceChange" :min="0" range :max="100000000">
                <template #mark="{ point, label }">
                    kfmsk
                </template>

            </a-slider>

            <a-space direction="vertical w-full">
                <a-space class="justify-between w-full">
                    <span class="block w-[50px]">Từ:</span>
                    <a-input v-model:value="formState.priceStart"
                        @change="formState.priceRange = [formState.priceStart, formState.priceRange[1]]" class="w-[150px]"
                        type="number" suffix="vnd" />
                </a-space>
                <a-space class="justify-between w-full">
                    <span class="block w-[50px]">Đến:</span>
                    <a-input v-model:value="formState.priceEnd"
                        @change="formState.priceRange = [formState.priceRange[0], formState.priceEnd]" type="number"
                        class="w-[150px]" suffix="vnd" />
                </a-space>
            </a-space>
        </a-form-item>

        <a-form-item name="brand" class="w-full">
            <template #label>
                <label class="font-semibold block w-full"
                    style="border-bottom: 2px solid rgba(220, 220, 220, 0.747); font-size: 18px">Thương hiệu</label>
            </template>
            <a-radio-group v-model:value="formState.brand" class="grid">
                <a-radio :value="val.id" :key="val.id" v-for="val in brandList">{{ val.tenThuongHieu }}</a-radio>
            </a-radio-group>
        </a-form-item>

        <a-space class="justify-center">
            <a-button htmlType="reset" @click="resetFilter">
                Làm mới
            </a-button>

            <a-button class="bg-black text-white" htmlType="submit" @click="onFilter">
                Lọc
            </a-button>
        </a-space>

    </a-form>

    <!-- end filter -->
</template>

<script setup lang="ts">
import ProductService from "~/services/ProductService";
import type { FormInstance } from "ant-design-vue";

const _emit = defineEmits(["filter"]);

const formRef = ref<FormInstance>();

export interface ProductFilterReq {
    name?: string;
    category?: number;
    color?: number;
    size?: number;
    brand?: number;
    priceStart: number;
    priceEnd: number;
    priceRange: [number, number]
};
const formState = reactive<ProductFilterReq>({
    priceStart: 0,
    priceEnd: 0,
    priceRange: [0, 0],
});
// onRangePriceChange
const categoryList = ref<{
    id: number;
    tenDanhMuc: string
}[]>([]);
const colorList = ref<{
    id: number;
    giaTri: string
}[]>([]);
const sizeList = ref<{
    id: number;
    giaTri: string
}[]>([]);
const brandList = ref<{
    id: number;
    tenThuongHieu: string
}[]>([]);

const onRangePriceChange = () => {
    formState.priceStart = formState.priceRange[0];
    formState.priceEnd = formState.priceRange[1];
};

const resetFilter = () => {
    formRef.value?.resetFields();
    formState.priceStart = 0;
    formState.priceEnd = 0;
}

const onFilter = () => {
    _emit("filter", formState);
}

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

    ProductService.getAllColorVariation()
        .then((res: any) => colorList.value = res)
        .catch(() => notification.error({
            message: "Không thể lấy dữ liệu màu!"
        }));

    ProductService.getAllSizeVariation()
        .then((res: any) => sizeList.value = res)
        .catch(() => notification.error({
            message: "Không thể lấy dữ liệu size!"
        }));
});
</script>