<template>
  <div
    :class="
      background +
      ' p-5 shadow-md h-fit rounded-md cursor-pointer hover:shadow-xl transition ease-in-out delay-250'
    "
  >
    <Icon class="h-6 w-6" name="material-symbols:docs-outline" />
    <div class="mt-5">
      <div class="text-xl font-semibold font-inter">
        {{ label }}
      </div>
      <div class="text-sm font-medium text-gray-500 font-inter">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  label: string;
  description: string;
  background: string;
}>();
</script>
