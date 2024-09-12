<template>
  <div
    class="w-full text-slate-600 dark:text-white hover:bg-Primary/10 hover:border-l-4 hover:border-btnPrimary cursor-pointer"
    :class="{
      'flex items-center': userStore.menuState,
      'justify-center': !userStore.menuState,
    }"
  >
    <nuxt-link :to="routerLink">
      <div class="flex w-full items-center px-5 py-3 font-inter text-sm">
        <Icon class="h-[24px] w-[24px]" v-if="icon" :id="icon" :name="icon" />
        <Label v-if="userStore.menuState" :for="icon" class="ml-2">
          <slot />
        </Label>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const userStore = useAuthStore();
const props = defineProps<{
  routerLink: string;
  icon?: string;
}>();
</script>
