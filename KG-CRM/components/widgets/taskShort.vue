<template>
  <div
    class="mt-2 bg-white flex items-center justify-between px-2 py-2 rounded-md"
  >
    <div class="text-md font-inter font-medium">
      {{ taskText }}
    </div>
    <div
      class="text-sm font-inter font-medium p-2 bg-Danger rounded-xl text-white"
    >
      {{ taskDeadline }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  taskText: string;
  taskDeadline: string;
}>();
</script>
