<template>
  <div class="w-full bg-slate-100">
    <div class="flex gap-10 p-5 w-full">
      <div
        v-for="taskType in taskTypes"
        :key="taskType.id"
        class="min-w-72 w-72"
        @dragover.prevent
        @drop="handleDrop(taskType)"
      >
        <div class="sticky top-0 bg-slate-100 pb-2 z-50">
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

            <DropdownMenu>
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                  <span class="sr-only">Открыть меню</span>
                  <MoreVertical class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  :disabled="taskType.accountId === null"
                  @click="editItem(taskType.id)"
                >
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  :disabled="taskType.accountId === null"
                  @click="deleteItem(taskType.id)"
                  class="text-red-500"
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            <Button variant="outline" class="mt-5 w-full gap-2 text-blue-600">
              <Icon class="w-4 h-4" name="material-symbols:add" /> Создать новую
              задачу
            </Button>
          </div>
        </div>

        <div
          v-for="(task, taskIndex) in taskType.tasks"
          :key="task.id"
          class="p-5 mt-5 bg-white h-48 w-full rounded-md border-2"
          draggable="true"
          @dragstart="handleDragStart(task, taskIndex, taskType, $event)"
          @dragend="handleDragEnd"
        >
          <div class="flex justify-between items-center">
            <div class="font-inter text-md font-semibold">
              {{ task.text }}
            </div>

            <DropdownMenu v-if="task.id">
              <DropdownMenuTrigger as-child>
                <Button variant="ghost" class="w-8 h-8 p-0">
                  <span class="sr-only">Открыть меню</span>
                  <MoreVertical class="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem @click="editTask(task.id)">
                  Редактировать
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  @click="deleteTask(task.id)"
                  class="text-red-500"
                >
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
import { MoreVertical } from "lucide-vue-next";

import type { ITaskTypesWithRelations } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";
import { useToast } from "~/components/ui/toast";

const props = defineProps<{
  taskTypes: ITaskTypesWithRelations[];
}>();

let draggedTask: any = null;
let draggedTaskIndex: number = -1;
let draggedTaskType: any = null;
let initialyDragElement: Element | null = null;

const CRM_API_INSTANCE = new CRM_API();
const { toast } = useToast();

const editTask = async (id: number) => {
  console.log(id);
};

const deleteTask = async (id: number) => {
  await CRM_API_INSTANCE.tasks.delete(id);

  useListStore().removeFromList(id);

  toast({
    description: "Задача удалена!",
    duration: 1000,
  });
};

const handleDragStart = (
  task: any,
  taskIndex: number,
  taskType: any,
  event: DragEvent
) => {
  initialyDragElement = event.target as Element;
  draggedTask = task;
  draggedTaskIndex = taskIndex;
  draggedTaskType = taskType;

  // Создаем элемент, который будет двигаться с курсором
  const dragGhost = initialyDragElement.cloneNode(true) as HTMLElement;
  dragGhost.style.position = "absolute";
  dragGhost.style.top = "-9999px";
  dragGhost.style.left = "-9999px";
  dragGhost.style.width = `${initialyDragElement.clientWidth}px`;
  dragGhost.style.height = `${initialyDragElement.clientHeight}px`;
  dragGhost.classList.add("dragging");

  document.body.appendChild(dragGhost);
  event.dataTransfer!.setDragImage(dragGhost, 0, 0);

  setTimeout(() => {
    if (initialyDragElement) initialyDragElement.classList.add("invisible");
  }, 0);
};

const handleDragEnd = (event: DragEvent) => {
  const draggingElement = document.querySelector(".dragging") as HTMLElement;
  if (draggingElement) {
    draggingElement.parentNode?.removeChild(draggingElement);
  }

  // Сбрасываем стили
  if (initialyDragElement) initialyDragElement.classList.remove("invisible");
};

const handleDrop = async (targetTaskType: any) => {
  if (draggedTask && draggedTaskType) {
    // Удаляем задачу из исходного типа задач
    draggedTaskType.tasks.splice(draggedTaskIndex, 1);

    // Добавляем задачу в новый тип задач
    targetTaskType.tasks.push(draggedTask);

    draggedTask.taskType = targetTaskType.id;

    const result = await CRM_API_INSTANCE.tasks.update(
      draggedTask.id,
      draggedTask
    );

    if (result) {
      toast({
        title: "Задача перемещена",
        duration: 1000,
        variant: "success",
      });

      draggedTask = null;
      draggedTaskIndex = -1;
      draggedTaskType = null;
    }
  }

  const draggingElement = document.querySelector(".dragging") as HTMLElement;
  if (draggingElement) {
    draggingElement.parentNode?.removeChild(draggingElement);
  }

  if (initialyDragElement) initialyDragElement.classList.remove("invisible");
};
</script>

<style>
.dragging {
  opacity: 1;
  z-index: 1000;
}

.invisible {
  opacity: 0;
}
</style>
