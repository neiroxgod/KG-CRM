<template>
  <div
    :class="
      task.timefinish
        ? 'flex justify-between mt-2 items-center bg-slate-50 w-full h-16 rounded-md shadow-md p-2'
        : 'flex justify-between mt-2 items-center bg-white w-full h-16 rounded-md shadow-md p-2'
    "
  >
    <div class="flex">
      <Checkbox
        :checked="task.timefinish ? true : false"
        :disabled="true"
        class="rounded-full h-6 w-6"
      />
      <div
        :class="
          task.timefinish
            ? 'text-md ml-2 flex line-through'
            : 'text-md ml-2 flex'
        "
      >
        {{ task.text }}
        <div
          v-if="task.targetUserId"
          class="text-md ml-2 cursor-pointer text-blue-500"
        >
          {{ task.targetUserId }}
        </div>
      </div>
    </div>
    <div class="bg-green-100 p-2 rounded-md text-green-600">
      {{ task.timedeadline }}
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  task: ITasks;
}>();
</script>
