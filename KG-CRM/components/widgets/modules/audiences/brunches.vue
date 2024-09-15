<template>
  <div>
    <!-- Header -->

    <div class="flex justify-end absolute right-0 top-0">
      <WidgetsModulesAudiencesCreateSheet />
    </div>

    <WidgetsModulesAudiencesEditSheet
      v-if="modalState.selected"
      :state="modalState.ModalState"
      :brunch="modalState.selected"
    />

    <!-- Body -->
    <div class="mt-5 w-full">
      <WidgetsModulesTableData :columns="columns" :data="listStore.listState" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IBrunchWithRelations } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";
import { columns } from "~/components/widgets/modules/audiences/column";
const listStore = useListStore();
const CRM_API_INSTANCE = new CRM_API();
const modalState = useModalStore();
onBeforeMount(async () => {
  listStore.listState = await CRM_API_INSTANCE.brunches.getList();
});
</script>
