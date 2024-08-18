<template>
  <Sheet>
    <SheetTrigger as-child>
      <SharedAddButton />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-2">
        <SheetTitle>Создание сотрудника</SheetTitle>
      </SheetHeader>
      <!--  -->
      <Separator />
      <form class="mt-2" @submit.prevent="onSubmit">
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
        <Separator class="mt-5" />
      </form>
      <SheetFooter>
        <SheetClose as-child class="mt-2">
          <Button
            @click="onSubmit"
            type="submit"
            class="bg-btnPrimary"
            form="dialogForm"
          >
            Создать
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "~/components/ui/toast";
import type {
  IIdentity,
  IIdentityWithRelations,
} from "~/composables/interfaces";

import { CRM_API } from "~/composables/getList";

const dialogstate = ref(false);

const userStore = useAuthStore();
const listStore = useListStore();
const CRM_API_INSTANCE = new CRM_API();

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
  const employer = ref<IIdentityWithRelations>();
  const response = await CRM_API_INSTANCE.employers.create({
    ...values,
  });

  employer.value = response as IIdentityWithRelations;

  toast({
    description: "Сотрудник успешно создан!",
    duration: 2000,
  });
  dialogstate.value = false;
  listStore.listState = [...listStore.listState, employer.value.user];
});
</script>
