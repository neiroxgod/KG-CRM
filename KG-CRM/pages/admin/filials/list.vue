<template>
  <div class="p-5">
    <Tabs default-value="filials">
      <div class="relative justify-between items-center">
        <TabsList class="gap-5 dark:bg-slate-950 dark:text-white">
          <TabsTrigger value="filials"> Филиалы </TabsTrigger>
          <TabsTrigger value="audiences"> Аудитории </TabsTrigger>
        </TabsList>
        <TabsContent value="filials" class="w-full">
          <div class="flex justify-end absolute right-0 top-0">
            <WidgetsModulesFilialsCreateSheet
              v-on:updateList="createFilials($event)"
            />
          </div>

          <WidgetsModulesFilialsEditSheet
            v-if="modalState.selected"
            :state="modalState.ModalState"
            :filial="modalState.selected"
            v-on:updateList="updateFilials($event)"
          />

          <div class="mt-5 w-full">
            <WidgetsModulesTableData
              v-if="filials"
              :columns="columns"
              :data="filials"
            />
          </div>
        </TabsContent>
        <TabsContent value="audiences">
          <WidgetsModulesAudiencesBrunches />
        </TabsContent>
      </div>
    </Tabs>
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
  filials.value = filials.value?.map((el) =>
    el.id === event.id ? { ...el, ...event } : el
  );
};

const createFilials = function (newFilial: IFilial) {
  filials.value = [...(filials.value || []), newFilial];
};

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
