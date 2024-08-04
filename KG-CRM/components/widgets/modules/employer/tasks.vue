<template>
  <div class="p-5">
    <div class="flex justify-between items-center">
      <div class="font-xl font-inter px-4 py-2 rounded-md text-textPrimary">
        Найдено:
        <label class="font-bold">{{ tasks.length }}</label>
      </div>
      <Button>Создать задачу</Button>
    </div>

    <div class="bg-slate-100 rounded-md w-full h-fit mt-5 p-5">
      <div
        v-for="task in tasks"
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
              Владислав Петренко
            </div>
          </div>
        </div>
        <div class="bg-green-100 p-2 rounded-md text-green-600">
          {{ task.timedeadline }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const tasks = ref([
  {
    text: "Созвониться с учеником",
    targetUserId: 11,
    timedeadline: "2024-08-31 12:00:00",
  },
  {
    text: "Провестри пробный урок",
    timedeadline: "2024-08-31 12:00:00",
    timefinish: "2024-08-31 12:43:22",
  },
  {
    text: "Купи вкусняшки",
    timedeadline: "2024-08-31 12:00:00",
  },
]);
</script>
