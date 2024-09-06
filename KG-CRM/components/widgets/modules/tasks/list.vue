<template>
  <div
    v-for="task in tasks"
    :key="task.id"
    class="border-2 mt-2 w-full rounded-md bg-white hover:bg-slate-50 transition-all duration-300"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <div class="w-16 mx-5 p-2 text-center font-inter text-slate-600">
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

        <Separator class="mx-5 h-16 w-px bg-slate-200" orientation="vertical" />
        <div>
          <div class="flex align-center items-center gap-2">
            <Icon name="material-symbols:timer-outline" class="" />
            {{
              new Intl.DateTimeFormat("ru-RU", {
                hour: "2-digit",
                minute: "2-digit",
              }).format(new Date(task.timedeadline))
            }}
          </div>
          <div class="flex align-center items-center gap-2">
            <Icon name="material-symbols:person-outline" class="" />
            {{ task.user.name }}
          </div>
        </div>
        <Separator class="mx-5 h-16 w-px bg-slate-200" orientation="vertical" />
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
      <div class="mr-5">
        <Button @click="toggleTask(task.id as number)" variant="outline"
          >Редактировать</Button
        >
      </div>
    </div>
    <div v-show="openTaskId === task.id" class="flex flex-col gap-2 p-2">
      <SharedTextareaWithLabel
        v-model:model-value="task.text"
        label="Текст задачи"
        placeholder="Например: 'Собрать подписи с родителей.'"
      />

      <SharedTextareaWithLabel
        v-model:model-value="task.result"
        label="Результат выполнения"
        placeholder="Например: 'Собрал подписи с родителей.'"
      />

      <SharedSelectWithLabel
        v-if="usersWithoutRelations"
        v-model:model-value="task.user.id"
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
      <Label> Срок до </Label>
      <SharedDatePicker v-model:model-value="task.timedeadline" />
      <!-- Добавьте другие поля для редактирования -->
      <Button @click="saveTask(task.id)">Сохранить</Button>
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
