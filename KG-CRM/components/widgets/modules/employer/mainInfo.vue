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

    <SharedInputWithLabel
      :on:change="updateEmployer"
      v-model="employerData.password"
      :placeholder="employer.password"
      label="Пароль"
    />
  </div>
</template>

<script setup lang="ts">
import type { IEmployer } from "~/composables/interfaces";

const props = defineProps<{
  employer: IEmployer;
}>();
const employerData = ref<IEmployer>(props.employer);
const userStore = useAuthStore();

const updateEmployer = async function () {
  const fetchApi = useFetchApi(userStore.token);
  const response = await fetchApi("/employers/edit", {
    method: "PATCH",
    body: { ...employerData.value },
  });
};
</script>
