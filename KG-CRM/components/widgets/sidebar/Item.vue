<template>
  <div class="w-full text-white hover:bg-violet-600 cursor-pointer">
    <nuxt-link :to="routerLink">
      <div
        class="flex content-middle items-center px-5 py-3 font-inter text-sm"
      >
        <Icon
          class="h-[24px] w-[24px] mr-2"
          v-if="icon"
          :id="icon"
          :name="icon"
        />
        <Label :for="icon">
          <slot />
        </Label>
      </div>
    </nuxt-link>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  routerLink: string;
  icon?: string;
}>();
</script>
