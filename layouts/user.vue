<template>

    <div>
        user view
    </div>
</template>

<script setup lang="ts">
import { syncCart } from "~/stores/cart";

onMounted(() =>{

  // sync cart
  syncCart();
});
</script>