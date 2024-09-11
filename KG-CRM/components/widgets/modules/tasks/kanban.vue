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
            <Dialog>
              <DialogTrigger as-child>
                <Button class="w-full" variant="outline">
                  <Icon class="w-4 h-4" name="material-symbols:add" /> Создать
                  новую задачу</Button
                >
              </DialogTrigger>
              <DialogContent
                class="lg:max-w-[840px] overflow-y-auto sm:max-w-[425px]"
              >
                <DialogHeader>
                  <DialogTitle>Создание задачи</DialogTitle>
                  <DialogDescription>
                    Укажите название задачи, дедлайн и ответственного сотрудника
                  </DialogDescription>
                </DialogHeader>
                <Separator />
                <div class="mt-2 flex flex-wrap gap-4">
                  <SharedInputWithLabel
                    v-model:model-value="newTask.text"
                    placeholder="Например: 'Собрать подписи с родителей.'"
                    label="Название задачи"
                  />
                  <SharedTextareaWithLabel
                    v-model:model-value="newTask.result"
                    placeholder="укажите подробное описание задачи"
                    label="Описание задачи"
                  />
                  <SharedSelectWithLabel
                    :items="taskTypes"
                    v-model:model-value="newTask.taskType"
                    label="Тип задачи"
                  />
                  <SharedSelectWithLabel
                    :items="employers"
                    v-model:model-value="newTask.responsibleUserId"
                    label="Ответственный сотрудник"
                  />
                  <SharedSelectWithLabel
                    :items="users"
                    v-model:model-value="newTask.targetUserId"
                    label="Цель задачи"
                  />

                  <Label> Срок до </Label>
                  <SharedDatePicker
                    v-model:model-value="newTask.timedeadline"
                  />
                </div>
                <Separator />
                <DialogFooter>
                  <Button @click="addTask()" class="bg-btnPrimary">
                    Создать
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
            <div
              v-if="task.usersTasks"
              class="flex align-center items-center gap-1"
            >
              <Icon class="w-4 h-4" name="material-symbols:person-outline" />
              {{ task.usersTasks.length }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <Dialog :open="isDialogOpen" @update:open="isDialogOpen = $event">
      <DialogContent class="lg:max-w-[840px] overflow-y-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать задачу</DialogTitle>
        </DialogHeader>
        <div v-if="editingTask">
          <!-- Форма редактирования задачи -->
          <Separator />
          <div class="mt-2 flex flex-wrap gap-4">
            <SharedInputWithLabel
              v-model:model-value="editingTask.text"
              placeholder="Например: 'Собрать подписи с родителей.'"
              label="Название задачи"
            />
            <SharedTextareaWithLabel
              v-model:model-value="editingTask.result"
              placeholder="укажите подробное описание задачи"
              label="Описание задачи"
            />
            <SharedSelectWithLabel
              :items="taskTypes"
              v-model:model-value="editingTask.taskType"
              label="Тип задачи"
            />
            <SharedSelectWithLabel
              :items="employers"
              v-model:model-value="editingTask.responsibleUserId"
              label="Ответственный сотрудник"
            />
            <SharedSelectWithLabel
              :items="users"
              v-model:model-value="editingTask.targetUserId"
              label="Цель задачи"
            />

            <Label> Срок до </Label>
            <SharedDatePicker v-model:model-value="editingTask.timedeadline" />
          </div>
          <Separator class="mt-5" />

          <Separator class="mt-5" />
        </div>
        <DialogFooter>
          <Button @click="saveEditedTask">Сохранить</Button>
          <Button @click="isDialogOpen = false" variant="secondary"
            >Отмена</Button
          >
        </DialogFooter>
      </DialogContent>
    </Dialog>
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

const emit = defineEmits(["updateTasks"]);

const newTask = ref({
  text: "",
  result: "",
  responsibleUserId: 0,
  targetUserId: 0,
  taskType: 0,
  timedeadline: "",
});
const isDialogOpen = ref(false);
const editingTask = ref<ITasksWithRelations | null>();
const CRM_API_INSTANCE = new CRM_API();
const { toast } = useToast();
const employers = await CRM_API_INSTANCE.employers.getList();
const users = await CRM_API_INSTANCE.users.getList();
console.log(users);

const editTask = async (id: number) => {
  const TaskData = await CRM_API_INSTANCE.tasks.getById(id);

  editingTask.value = TaskData;
  isDialogOpen.value = true;
  console.log(TaskData);
};

const saveEditedTask = async () => {
  if (editingTask.value) {
    await CRM_API_INSTANCE.tasks.update(
      editingTask.value.id,
      editingTask.value
    );
    isDialogOpen.value = false;
    editingTask.value = null;
    // Обновите список задач или выполните другие необходимые действия
    emit("updateTasks");
  }
};

const deleteTask = async (id: number) => {
  await CRM_API_INSTANCE.tasks.delete(id);

  useListStore().removeFromList(id);

  toast({
    description: "Задача удалена!",
    duration: 1000,
  });
};

const addTask = async () => {
  console.log(newTask.value);
  const response = await CRM_API_INSTANCE.tasks.create(newTask.value);
  console.log(response);
  if (response) {
    emit("updateTasks", {
      taskTypeIndex: newTask.value.taskType,
      tasks: response,
    });
  } else {
    console.log("error");
  }
};

// Drag and Drop

let draggedTask: any = null;
let draggedTaskIndex: number = -1;
let draggedTaskType: any = null;
let initialyDragElement: Element | null = null;

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
