<template>
  <div class="p-2">
    <SharedInputWithLabel
      :on:change="updateEmployer"
      v-model="employerData.name"
      :placeholder="employer.name"
      label="ФИО"
    />

    <SharedInputWithLabel
      :on:change="updateEmployer"
      v-model="employerData.email"
      :placeholder="employer.email"
      label="Почта"
    />

    <SharedInputWithLabel
      :on:change="updateEmployer"
      v-model="employerData.phone"
      :placeholder="employer.phone"
      label="Телефон"
    />

    <SharedInputWithLabel
      :on:change="updateEmployer"
      v-model="employerData.username"
      :placeholder="employer.username"
      label="Логин"
    />

    <SharedSelectWithLabel
      :on:change="updateEmployer"
      v-model="employerData.filialId"
      :items="filials"
      label="Филиалы"
    />
  </div>
</template>

<script setup lang="ts">
import type { IUser } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";

const props = defineProps<{
  employer: IUser;
}>();
const employerData = ref<IUser>(props.employer);
const CRM_API_INSTANCE = new CRM_API();
const filials = ref(await CRM_API_INSTANCE.filials.getList());
console.log(filials.value);
const updateEmployer = async function () {
  const response = CRM_API_INSTANCE.employers.update(employerData.value.id, {
    ...employerData.value,
  });

  return response;
};
</script>
