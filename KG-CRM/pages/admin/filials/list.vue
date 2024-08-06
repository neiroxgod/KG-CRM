<template>
  <div class="p-5">
    <WidgetsModulesFilialsEditSheet
      v-if="modalState.ModalState === true"
      :state="modalState.ModalState"
    />
    <div class="flex flex-row-reverse">
      <WidgetsModulesFilialsCreateSheet />
    </div>
    <div class="mt-5">
      <WidgetsModulesTableData :columns="columns" :data="listStore.listState" />
    </div>
  </div>
</template>

<script setup>
import { columns } from "@/components/widgets/modules/filials/columns";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";

const templateData = [
  {
    id: 1,
    name: "Смирнова Полина Михайловна",
    city: "Москва",
    address: "Камышин 12, бц Плаза",
    phone: "+7 700 7777 7777",
  },
  {
    id: 2,
    name: "Смирнова Полина Михайловна",
    city: "Москва",
    address: "Камышин 12, бц Плаза",
    phone: "+7 700 7777 7777",
  },
  {
    id: 3,
    name: "Смирнова Полина Михайловна",
    city: "Москва",
    address: "Камышин 12, бц Плаза",
    phone: "+7 700 7777 7777",
  },
];

const data = ref(templateData);
const userStore = useAuthStore();
const listStore = useListStore();
const modalState = useModalStore();

async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  const filials = ref([]);
  filials.value = await fetchApi("/filials/", {
    method: "GET",
  });
  return filials.value;
}

onMounted(() => {
  listStore.listState = data.value;
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
