<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <Form @submit.prevent="onSubmit" as="" :validation-schema="formSchema">
        <Dialog>
          <DialogTrigger as-child>
            <SharedAddButton />
          </DialogTrigger>
          <DialogContent class="w-full">
            <DialogHeader>
              <DialogTitle>Создание сотрудника</DialogTitle>
            </DialogHeader>
            <Separator />
            <form @submit="onSubmit">
              <div class="flex justify-between gap-4">
                <FormField v-slot="{ componentField }" name="name">
                  <FormItem class="w-full">
                    <FormLabel>ФИО</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Иванов Иван Иванович"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phone">
                  <FormItem class="w-full">
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        type="phone"
                        placeholder="+7 999 999 99 99"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex justify-between">
                <FormField v-slot="{ componentField }" name="email">
                  <FormItem class="w-full">
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="test@mail.ru"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
              <div class="flex justify-between gap-4">
                <FormField v-slot="{ componentField }" name="username">
                  <FormItem class="w-full">
                    <FormLabel>Логин к CRM</FormLabel>
                    <FormControl>
                      <Input
                        type="username"
                        placeholder="test@mail.ru"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="password">
                  <FormItem class="w-full">
                    <FormLabel>Пароль к CRM</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="test@mail.ru"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              </div>
            </form>
            <Separator />
            <DialogFooter>
              <Button type="submit" class="bg-btnPrimary" form="dialogForm">
                Добавить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Form>
    </div>
    <div class="mt-5">
      <WidgetsModulesTableData :columns="columns" :data="data" />
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import { columns } from "@/components/widgets/modules/table/columns";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const data = ref([]);
const userStore = useAuthStore();
console.log(userStore.user);

async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  let employers = ref([]);
  employers.value = await fetchApi("/employers/", {
    method: "GET",
  });
  return employers.value;
}

onMounted(async () => {
  data.value = await getData();
});

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, "Введите логин"),
    name: z.string().min(2, "Введите ФИО"),
    email: z.string().email("Укажите корректную почту"),
    phone: z.string().min(10, "Укажите телефон"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const fetchApi = useFetchApi(userStore.token);
  fetchApi("/employers/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
    Authorization: `Bearer ${userStore.token}`,
  });
  console.log("submited:", values);
});
</script>

<style></style>
