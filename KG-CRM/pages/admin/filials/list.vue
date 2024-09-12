<template>
  <div class="p-5">
    <WidgetsModulesFilialsEditSheet
      v-if="modalState.selectedFilial"
      :state="modalState.ModalState"
      v-on:updateList="updateFilials($event)"
      :filial="modalState.selectedFilial"
    />
    <div class="flex flex-row-reverse">
      <WidgetsModulesFilialsCreateSheet v-on:updateList="createFilials($event)" />
    </div>
    <div class="mt-5">
      <WidgetsModulesTableData v-if="filials" :columns="columns" :data="filials" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/widgets/modules/filials/columns";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import type { IFilial } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";

const CRM_API_INSTANCE = new CRM_API();

const filials = ref<IFilial[]>();
const modalState = useModalStore();

const updateFilials = function (event: IFilial) {
  filials.value = filials.value?.map((el) => (el.id === event.id ? { ...el, ...event } : el));
};

const createFilials = function (newFilial: IFilial) {
  filials.value = [...(filials.value || []), newFilial];
};
// onMounted(() => {
//   modalState.ModalState = false;
//   modalState.clearSelectedFilial();
// });
onMounted(async () => {
  filials.value = (await CRM_API_INSTANCE.filials.getList()) as IFilial[];
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
</script>

<style></style>
