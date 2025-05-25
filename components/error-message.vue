<script setup lang="ts">
interface Props {
  list: any;
  type: string;
}
const props = defineProps<Props>();
</script>

<template>
  <small class="text-red-500">
    {{ props.list[props.type] }}
  </small>
</template>
