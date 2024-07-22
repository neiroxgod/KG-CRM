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
      <Avatar id="avatar" class="mr-2">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Label for="avatar"> Садиков Артем </Label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routeNames } from "../composables/routeNameTransformer";
const route = useRoute();
const pageTitle = computed(() => {
  return routeNames[route.path] || "Неизвестный маршрут"; // Значение по умолчанию
});
</script>
