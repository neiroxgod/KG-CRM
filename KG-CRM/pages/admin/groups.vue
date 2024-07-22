<template>
  <div class="text-3xl">
    {{ route.path }}
  </div>
</template>

<script lang="ts" setup>
const route = useRoute();
console.log(route);
</script>

<style></style>
