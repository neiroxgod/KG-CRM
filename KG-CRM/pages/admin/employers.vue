<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <Form
        v-slot="{ submitForm }"
        as=""
        :validation-schema="formSchema"
        @submit="onSubmit"
      >
        <Dialog>
          <DialogTrigger as-child>
            <SharedAddButton />
          </DialogTrigger>
          <DialogContent class="w-full">
            <DialogHeader>
              <DialogTitle>Создание сотрудника</DialogTitle>
            </DialogHeader>
            <Separator />
            <form @submit="submitForm">
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
                        type="email"
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
                        type="email"
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
      <DataTable
        v-if="data.employers"
        :columns="columns"
        :data="data.employers"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/widgets/modules/table/columns";
import DataTable from "@/components/widgets/modules/table/data.vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const data = ref<any>([]);
const userStore = useAuthStore();
async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  let employers = ref<any>([]);
  employers.value = await fetchApi("/api/employers/list", {
    method: "POST",
    body: {
      accountId: userStore.user!.accountId,
    },
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

function onSubmit(values: any) {
  console.log("submited:", values);
  toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
}
</script>

<style></style>
