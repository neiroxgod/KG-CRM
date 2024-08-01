<template>
  <div class="mt-2 w-full">
    <Label>{{ label }}</Label>
    <Textarea v-model="data" class="w-full"> {{ placeholder }} </Textarea>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";
import Textarea from "../ui/textarea/Textarea.vue";

const props = defineProps<{
  label: string;
  modelValue: string; //input
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
