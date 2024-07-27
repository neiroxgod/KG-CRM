<template>
  <div class="p-5">
    <div class="flex flex-row-reverse">
      <SharedAddButton label="Добавить" />
    </div>
    <div class="mt-5">
      <DataTable :columns="columns" :data="data.employers" />
    </div>
  </div>
</template>

<script setup>
import { columns } from "@/components/widgets/modules/table/columns";
import DataTable from "@/components/widgets/modules/table/data.vue";

const data = ref([]);
const userStore = useAuthStore(); //benis

async function getData() {
  const fetchApi = useFetchApi(userStore.token);
  let employers = ref([]);
  employers.value = await fetchApi("/api/employers/list", {
    method: "POST",
    body: {
      accountId: userStore.user.accountId,
    },
  });

  return employers.value;
}

onMounted(async () => {
  data.value = await getData();
});
</script>

<style></style>
