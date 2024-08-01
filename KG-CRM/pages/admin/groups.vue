<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <div class="flex flex-row-reverse">
        <Form
          v-slot="{ submitForm }"
          as=""
          :validation-schema="formSchema"
          @submit="onSubmit"
        >
          <Dialog>
            <DialogTrigger as-child>
              <SharedAddButton label="Создать группу" />
            </DialogTrigger>
            <DialogContent class="max-w-[664px]">
              <DialogHeader>
                <DialogTitle>Добавление группы</DialogTitle>
              </DialogHeader>
              <Separator />
              <form @submit="submitForm">
                <div class="flex gap-6">
                  <div class="w-full">
                    <FormField v-slot="{ componentField }" name="caption">
                      <FormItem class="w-full">
                        <FormLabel>Название группы</FormLabel>
                        <FormControl>
                          <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="language">
                      <FormItem class="w-full mt-[24px]">
                        <FormLabel>Программа обучние</FormLabel>
                        <FormControl>
                          <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </div>
                  <div class="w-full">
                    <FormField v-slot="{ componentField }" name="language">
                      <FormItem class="w-full">
                        <FormLabel>Язык</FormLabel>
                        <FormControl>
                          <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>

                    <FormField v-slot="{ componentField }" name="teacherid">
                      <FormItem class="w-full mt-[24px]">
                        <FormLabel>Преподаватель</FormLabel>
                        <FormControl>
                          <Input type="text" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </FormField>
                  </div>
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
    </div>
    <div class="mt-5">
      <DataTable v-if="data" :columns="columns" :data="listStore.listState" />
    </div>
  </div>
</template>

<script setup>
import { columns } from "@/components/widgets/modules/group/columns";
import DataTable from "@/components/widgets/modules/table/data.vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const data = ref([]);
const userStore = useAuthStore();
const listStore = useListStore();

async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  const groups = ref([]);
  groups.value = await fetchApi("/groups/", {
    method: "GET",
  });
  return groups.value;
}

onMounted(async () => {
  listStore.listState = await getData();
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

function onSubmit(values) {
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
