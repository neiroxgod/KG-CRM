<template>
  <div
    v-for="task in tasks"
    :key="task.id"
    class="border-2 mt-2 w-full rounded-md bg-white dark:bg-slate-900 dark:border-slate-600 transition-all duration-300"
  >
    <div
      @dblclick="toggleTask(task.id as number)"
      class="cursor-pointer"
      v-if="task.timedeadline"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <div
            class="w-32 mx-5 p-2 text-center font-inter text-slate-600 dark:text-white"
          >
            <div class="text-md font-light">
              {{
                new Date(task.timedeadline).toLocaleString("ru-RU", {
                  weekday: "long",
                })
              }}
            </div>
            <div class="text-xl font-medium">
              {{ new Date(task.timedeadline).getDate() }}
            </div>
            <div class="text-sm font-light">
              {{
                new Date(task.timedeadline).toLocaleString("ru-RU", {
                  month: "short",
                })
              }}
            </div>
          </div>

          <Separator
            class="mx-5 h-16 w-px bg-slate-200"
            orientation="vertical"
          />
          <div>
            <div
              v-if="task.timedeadline"
              class="flex align-center items-center gap-2"
            >
              <Icon name="material-symbols:timer-outline" class="" />
              {{
                new Intl.DateTimeFormat("ru-RU", {
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(task.timedeadline))
              }}
            </div>
            <div class="flex w-28 align-center items-center gap-2">
              <Icon name="material-symbols:person-outline" class="" />
              {{ task.usersTasks[0].user.name }}
            </div>
          </div>
          <Separator
            class="mx-5 h-16 w-px bg-slate-200"
            orientation="vertical"
          />
          <div class="text-md font-medium ml-5" v-if="task.taskTypeObj">
            <div>{{ task.text }}</div>
            <div
              class="text-md font-light font-inter"
              :style="{
                color: `${task.taskTypeObj.accentColor}`,
              }"
            >
              {{ task.taskTypeObj.caption }}
            </div>
          </div>
        </div>
        <div class="mr-5 flex gap-2">
          <Badge
            v-if="task.result"
            class="px-5 rounded-md font-inter text-white bg-lime-500 dark:text-white dark:bg-green-400"
          >
            Закрыта
          </Badge>
          <Badge
            v-else-if="task.timedeadline && !task.result"
            class="px-5"
            :class="{
              'font-inter rounded-md text-white bg-red-400 dark:text-white dark:bg-red-600':
                new Date(task.timedeadline) <
                new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              'font-inter rounded-md text-white bg-yellow-500 dark:text-white dark:bg-yellow-500':
                new Date(task.timedeadline) >
                new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
              'font-inter rounded-md text-white bg-green-400 dark:text-white dark:bg-green-400':
                new Date(task.timedeadline) >
                new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }"
          >
            {{
              new Date(task.timedeadline) <
              new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
                ? "Уже просрочена"
                : new Date(task.timedeadline) <
                    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                  ? "Осталось менее 7 дней"
                  : "До дедлайна более 7 дней"
            }}
          </Badge>

          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" class="w-8 h-8 p-0">
                <span class="sr-only">Открыть меню</span>
                <Icon class="h-4 w-4" name="material-symbols:more-vert" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="toggleTask(task.id as number)"
                >Редактировать</DropdownMenuItem
              >
              <DropdownMenuSeparator />
              <DropdownMenuItem
                @click="deleteTask(task.id as number)"
                class="text-red-500"
                >Удалить</DropdownMenuItem
              >
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div v-show="openTaskId === task.id" class="p-2">
        <SharedInputWithLabel
          v-model:model-value="task.text"
          label="Текст задачи"
          placeholder="Например: 'Собрать подписи с родителей.'"
        />

        <SharedTextareaWithLabel
          v-model:model-value="task.result"
          label="Результат выполнения"
          placeholder="Например: 'Собрал подписи с родителей.'"
        />
        <div class="flex gap-2 lg:flex-nowrap flex-wrap">
          <SharedSelectWithLabel
            v-if="usersWithoutRelations"
            v-model:model-value="task.usersTasks[0].user.id"
            :items="usersWithoutRelations"
            label="Ответственный сотрудник"
          />

          <SharedSelectWithLabel
            v-if="taskTypes"
            v-model:model-value="task.taskType"
            :items="taskTypes"
            label="Тип задачи"
          />

          <SharedSelectWithLabel
            v-if="usersWithoutRelations"
            v-model:model-value="task.targetUserId"
            :items="usersWithoutRelations"
            label="Объект задачи"
          />
          <div class="w-full mt-2">
            <Label class=""> Срок до </Label>
            <SharedDatePicker v-model:model-value="task.timedeadline" />
          </div>
        </div>

        <!-- Добавьте другие поля для редактирования -->
        <Button class="w-full mt-2" variant="outline" @click="saveTask(task.id)"
          >Сохранить</Button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITasksWithRelations } from "~/composables/interfaces";
import { ref } from "vue";
import { CRM_API } from "~/composables/getList";
import { useToast } from "~/components/ui/toast";

const listStore = useListStore();
const CRM_API_INSTANCE = new CRM_API();
const users = ref<IIdentityWithRelations[]>();
const usersWithoutRelations = ref<IUser[]>();
const taskTypes = ref<ITaskTypes[]>();
const { toast } = useToast();
const props = defineProps<{
  tasks: ITasksWithRelations[];
}>();

const openTaskId = ref<number | null>(null);

const deleteTask = async (taskId: number) => {
  await CRM_API_INSTANCE.tasks.delete(taskId);
  listStore.removeFromList(taskId);

  toast({
    title: "Задача удалена",
    duration: 2000,
    variant: "success",
  });
};

const toggleTask = (id: number) => {
  openTaskId.value = openTaskId.value === id ? null : id;
};

const saveTask = async (taskId: number) => {
  const taskToUpdate = props.tasks.find((task) => task.id === taskId);

  if (taskToUpdate) {
    taskToUpdate.responsibleUserId = taskToUpdate.user.id;
    console.log(taskToUpdate);
    openTaskId.value = null;
    await CRM_API_INSTANCE.tasks.update(
      taskToUpdate.id as number,
      taskToUpdate
    );

    toast({
      title: "Задача обновлена",
      duration: 2000,
      variant: "success",
    });

    listStore.updateList(taskToUpdate);
  }
};

onMounted(async () => {
  console.log(props.tasks);
  users.value = (await CRM_API_INSTANCE.employers.getList(
    true
  )) as IIdentityWithRelations[];
  usersWithoutRelations.value = users.value.map(
    (user: IIdentityWithRelations) => user.user
  );
  taskTypes.value =
    (await CRM_API_INSTANCE.tasks.getAllTaskTypes()) as ITaskTypes[];
});
</script>
