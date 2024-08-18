<template>
  <div>
    <div class="flex justify-end p-5">
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
          <div class="my-5" v-if="users && newTask">
            <SharedTextareaWithLabel
              v-model:model-value="newTask.text"
              label="Текст задачи"
              placeholder="Например: 'Собрать подписи с родителей.'"
            />
            <SharedSelectWithLabel
              v-model:model-value="newTask.employerId"
              :items="users"
              label="Ответственный сотрудник"
            />
            <SharedSelectWithLabel
              v-model:model-value="newTask.targetUserId"
              :items="users"
              label="Объект задачи"
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
    <div class="w-full p-5 bg-white h-[80vh]">
      <div
        v-if="users"
        v-for="user in users"
        class="mt-2 w-full h-fit bg-slate-100 rounded-md p-2"
      >
        <div class="text-md ml-2 flex">
          {{ user.user.name }}
        </div>
        <div
          v-for="task in user.user.tasks"
          class="mt-2 h-12 bg-orange-600"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CRM_API } from "~/composables/getList";
const CRM_API_INSTANCE = new CRM_API();
const users = ref<IIdentityWithRelations[]>();
const newTask = ref<ITasks>();
onMounted(async () => {
  users.value = (await CRM_API_INSTANCE.employers.getList(
    true
  )) as IIdentityWithRelations[];
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
