<template>
  <div class="w-full h-[85vh] overflow-auto bg-slate-100">
    <div class="flex gap-10 p-5 w-full">
      <div
        v-for="taskType in taskTypes"
        :key="taskType.id"
        class="w-fit min-w-64"
        @dragover.prevent
        @drop="handleDrop(taskType)"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <div
              :style="{ backgroundColor: taskType.accentColor }"
              class="h-2 w-2 rounded-full"
            ></div>
            <div class="font-inter text-md font-semibold">
              {{ taskType.caption }}
            </div>
          </div>

          <Icon
            class="w-4 h-4 cursor-pointer"
            name="material-symbols:more-vert"
          />
        </div>

        <div>
          <Button variant="outline" class="mt-5 w-full gap-2 text-blue-600">
            <Icon class="w-4 h-4" name="material-symbols:add" /> Создать новую
            задачу
          </Button>
        </div>

        <div
          v-for="(task, taskIndex) in taskType.tasks"
          :key="task.id"
          class="p-5 mt-5 bg-white h-48 w-full rounded-md border-2"
          draggable="true"
          @dragstart="handleDragStart(task, taskIndex, taskType)"
        >
          <div class="flex justify-between items-center">
            <div class="font-inter text-md font-semibold">
              {{ task.text }}
            </div>
            <Icon
              class="w-4 h-4 cursor-pointer"
              name="material-symbols:more-vert"
            />
          </div>

          <div class="text-sm mt-2 font-light font-inter">
            Очень длинное описание задачи, ну что поделать не знаю даже..
          </div>

          <Separator class="my-5 h-px w-full bg-slate-200" />

          <div class="flex justify-between text-sm font-inter font-light">
            <div>
              <Badge
                :variant="
                  new Date(task.timedeadline) < new Date()
                    ? 'destructive'
                    : new Date(task.timedeadline) >
                        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                      ? 'secondary'
                      : 'default'
                "
              >
                {{
                  new Intl.DateTimeFormat("ru-RU", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date(task.timedeadline))
                }}
              </Badge>
            </div>
            <div class="flex align-center items-center gap-1">
              <Icon class="w-4 h-4" name="material-symbols:person-outline" />
              {{ task.usersTasks.length }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITaskTypesWithRelations } from "~/composables/interfaces";

const props = defineProps<{
  taskTypes: ITaskTypesWithRelations[];
}>();

let draggedTask: any = null;
let draggedTaskIndex: number = -1;
let draggedTaskType: any = null;

const handleDragStart = (task: any, taskIndex: number, taskType: any) => {
  draggedTask = task;
  draggedTaskIndex = taskIndex;
  draggedTaskType = taskType;
};

const handleDrop = (targetTaskType: any) => {
  if (draggedTask && draggedTaskType) {
    // Удаляем задачу из исходного типа задач
    draggedTaskType.tasks.splice(draggedTaskIndex, 1);

    // Добавляем задачу в новый тип задач
    targetTaskType.tasks.push(draggedTask);

    // Обновляем данные на сервере (реализуйте свою логику)
    // ...

    // Сбрасываем переменные
    draggedTask = null;
    draggedTaskIndex = -1;
    draggedTaskType = null;
  }
};

onMounted(async () => {
  console.log(props.taskTypes);
});
</script>
