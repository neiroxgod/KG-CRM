<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <WidgetsModulesEmployerCreateSheet />
    </div>
    <div class="mt-5">
      <WidgetsModulesTableData :columns="columns" :data="listStore.listState" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { columns } from "@/components/widgets/modules/table/columns";
import { CRM_API } from "~/composables/getList";

const listStore = useListStore();
const CRM_API_INSTANCE = new CRM_API();
onMounted(async () => {
  const user = await CRM_API_INSTANCE.employers.getList();

  listStore.listState = user;
});
</script>

<style></style>
