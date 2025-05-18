<script setup lang="ts">
definePageMeta({ middleware: "auth" });
useHead({
  title: "Dashboard",
});

// const { data } = await useFetch('/api/auth/profile');
// console.log('data', data);
</script>

<template>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <hr />
  <button class="p-button p-button-sm">Test</button>
</template>