<template>
  <div class="p-5">
    <Sheet>
      <SheetTrigger as-child>
        <SharedAddButton />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader class="mb-2">
          <SheetTitle>Создание сотрудника</SheetTitle>
        </SheetHeader>
        Редактирование

        <!-- Main -->
        <Separator></Separator>

        <div class="mt-5">
          <Tabs default-value="account">
            <TabsList>
              <TabsTrigger value="account"> Профиль </TabsTrigger>
              <TabsTrigger value="password"> Выплаты </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <WidgetsModulesEmployerProfile />
            </TabsContent>
            <TabsContent value="password"> </TabsContent>
          </Tabs>
        </div>
        <SheetFooter>
          <SheetClose as-child class="mt-2">
            <Button @click="saveChanges"> Сохранить </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
const userStore = useAuthStore();

const props = defineProps<{
  employeeId: number | null;
}>();
const emit = defineEmits(["close"]);

const saveChanges = () => {
  console.log("Сохранение изменений для сотрудника ID:", props.employeeId);
  closeModal();
};

const closeModal = () => {
  emit("close");
};

const employer = ref();

async function getData() {
  console.log(props.employeeId);
  const fetchApi = useFetchApi(userStore.token);
  const response = await fetchApi("/employers/get/" + props.employeeId, {
    method: "GET",
  });
  return response;
}

onMounted(async () => {
  employer.value = await getData();
  console.log(employer.value);
});
</script>
