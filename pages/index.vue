<template>
  <div>
    <h1 class="text-5xl text-red-200">homepage</h1>

    <a-button type="primary" @click="handleMessage">click me</a-button>
  </div>
</template>

<script lang="ts" setup>


const handleMessage = () => {
  message.info("This is a normal message");
}
</script>