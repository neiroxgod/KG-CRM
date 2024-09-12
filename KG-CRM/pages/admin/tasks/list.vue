<template>
  <div>
    <div class="w-full p-5 h-[80vh]">
      <div
        class="flex justify-between items-center content-center align-middle"
      >
        <div class="flex gap-5 w-2/4">
          <SharedSelectWithLabel
            v-if="usersWithoutRelations"
            v-model:model-value="filters.userId"
            label="Ответственный сотрудник"
            :items="usersWithoutRelations"
          />

          <SharedSelectWithLabel
            v-if="taskTypes"
            v-model:model-value="filters.taskType"
            label="Тип задачи"
            :items="taskTypes"
          />
        </div>
        <div class="action">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline"> Создать </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Создать задачу</SheetTitle>
                <SheetDescription>
                  Опишите задачу, выберите ответственного сотрудника и объект
                  задачи при необходимости, затем нажмите "Создать"
                </SheetDescription>
              </SheetHeader>
              <div class="my-5" v-if="usersWithoutRelations">
                <SharedTextareaWithLabel
                  v-model:model-value="newTask.text"
                  label="Текст задачи"
                  placeholder="Например: 'Собрать подписи с родителей.'"
                />

                <SharedSelectWithLabel
                  v-if="taskTypes"
                  v-model:model-value="newTask.taskType"
                  :items="taskTypes"
                  label="Тип задачи"
                />

                <SharedSelectWithLabel
                  v-model:model-value="newTask.responsibleUserId"
                  :items="usersWithoutRelations"
                  label="Ответственный сотрудник"
                />

                <SharedSelectWithLabel
                  v-model:model-value="newTask.targetUserId"
                  :items="usersWithoutRelations"
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
      </div>

      <WidgetsModulesTasksList :tasks="listStore.listState" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CRM_API } from "~/composables/getList";
import type { ITasksWithRelations } from "~/composables/interfaces";
import { useToast } from "~/components/ui/toast";
const CRM_API_INSTANCE = new CRM_API();
const users = ref<IIdentityWithRelations[]>();
const usersWithoutRelations = ref<IUser[]>();
const taskTypes = reactive<ITaskTypesWithRelations[]>([]);
const listStore = useListStore();
const allTasks = ref<ITasksWithRelations[]>([]);
const filters = ref({
  userId: 0,
  taskType: 0,
});

const { toast } = useToast();

const newTask = ref<ITasks>({
  text: "",
  responsibleUserId: 0,
  targetUserId: 0,
  taskType: 1,
  result: "",
  timefinish: "",
  timedeadline: "",
});

const updateTasksTypes = ({
  taskTypeIndex,
  tasks,
}: {
  taskTypeIndex: number;
  tasks: ITasksWithRelations[];
}) => {
  // Найдем индекс нужного taskType
  const index = taskTypes.findIndex(
    (taskType) => taskType.id === taskTypeIndex
  );

  if (index !== -1) {
    // Создаем новый массив задач, объединяя существующие и новые
    const updatedTasks = [
      ...taskTypes[index].tasks,
      ...(Array.isArray(tasks) ? tasks : [tasks]),
    ];

    // Обновляем элемент, сохраняя существующие задачи и добавляя новые
    taskTypes[index] = {
      ...taskTypes[index],
      tasks: updatedTasks,
    };
  }
};

onMounted(async () => {
  allTasks.value =
    (await CRM_API_INSTANCE.tasks.getList()) as ITasksWithRelations[];

  listStore.listState = [...allTasks.value];

  users.value = (await CRM_API_INSTANCE.employers.getList(
    true
  )) as IIdentityWithRelations[];
  usersWithoutRelations.value = users.value.map(
    (user: IIdentityWithRelations) => user.user
  );

  taskTypes.splice(
    0,
    taskTypes.length,
    ...(await CRM_API_INSTANCE.tasks.getAllTaskTypes())
  );
});

const createTask = async (event: HTMLElementEventMap["click"]) => {
  event.preventDefault();
  event.stopPropagation();

  if (!newTask.value) return;
  const createdTask = await CRM_API_INSTANCE.tasks.create({ ...newTask.value });

  if (createdTask) {
    users.value = (await CRM_API_INSTANCE.employers.getList(
      true
    )) as IIdentityWithRelations[];
  }

  toast({
    title: "Задача создана",
    duration: 2000,
    variant: "success",
  });

  listStore.listState = [...listStore.listState, createdTask];
};

watch(
  () => filters.value.taskType,
  (value) => {
    if (value) {
      // Фильтруем исходный массив allTasks
      listStore.listState = allTasks.value.filter(
        (task) => task.taskType === value
      );
    } else {
      // Если фильтр сброшен, возвращаем все задачи
      listStore.listState = [...allTasks.value];
    }
  }
);

watch(
  () => filters.value.userId,
  (value) => {
    if (value) {
      // Фильтруем исходный массив allTasks
      listStore.listState = allTasks.value.filter(
        (task) => task.responsibleUserId === value
      );
    } else {
      // Если фильтр сброшен, возвращаем все задачи
      listStore.listState = [...allTasks.value];
    }
  }
);
</script>
