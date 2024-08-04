<template>
  <div class="flex justify-center items-center">
    <div class="mt-5">
      <NuxtImg class="w-32 mx-auto" src="empty-box.png" />
      <div class="font-bold font-inter text-xl mt-2">
        {{ label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label: string;
}>();
</script>
