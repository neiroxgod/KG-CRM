<script setup>
const layout = ref("default");
const userStore = useAuthStore();
if (!userStore.user && !userStore.isLoading) {
  navigateTo("/employerAuth");
}

const reportStats = ref([
  {
    icon: "material-symbols:wallet",
    label: "Прибыль",
    stat: "235 000 Р",
    additionalInfo: [
      {
        label: "Расходы",
        stat: "12 000 Р",
      },
      {
        label: "Доходы",
        stat: "247 000 Р",
      },
    ],
  },
  {
    icon: "material-symbols:chart-data",
    label: "Средний чек",
    stat: "3 500 Р",
  },
  {
    icon: "material-symbols:person-play-rounded",
    label: "Ученики",
    stat: "35",
    additionalInfo: [
      {
        label: "Новые",
        stat: "24",
      },
      {
        label: "Отток",
        stat: "12",
      },
    ],
  },
  {
    icon: "material-symbols:filter-vintage",
    label: "Средний LTV, Р",
    stat: "3 500 Р",
  },
]);
</script>

<template>
  <div class="p-10">
    <div>
      <div
        v-if="userStore.user.name"
        class="text-4xl font-inter font-bold text-btnPrimary"
      >
        Добро пожаловать, {{ userStore.user.name }} !
      </div>
      <div class="text-xl font-inter font-thin mt-2">
        Взгляните на статистику вашей школы!
      </div>
    </div>

    <div class="mt-5 flex justify-between">
      <WidgetsDashboardItem
        class="mr-5"
        v-for="stat in reportStats"
        :icon="stat.icon"
        :label="stat.label"
      >
        <div class="text-xl text-btnPrimary font-inter font-bold">
          {{ stat.stat }}
        </div>
        <div
          v-if="stat.additionalInfo"
          v-for="additionalStat in stat.additionalInfo"
          class="text-sm font-inter font-medium flex items-center"
        >
          {{ additionalStat.label }} : {{ additionalStat.stat }}
        </div>
      </WidgetsDashboardItem>
    </div>

    <div class="flex mt-5">
      <WidgetsDashboardChartArea class="mr-5">
        <div class="flex items-center mb-2">
          <Icon
            class="mr-1 h-5 w-5 bg-slate-400"
            name="material-symbols:chart-data"
          />
          <Label class="text-slate-700 font-inter font-medium">Финансы</Label>
        </div>
        <div class="text-xl text-btnPrimary font-inter font-bold">
          235 000 Р
        </div>
      </WidgetsDashboardChartArea>
      <WidgetsDashboardChartArea>
        <div class="flex items-center mb-2">
          <Icon
            class="mr-1 h-5 w-5 bg-slate-400"
            name="material-symbols:chart-data"
          />
          <Label class="text-slate-700 font-inter font-medium">Финансы</Label>
        </div>
        <div class="text-xl text-btnPrimary font-inter font-bold">
          235 000 Р
        </div>
      </WidgetsDashboardChartArea>
    </div>

    <div class="mt-5 flex">
      <WidgetsDashboardChartLine class="mr-5">
        <div class="flex items-center mb-2">
          <Icon
            class="mr-1 h-5 w-5 bg-slate-400"
            name="material-symbols:chart-data"
          />
          <Label class="text-slate-700 font-inter font-medium">Финансы</Label>
        </div>
        <div class="text-xl text-btnPrimary font-inter font-bold">
          235 000 Р
        </div>
      </WidgetsDashboardChartLine>
      <WidgetsDashboardChartLine>
        <div class="flex items-center mb-2">
          <Icon
            class="mr-1 h-5 w-5 bg-slate-400"
            name="material-symbols:chart-data"
          />
          <Label class="text-slate-700 font-inter font-medium">Финансы</Label>
        </div>
        <div class="text-xl text-btnPrimary font-inter font-bold">
          235 000 Р
        </div>
      </WidgetsDashboardChartLine>
    </div>
  </div>
</template>
