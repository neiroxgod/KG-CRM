<template>
  <div class="p-5">
    <div class="flex justify-between items-center">
      <div class="font-xl font-inter px-4 py-2 rounded-md text-textPrimary">
        Найдено:
        <label class="font-bold">{{ tasks.length }}</label>
      </div>
      <Sheet>
        <SheetTrigger as-child>
          <Button variant="outline"> Создать </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Создать задачу</SheetTitle>
            <SheetDescription>
              Опишите задачу, выберите ответственного сотрудника и объект задачи
              при необходимости, затем нажмите "Создать"
            </SheetDescription>
          </SheetHeader>
          <div class="my-5">
            <SharedTextareaWithLabel
              v-model:model-value="newTask.text"
              label="Текст задачи"
              placeholder="Например: 'Собрать подписи с родителей.'"
            />
            <SharedSelectWithLabel
              v-model:model-value="newTask.responsibleUserId"
              :items="employers"
              label="Ответственный сотрудник"
            />
            <SharedSelectWithLabel
              v-model:model-value="newTask.targetUserId"
              :items="employers"
              label="Объект задачи"
            />

            <Label> Срок до </Label>
            <SharedDatePicker v-model:model-value="newTask.timedeadline" />
          </div>
          <SheetFooter>
            <SheetClose as-child>
              <Button variant="outline" @click="createTask($event)">
                Создать
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <div class="bg-slate-100 rounded-md w-full h-fit mt-5 p-5">
      <div
        v-if="tasks.length"
        v-for="task in tasks"
        :class="
          task.timefinish
            ? 'flex justify-between mt-2 items-center bg-slate-50 w-full h-16 rounded-md shadow-md p-2'
            : 'flex justify-between mt-2 items-center bg-white w-full h-16 rounded-md shadow-md p-2'
        "
      >
        <div class="flex">
          <Checkbox
            :checked="task.timefinish != '' ? true : false"
            :disabled="task.timefinish ? true : false"
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
      <WidgetsEmptyData v-else label="Упс.. похоже вам везет :-)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITasks } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";
import { toast } from "~/components/ui/toast";

const userStore = useAuthStore();
const tasks = ref();
const route = useRoute();

const CRM_API_INSTANCE = new CRM_API();

const employers = await CRM_API_INSTANCE.employers.getList();
const users = await CRM_API_INSTANCE.users.getList();
tasks.value = await CRM_API_INSTANCE.tasks.getTasksByUserId(
  Number(route.params.id)
);

const newTask = ref<ITasks>({
  text: "",
  responsibleUserId: 0,
  targetUserId: 0,
  taskType: 1,
  result: "",
  timefinish: "",
  timedeadline: "",
});

const createTask = async (event: HTMLElementEventMap["click"]) => {
  event.preventDefault();
  event.stopPropagation();

  const { text, responsibleUserId, timedeadline } = newTask.value;

  if (!text) {
    toast({
      description: "Укажите текст задачи!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  if (!responsibleUserId) {
    toast({
      description: "Укажите ответственного сотрудника!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  if (!timedeadline) {
    toast({
      description: "Укажите дедлайн!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  const createdTask = await CRM_API_INSTANCE.tasks.create({ ...newTask.value });

  if (!createdTask) {
    toast({
      description: "Произошла ошибка при создании задачи!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  tasks.value = [...tasks.value, createdTask];

  toast({
    description: "Задача успешно создана!",
    duration: 2000,
  });

  return createdTask;
};
// const createTask = async function (e) {
//   if (newTask.value.text === "") {
//     e.preventDefault();
//     e.stopPropagation();

//     toast({
//       description: "Укажите текст задачи!",
//       variant: "destructive",
//       duration: 2000,
//     });
//     return;
//   }

//   if (!newTask.value.employerId) {
//     e.preventDefault();
//     e.stopPropagation();
//     toast({
//       description: "Укажите ответственного сотрудника!",
//       variant: "destructive",
//       duration: 2000,
//     });
//     return;
//   }

//   if (!newTask.value.employerId) {
//     e.preventDefault();
//     e.stopPropagation();
//     toast({
//       description: "Укажите дедлайн!",
//       variant: "destructive",
//       duration: 2000,
//     });
//     return;
//   }

//   const fetchApi = useFetchApi(userStore.token);
//   const task = await fetchApi("/tasks/", {
//     method: "POST",
//     body: { ...newTask.value },
//   });
//   toast({
//     description: "Задача успешно создана!",
//     duration: 2000,
//   });
//   console.log(task);
//   return task;
// };
</script>
