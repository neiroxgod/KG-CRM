<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Дедлайн" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus />
    </PopoverContent>
  </Popover>
</template>

<script lang="ts" setup>
import { Calendar as CalendarIcon } from "lucide-vue-next";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "~/lib/utils";

const props = defineProps<{
  modelValue: string; //datepicker
}>();

const emit = defineEmits(["update:modelValue"]);

const value = ref<DateValue>();

watch(
  () => value.value,
  function (newValue) {
    console.log(value.value?.toString());
    emit("update:modelValue", value.value?.toDate("UTC"));
  }
);
const df = new DateFormatter("ru-RU", {
  dateStyle: "full",
  timeStyle: "short",
});
</script>
