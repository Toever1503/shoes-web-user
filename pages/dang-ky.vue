<template>

    dang ky page - {{doubleValue}}
    <br>

    <a-button type="primary" @click="increase">increase</a-button>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/counter'

const storeCounter = useCounterStore()

const increase = () =>  storeCounter.increment();
// ✅ this one will be reactive
// 💡 but you could also just use `store.doubleCount` directly
const doubleValue = computed(() => storeCounter.doubleCount)
onMounted(() => {

    console.log("signup page mounted: ", storeCounter);
});
</script>