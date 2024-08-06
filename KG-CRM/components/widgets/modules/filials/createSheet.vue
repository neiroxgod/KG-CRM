<template>
  <Sheet>
    <SheetTrigger as-child>
      <SharedAddButton label="Добавить филиал" />
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-2">
        <SheetTitle>Создание филиала</SheetTitle>
      </SheetHeader>
      <!--  -->
      <Separator />
      <form class="mt-2" @submit.prevent="onSubmit">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="w-full mb-2">
            <Checkbox id="terms" />
            <label
              for="terms"
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Активно
            </label>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="name">
          <FormItem class="w-full">
            <FormLabel>Название филиала</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Наименование филиала"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="city">
          <FormItem class="w-full">
            <FormLabel>Город</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Название города"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="adress">
          <FormItem class="w-full">
            <FormLabel>Адрес</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Камышина 12"
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

        <FormField v-slot="{ componentField }" name="timezone">
          <FormItem class="w-full">
            <FormLabel>Часовой пояс</FormLabel>
            <Select v-bind="componentField" v-model="selectedTimezone">
              <SelectTrigger>
                <SelectValue placeholder="Выберите из списка" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="timezone in timezones"
                    :key="timezone.value"
                    :value="timezone.value"
                  >
                    {{ timezone.label }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="link">
          <FormItem class="w-full">
            <FormLabel>Ссылка на договор-оферты</FormLabel>
            <FormControl>
              <Input
                type="text"
                placeholder="Добавьте ссылку"
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
            Создать филиал
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

const timezones = [
  { value: "Europe/Kaliningrad", label: "Калининград (GMT+2)" },
  { value: "Europe/Moscow", label: "Москва (GMT+3)" },
  { value: "Europe/Samara", label: "Самара (GMT+4)" },
  { value: "Asia/Yekaterinburg", label: "Екатеринбург (GMT+5)" },
  { value: "Asia/Omsk", label: "Омск (GMT+6)" },
  { value: "Asia/Novosibirsk", label: "Новосибирск (GMT+7)" },
  { value: "Asia/Krasnoyarsk", label: "Красноярск (GMT+7)" },
  { value: "Asia/Irkutsk", label: "Иркутск (GMT+8)" },
  { value: "Asia/Yakutsk", label: "Якутск (GMT+9)" },
  { value: "Asia/Vladivostok", label: "Владивосток (GMT+10)" },
  { value: "Asia/Magadan", label: "Магадан (GMT+11)" },
  { value: "Asia/Kamchatka", label: "Камчатка (GMT+12)" },
];

const selectedTimezone = ref("");

interface Employer {
  id: number;
  accountId: number;
  name: string;
  username: string;
  [key: string]: string | number;
}

const onSubmit = handleSubmit(async (values) => {
  const fetchApi = useFetchApi(userStore.token); // native JS composables
  const employer = ref<Employer>();
  const response = await fetchApi("/employers/add", {
    method: "POST",
    body: { ...values },
  });

  employer.value = response as Employer;

  toast({
    description: "Сотрудник успешно создан!",
    duration: 2000,
  });
  dialogstate.value = false;
  listStore.listState = [...listStore.listState, employer.value];
});
</script>
