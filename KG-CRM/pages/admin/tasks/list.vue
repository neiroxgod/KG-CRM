<template>
  <div>
    <div class="w-full p-5 h-[80vh]">
      <!-- shadcn-tabs -->
      <Tabs default-value="list" class="w-full">
        <TabsList class="gap-10">
          <TabsTrigger value="list">Список</TabsTrigger>
          <TabsTrigger value="kanban">Доска</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <keep-alive>
            <div class="flex justify-between">
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
                        Опишите задачу, выберите ответственного сотрудника и
                        объект задачи при необходимости, затем нажмите "Создать"
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
                      <SharedDatePicker
                        v-model:model-value="newTask.timedeadline"
                      />
                    </div>
                    <SheetFooter>
                      <SheetClose as-child>
                        <Button @click="createTask($event)"> Создать </Button>
                      </SheetClose>
                    </SheetFooter>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </keep-alive>

          <WidgetsModulesTasksList :tasks="listStore.listState" />
        </TabsContent>
        <TabsContent value="kanban">
          <div class="flex justify-end mb-5">
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline"> Создать тип </Button>
              </DialogTrigger>
              <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Создание типа задач</DialogTitle>
                  <DialogDescription>
                    Укажите название типа задачи, а так же акцентный цвет задачи
                  </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4 py-4">
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="name" class="text-right"> Название </Label>
                    <Input id="name" value="Pedro Duarte" class="col-span-3" />
                  </div>
                  <div class="grid grid-cols-4 items-center gap-4">
                    <Label for="username" class="text-right"> Цвет </Label>
                    <Input id="username" value="@peduarte" class="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit"> Save changes </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <WidgetsModulesTasksKanban
            class="overflow-auto h-[80vh]"
            v-if="taskTypes"
            @update-tasks="updateTasks($event)"
            :task-types="taskTypes"
          />
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CRM_API } from "~/composables/getList";
import type { ITasksWithRelations } from "~/composables/interfaces";
const CRM_API_INSTANCE = new CRM_API();
const users = ref<IIdentityWithRelations[]>();
const usersWithoutRelations = ref<IUser[]>();
const taskTypes = reactive<ITaskTypesWithRelations[]>([]);
const listStore = useListStore();
const filters = ref({
  userId: 0,
  taskType: 0,
});

const newTask = ref<ITasks>({
  text: "",
  responsibleUserId: 0,
  targetUserId: 0,
  taskType: 1,
  result: "",
  timefinish: "",
  timedeadline: "",
});

const updateTasks = ({
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
  listStore.listState =
    (await CRM_API_INSTANCE.tasks.getList()) as ITasksWithRelations[];
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
};
</script>
