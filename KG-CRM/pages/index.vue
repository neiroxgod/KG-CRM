<script setup>
const layout = ref("default");
const userStore = useAuthStore();
if (!userStore.user && !userStore.isLoading) {
  navigateTo("/employerAuth");
}
</script>

<template>
  <NuxtLayout :name="layout"> </NuxtLayout>
</template>
