<template>
  <div>
    <div class="w-full p-5 h-[80vh]">
      <div
        class="flex justify-end gap-4 items-center content-center align-middle"
      >
        <!-- ФИЛЬТРЫ задач -->
        <div class="font-inter bg-white dark:bg-slate-950 px-5 py-2 rounded-lg">
          Найдено: {{ listStore.listState.length }}
        </div>

        <Popover>
          <PopoverTrigger as-child>
            <Button variant="outline"
              ><Icon class="h-5 w-5" name="material-symbols:settings"></Icon
            ></Button>
          </PopoverTrigger>
          <PopoverContent class="w-full">
            <div class="text-2xl font-inter">Фильтры</div>
            <div
              class="mt-2 text-sm font-inter w-3/4 font-light dark:font-thin"
            >
              Настройте фильтры как вам удобно, если захотите сбросить фильтр
              нажмите на кнопку сброса внизу.
            </div>
            <Separator orientation="horizontal" class="mt-2" />
            <div class="flex gap-2 p-2">
              <SharedSelectWithLabel
                v-if="usersWithoutRelations"
                v-model:model-value="filters.responsibleUserId"
                label="Ответственный сотрудник"
                :items="usersWithoutRelations"
              />

              <SharedSelectWithLabel
                v-if="usersWithoutRelations"
                v-model:model-value="filters.userId"
                label="Создал задачу"
                :items="usersWithoutRelations"
              />
            </div>
            <div class="flex gap-2 p-2">
              <SharedSelectWithLabel
                v-if="usersWithoutRelations"
                v-model:model-value="filters.targetUserId"
                label="Объект задачи"
                :items="usersWithoutRelations"
              />

              <SharedSelectWithLabel
                v-if="taskTypes"
                v-model:model-value="filters.taskType"
                label="Тип задачи"
                :items="taskTypes"
              />
            </div>
            <div class="flex gap-2 p-2">
              <SharedSelectWithLabel
                v-if="taskTypes"
                v-model:model-value="filters.status"
                label="Статус задачи"
                :items="statuses"
              />
            </div>
            <div class="flex justify-end p-2">
              <Button @click="resetFilters" variant="outline">Сбросить</Button>
            </div>
          </PopoverContent>
        </Popover>
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

      <WidgetsModulesTasksList :tasks="listStore.listState" />
      <div class="flex justify-end mt-2">
        <WidgetsPagination
          @change-page="handlePageChange"
          :total-items="totalCount"
          :current-page="currentPage"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CRM_API } from "~/composables/getList";
import type { ITasks, ITasksWithRelations } from "~/composables/interfaces";
import { useToast } from "~/components/ui/toast";

const CRM_API_INSTANCE = new CRM_API();
const users = ref<IIdentityWithRelations[]>();
const usersWithoutRelations = ref<IUser[]>();
const taskTypes = reactive<ITaskTypesWithRelations[]>([]);
const listStore = useListStore();
const allTasks = ref<ITasksWithRelations[]>([]);
const filters = ref({
  userId: 0,
  responsibleUserId: 0,
  targetUserId: 0,
  taskType: 0,
  status: "",
});

const statuses = [
  {
    id: 1,
    name: "В работе",
  },
  {
    id: 2,
    name: "Завершено",
  },
  {
    id: 3,
    name: "Просрочено",
  },
];

const { toast } = useToast();

watch(
  filters,
  () => {
    reloadTasks();
  },
  { deep: true }
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

const totalPages = ref(0);
const currentPage = ref(1);
const totalCount = ref(0);

const handlePageChange = (page: number) => {
  currentPage.value = page;

  reloadTasks();
};

const reloadTasks = async () => {
  const data = await CRM_API_INSTANCE.tasks.getList(
    currentPage.value,
    5,
    filters.value
  );
  totalPages.value = data.totalPages;
  totalCount.value = data.totalCount;
  listStore.listState = [...data.tasks];
};

const resetFilters = () => {
  filters.value = {
    userId: 0,
    responsibleUserId: 0,
    targetUserId: 0,
    taskType: 0,
    status: "",
  };
};

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

  listStore.listState = [...allTasks.value.tasks];
  currentPage.value = allTasks.value.currentPage;
  totalPages.value = allTasks.value.totalPages;
  totalCount.value = allTasks.value.totalCount;

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
</script>
