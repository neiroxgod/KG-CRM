<template>
  <Button class="bg-btnPrimary flex content-center align-center items-center">
    <Icon class="w-5 h-5 mr-1" name="material-symbols:add" />
    <span class="font-inter font-medium">Добавить</span>
  </Button>
</template>

<script setup>
defineProps({
  label: String,
});
</script>
