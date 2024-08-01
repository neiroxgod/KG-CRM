<template>
  <div
    class="bg-Shades h-fit p-2 px-5 w-full flex justify-between items-center"
  >
    <div class="text-2xl color font-inter font-bold">
      {{ pageTitle }}
    </div>
    <div class="relative w-full max-w-sm items-center ml-3">
      <Input
        id="search"
        type="text"
        placeholder="Поиск по ФИО, телефону или группе"
        class="pl-10"
      />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
      >
        <Icon name="material-symbols:search-rounded" class="h-4 w-4" />
      </span>
    </div>
    <div class="text-xl flex items-center">
      <WidgetsNavbarDropDown />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getRouteName } from "../composables/routeNameTransformer";
const route = useRoute();
const userStore = useAuthStore();
const pageTitle = computed(() => {
  return getRouteName(route.path) || "Дешборд"; // Значение по умолчанию
});
</script>
