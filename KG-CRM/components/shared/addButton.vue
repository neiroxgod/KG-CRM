<template>
  <Button class="bg-btnPrimary flex content-center align-center items-center">
    <Icon class="w-5 h-5 mr-1" v-if="icon" :name="icon" />
    <span class="font-inter font-medium">{{ label }}</span>
  </Button>
</template>

<script setup lang="ts">
interface ButtonProps {
  label?: string | undefined | null;
  icon?: string | undefined | null;
}

const props = withDefaults(defineProps<ButtonProps>(), {
  label: "Добавить",
  icon: "material-symbols:add",
});
</script>
