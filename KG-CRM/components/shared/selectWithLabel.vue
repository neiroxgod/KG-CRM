<template>
  <div class="mt-2 w-full">
    <Label v-if="label !== '' && typeof label !== undefined">
      {{ label }}</Label
    >
    <Select class="w-full" v-model="data">
      <SelectTrigger>
        <SelectValue
          :placeholder="
            label !== '' && typeof label !== undefined
              ? label
              : 'Выберите значение'
          "
        />
      </SelectTrigger>
      <SelectContent class="w-full">
        <SelectGroup>
          <SelectLabel>{{ label }}</SelectLabel>
          <SelectItem
            class="mt-1 hover:border-2 box-border hover:border-blue-500 cursor-pointer"
            :style="
              item.accentColor
                ? { 'background-color': `${item.accentColor}` }
                : ''
            "
            v-for="item in items"
            :key="item.id"
            :value="item.id"
          >
            {{ item.caption ? item.caption : item.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  label?: string | "" | undefined;
  modelValue: string | number | undefined; //input
  items: Array<any>;
}>();

const emit = defineEmits(["update:modelValue"]);

const data = useVModel(props, "modelValue", emit);
</script>
