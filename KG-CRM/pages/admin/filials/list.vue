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

<script setup lang="ts">
import { columns } from "@/components/widgets/modules/filials/columns";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { toast } from "@/components/ui/toast";
import type { IFilial } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";

const CRM_API_INSTANCE = new CRM_API();

const filials = ref<IFilial[]>();
const userStore = useAuthStore();
const listStore = useListStore();
const modalState = useModalStore();

onMounted(async () => {
  filials.value = (await CRM_API_INSTANCE.filials.getList()) as IFilial[];
  listStore.listState = filials.value;
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

// function onSubmit(values) {
//   toast({
//     title: "You submitted the following values:",
//     description: h(
//       "pre",
//       { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
//       h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
//     ),
//   });
// }
</script>

<style></style>
