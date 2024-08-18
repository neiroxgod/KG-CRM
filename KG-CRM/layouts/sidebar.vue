<template>
  <div class="bg-Primary h-screen relatve">
    <WidgetsSidebarLogo />
    <WidgetsSidebarItem
      v-for="route in mainRoutes"
      :routerLink="route.nuxtLink"
      :key="route.caption"
      :icon="route.icon"
    >
      {{ route.caption }}
    </WidgetsSidebarItem>
  </div>
</template>

<script setup>
// ТЯНУТЬ С БЕКА*
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
