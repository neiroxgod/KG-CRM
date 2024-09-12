<template>
  <div
    class="relative h-screen bg-white dark:bg-slate-900 relatve border-slate-600"
  >
    <div class="w-full">
      <WidgetsSidebarItem
        v-for="route in mainRoutes"
        :routerLink="route.nuxtLink"
        :key="route.caption"
        :icon="route.icon"
      >
        {{ route.caption }}
      </WidgetsSidebarItem>
    </div>

    <div
      :class="[
        userStore.menuState
          ? 'w-[280px] fixed bottom-0 left-0 flex flex-col bg-white dark:bg-slate-900 border-t border-slate-600'
          : 'fixed bottom-0 left-0 flex flex-col bg-white dark:bg-slate-900 border-t border-slate-600 w-[65px]',
      ]"
    >
      <div class="flex items-center justify-center p-2 w-full cursor-pointer">
        <div class="flex items-center space-x-2">
          <Switch
            id="theme-switch"
            :checked="themeStore.isDark"
            @update:checked="themeStore.toggleTheme"
            class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            :class="[themeStore.isDark ? 'bg-indigo-600' : 'bg-gray-200']"
          >
            <span
              class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
              :class="[themeStore.isDark ? 'translate-x-6' : 'translate-x-1']"
            />
          </Switch>
          <Icon
            v-if="userStore.menuState"
            :name="
              themeStore.isDark
                ? 'material-symbols:dark-mode'
                : 'material-symbols:light-mode'
            "
            class="h-5 w-5"
            :class="[themeStore.isDark ? 'text-white' : 'text-yellow-500']"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Switch from "~/components/ui/switch/Switch.vue";
import { useThemeStore } from "~/stores/themeStore";

const themeStore = useThemeStore();
const userStore = useAuthStore();
const mainRoutes = ref([
  {
    caption: "Группы",
    nuxtLink: "/admin/groups/list",
    icon: "material-symbols:groups-sharp",
  },
  {
    caption: "Ученики",
    nuxtLink: "/admin/users/list",
    icon: "material-symbols:user-attributes",
  },
  {
    caption: "Задачи",
    nuxtLink: "/admin/tasks/list",
    icon: "material-symbols:task",
  },
  {
    caption: "Расходы/Доходы",
    nuxtLink: "/admin/incomes/list",
    icon: "material-symbols:attach-money",
  },
  {
    caption: "Филиалы",
    nuxtLink: "/admin/filials/list",
    icon: "material-symbols:filter-vintage-outline",
  },
  {
    caption: "Настройки школы",
    nuxtLink: "/admin/settings/list",
    icon: "material-symbols:settings-account-box-sharp",
  },
  {
    caption: "Расписание",
    nuxtLink: "/admin/schedule/list",
    icon: "material-symbols:auto-schedule",
  },
  {
    caption: "Сотрудники",
    nuxtLink: "/admin/employers/list",
    icon: "material-symbols:work",
  },
  {
    caption: "Отчеты",
    nuxtLink: "/admin/reports/list",
    icon: "material-symbols:dashboard-customize",
  },
]);
</script>
