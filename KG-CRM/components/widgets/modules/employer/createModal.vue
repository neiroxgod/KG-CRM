<template>
  <form @submit.prevent="onSubmit">
    <Dialog v-model:open="dialogstate">
      <DialogTrigger as-child>
        <SharedAddButton @click="dialogstate = true" />
      </DialogTrigger>
      <DialogContent class="w-full">
        <DialogHeader>
          <DialogTitle>Создание сотрудника</DialogTitle>
        </DialogHeader>
        <Separator />
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
                  type="text"
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
        <Separator />
        <DialogFooter>
          <Button @click="onSubmit" type="submit" class="" form="dialogForm">
            Добавить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "~/components/ui/toast";
import type { IEmployer } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";

const dialogstate = ref(false);

const userStore = useAuthStore();
const listStore = useListStore();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, "Введите логин"),
    name: z.string().min(2, "Введите ФИО"),
    email: z.string().email("Укажите корректную почту"),
    phone: z.string().min(10, "Укажите телефон"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  })
);
const { toast } = useToast();

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  const fetchApi = useFetchApi(userStore.token); // native JS composables
  const employer = ref<IEmployer[]>();
  const response = await fetchApi("/employers/add", {
    method: "POST",
    body: { ...values },
  });

  employer.value = response as IEmployer[];

  toast({
    description: "Сотрудник успешно создан!",
    duration: 2000,
  });
  dialogstate.value = false;
  listStore.listState = [...listStore.listState, employer.value];
});
</script>
