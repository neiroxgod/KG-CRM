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
const mainRoutes = ref([
  {
    caption: "Группы",
    nuxtLink: "/admin/groups",
    icon: "material-symbols:groups-sharp",
  },
  {
    caption: "Ученики",
    nuxtLink: "/admin/users",
    icon: "material-symbols:user-attributes",
  },
  {
    caption: "Расходы/Доходы",
    nuxtLink: "/admin/incomes",
    icon: "material-symbols:attach-money",
  },
  {
    caption: "Филиалы",
    nuxtLink: "/admin/filials",
    icon: "material-symbols:filter-vintage-outline",
  },
  {
    caption: "Настройки школы",
    nuxtLink: "/admin/settings",
    icon: "material-symbols:settings-account-box-sharp",
  },
  {
    caption: "Расписание",
    nuxtLink: "/admin/schedule",
    icon: "material-symbols:auto-schedule",
  },
  {
    caption: "Сотрудники",
    nuxtLink: "/admin/employers",
    icon: "material-symbols:work",
  },
  {
    caption: "Отчеты",
    nuxtLink: "/admin/reports",
    icon: "material-symbols:dashboard-customize",
  },
]);
</script>
