<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <WidgetsModulesEmployerCreateModal />
    </div>
    <div class="mt-5">
      <WidgetsModulesTableData :columns="columns" :data="listStore.listState" />
    </div>
  </div>
</template>

<script setup>
import { columns } from "@/components/widgets/modules/table/columns";

const userStore = useAuthStore();
const listStore = useListStore();

async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  const employers = ref([]);
  employers.value = await fetchApi("/employers/", {
    method: "GET",
  });
  return employers.value;
}

onMounted(async () => {
  listStore.listState = await getData();
});
</script>

<style></style>
