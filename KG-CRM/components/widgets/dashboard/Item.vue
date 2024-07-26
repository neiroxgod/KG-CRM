<template>
  <div class="h-32 w-full rounded-xl p-5 shadow-md">
    <div class="flex items-center mb-2">
      <Icon class="mr-1 h-5 w-5 bg-slate-400" :name="icon" />
      <Label class="text-slate-700 font-inter font-medium">{{ label }}</Label>
    </div>
    <slot />
  </div>
</template>
<script setup>
const props = defineProps({
  icon: String,
  label: String,
});
</script>
