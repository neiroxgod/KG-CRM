<template>
  <div>
    <NuxtLoadingIndicator />
    <Toaster />
    <!-- Loader -->
    <SharedNuxtLoadingBar v-if="userStore.loading" />
    <!-- App -->

    <div v-else-if="userStore.user">
      <div class="z-10 fixed top-0 left-0 right-0 h-[58px] w-full">
        <NuxtLayout name="navbar" />
      </div>

      <div class="flex mt-[58px]">
        <div
          class="fixed shadow-md left-0 h-screen transition-width duration-300"
          :style="{ width: userStore.menuState ? '280px' : '65px' }"
        >
          <NuxtLayout name="sidebar" />
        </div>

        <div
          class="bg-slate-100 dark:bg-slate-800 w-full min-h-screen"
          :style="{ 'margin-left': userStore.menuState ? '280px' : '65px' }"
        >
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
