<template>
    <div class="mx-auto">
        <a-breadcrumb class="bg-gray-50 md:px-[50px] px-3 py-2">
            <a-breadcrumb-item>
                <router-link to="/">Trang chủ</router-link>
            </a-breadcrumb-item>
            <a-breadcrumb-item>Tra cứu đơn hàng</a-breadcrumb-item>
        </a-breadcrumb>

        <div class="mx-auto max-w-[800px]">

            <section class="px-3 md:px-[50px]">
                <a-card class="bg-white shadown rounded px-6">
                    <div class="container">
                        <h1 class="text-center font-bold text-3xl pt-5">Tra cứu đơn hàng</h1>
                        <p class=" text-center mt-7">Để tra cứu thông tin đơn hàng, quý khách vui lòng nhập mã đơn hàng hoặc
                            số
                            điện thoại đặt hàng.
                        </p>
                    </div>
                    <div>
                        <label for="oderId" class="font-bold block mb-3">Mã đơn hàng/Số điện thoại</label>
                        <a-input v-model:value="q" type="text" id="oderId" name="oderId"
                            placeholder="..." />
                    </div>
                    <div class=" flex justify-center mt-[15px]">
                        <a-button @click="onSearch" type="primary">
                            Tìm kiếm
                        </a-button>
                    </div>
                </a-card>
            </section>
            <section class="mt-[20px] px-3 md:px-[50px]">
                <h3 class="m-0 py-3">
                    Kết quả tìm kiếm
                </h3>
                <a-table :columns="columns" bordered :pagination="false">
                    <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'image'">
                            <router-link :to="`/san-pham/${record.productName}/${record.productId}`">
                                <a-image class="bordered" :preview="false" :width="100" :src="record.anh" />
                            </router-link>
                        </template>

                        <template v-if="column.dataIndex === 'product'">
                            <router-link :to="`/san-pham/${record.productName}/${record.productId}`">
                                <h3 class="m-0">
                                    {{ record.productName }}
                                </h3>
                            </router-link>
                            <p>{{ record.variation }}</p>
                        </template>

                        <template v-if="column.dataIndex === 'price'">
                            <p>{{ record.price }} vnd</p>
                        </template>

                        <template v-if="column.dataIndex === 'qty'">
                            <a-input-number :defaultValue="record.qty"
                                @change="(val: any) => updateQty(Number(val), record as ICart)" />
                        </template>

                        <template v-else-if="column.dataIndex === 'action'">
                            <DeleteOutlined @click="_storeCart.removeCartItem(record.id)"
                                class="mx-auto text-xl hover:text-red-500 cursor-pointer duration-150 ease-in-out" />
                        </template>
                    </template>
                </a-table>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">

const q = ref<string>("");

const isSearching = ref<boolean>(false);
const onSearch = () => {
    if (isSearching.value) return;
    if (!q.value) {
        notification.warning({
            message: "Vui lòng không được bỏ trống!"
        })
        return;
    }
};

const columns: any = [
    {
        title: "STT",
        dataIndex: "image",
        align: "center",
    },
    {
        title: "Sản phẩm",
        className: "product",
        dataIndex: "product",
        align: "center",
    },
    {
        title: "Tổng thanh toán",
        dataIndex: "price",
        align: "center",
    },
    {
        title: "Trạng thái",
        dataIndex: "qty",
        align: "center",
    },
    {
        title: "Ngày đặt",
        dataIndex: "qty",
        align: "center",
    }
];

</script>