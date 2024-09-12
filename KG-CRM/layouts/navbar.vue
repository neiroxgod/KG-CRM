<template>
  <div
    class="bg-white dark:bg-slate-900 shadow-md h-fit p-2 px-5 w-full flex justify-between items-center"
  >
    <div class="flex items-center justify-center">
      <button
        class="p-2 mr-2 focus:outline-none transition duration-150 ease-in-out hover:bg-gray-100 dark:hover:bg-slate-950 rounded-md"
        @click="toggleMenu"
      >
        <Icon name="material-symbols:menu-rounded" class="h-6 w-6" />
      </button>
      <div
        class="text-2xl color font-inter font-bold flex-1 flex items-center justify-center"
      >
        {{ pageTitle }}
      </div>
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
import { ref } from "vue";

const userStore = useAuthStore();
const route = useRoute();
const pageTitle = computed(() => {
  return getRouteName(route.path) || "Дешборд"; // Значение по умолчанию
});
const isMenuOpen = ref(false);

const toggleMenu = () => {
  userStore.menuState = !userStore.menuState;
};
</script>
