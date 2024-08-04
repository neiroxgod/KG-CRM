<template>
  <div class="mt-2 w-full">
    <Label>{{ label }}</Label>
    <Select class="w-full" v-model="data">
      <SelectTrigger>
        <SelectValue :placeholder="label" />
      </SelectTrigger>
      <SelectContent class="w-full">
        <SelectGroup>
          <SelectLabel>{{ label }}</SelectLabel>
          <SelectItem v-for="item in items" :key="item.id" :value="item.id">
            {{ item.caption }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  label: string;
  modelValue: string; //input
  items: Array<any>;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
