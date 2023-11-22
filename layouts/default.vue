<template>
  <a-config-provider >
    <TheHeader />

    <a-layout>
      <div
        class="main_page_content relative z-0 min-h-[700px] bg-white w-full m-auto"
      >
        <slot />
      </div>

      <a-tooltip>
        <template #title>Về đầu trang</template>
        <a-back-top />
      </a-tooltip>
    </a-layout>

    <TheFooter />
  </a-config-provider>
</template>

<script setup lang="ts">
import { syncCart } from "~/stores/cart";

onMounted(() => {
  // sync cart
  syncCart();
});
</script>
