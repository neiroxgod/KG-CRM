<template>
  <div>
    <Toaster />
    <!-- Loader -->
    <SharedNuxtLoadingBar v-if="userStore.loading" />
    <!-- App -->

    <div v-else-if="userStore.user" class="flex">
      <div class="w-[280px]">
        <NuxtLayout name="sidebar" />
      </div>
      <div class="flex-col w-full">
        <div class="navbar">
          <NuxtLayout name="navbar" />
        </div>
        <div class="content">
          <NuxtPage />
        </div>
      </div>
    </div>

    <!-- Auth page -->
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
import Toaster from "./components/ui/toast/Toaster.vue";

const { initAuth } = useAuth();
const userStore = useAuthStore();

userStore.loadFromLocalStorage();

onBeforeMount(() => {
  initAuth();
});
</script>
