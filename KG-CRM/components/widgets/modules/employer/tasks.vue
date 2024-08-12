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
              v-model:model-value="newTask.employerId"
              :items="employers"
              label="Ответственный сотрудник"
            />
            <SharedSelectWithLabel
              v-model:model-value="newTask.targetUserId"
              :items="users"
              label="Ученик (опционально)"
            />

            <SharedSelectWithLabel
              v-model="newTask.targetEmployerId"
              :items="employers"
              label="Сотрудник (опционально)"
            />

            <Label> Срок до </Label>
            <SharedDatePicker v-model:model-value="newTask.timedeadline" />
          </div>
          <SheetFooter>
            <SheetClose as-child>
              <Button @click="createTask($event)"> Создать </Button>
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
      <WidgetsEmptyData v-else label="Упс.. похоже вам везет :-)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITasks } from "~/composables/interfaces";
import { getList } from "~/composables/getList";
import { toast } from "~/components/ui/toast";

const userStore = useAuthStore();
const tasks = ref<[ITasks]>();
const employers = await new getList().employers();
const users = await new getList().users();
tasks.value = await new getList().tasks();

const newTask = ref<ITasks>({
  text: "",
  employerId: 0,
  targetEmployerId: 0,
  targetUserId: 0,
  result: "",
  timefinish: "",
  timedeadline: "",
});

const createTask = async function (e) {
  if (newTask.value.text === "") {
    e.preventDefault();
    e.stopPropagation();

    toast({
      description: "Укажите текст задачи!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  if (!newTask.value.employerId) {
    e.preventDefault();
    e.stopPropagation();
    toast({
      description: "Укажите ответственного сотрудника!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  if (!newTask.value.employerId) {
    e.preventDefault();
    e.stopPropagation();
    toast({
      description: "Укажите дедлайн!",
      variant: "destructive",
      duration: 2000,
    });
    return;
  }

  const fetchApi = useFetchApi(userStore.token);
  const task = await fetchApi("/tasks/", {
    method: "POST",
    body: { ...newTask.value },
  });
  toast({
    description: "Задача успешно создана!",
    duration: 2000,
  });
  console.log(task);
  return task;
};
</script>
