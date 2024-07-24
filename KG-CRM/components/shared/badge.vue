<template>
  <div
    :class="
      state == 'positive'
        ? 'bg-green-300 flex h-3 w-3 rounded'
        : 'bg-red-300 flex h-3 w-3 rounded'
    "
  >
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  state: String, // Positive [light green] / Negative [light red]
});
</script>
