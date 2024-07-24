<template>
  <div>
    <!-- Loader -->
    <SharedNuxtLoadingBar v-if="userStore.loading" />
    <!-- App -->
    <div v-else-if="userStore.user" class="grid grid-cols-6">
      <div class="col-start-1 row-span-2 relative">
        <NuxtLayout name="sidebar" />
      </div>

      <div class="col-start-2 row-span-1 col-span-2 col-end-7 navbar">
        <NuxtLayout name="navbar" />
      </div>

      <div class="col-start-2 row-span-2 col-end-7 col-span-2 content">
        <NuxtPage />
      </div>
    </div>

    <!-- Auth page -->
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
const { initAuth } = useAuth();
const userStore = useAuthStore();

onBeforeMount(() => {
  initAuth();
});
</script>
