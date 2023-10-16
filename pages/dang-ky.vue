<template>
  dang ky page - {{ storeCounter }}
  <br />

  <a-button type="primary" @click="increase">increase</a-button>
</template>

<script setup lang="ts">
import { useCartStore, ICartState } from "/stores/cart";

const storeCounter = useCartStore();

const increase = () => storeCounter.increment();
// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
onMounted(() => {
  storeCounter.addToCart({
    id: 1,
    qty: 5,
    anh: "test",
    productId: 1,
    productName: "hello",
    price: 5000,
    variation: 1,
  });
  console.log("signup page mounted: ", storeCounter);
});
</script>
