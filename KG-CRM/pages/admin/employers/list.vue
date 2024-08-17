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

onMounted(async () => {
  const user = await CRM_API().employers();

  listStore.listState = user;
});
</script>

<style></style>
