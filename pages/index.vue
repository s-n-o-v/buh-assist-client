<script setup lang="ts">
definePageMeta({ middleware: "auth" });
useHead({
  title: "Dashboard",
});
</script>

<template>
  <div class="card">
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <hr />
    <button class="p-button p-button-sm">Test</button>
  </div>
</template>