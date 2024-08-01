<template>
  <div class="mt-2 w-full">
    <Label class="text-sm font-inter font-bold">{{ label }}</Label>
    <Input v-model="data" :placeholder="placeholder" />
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  label: string;
  modelValue: string; //input
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
