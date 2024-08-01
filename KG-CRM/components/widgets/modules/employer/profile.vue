<template>
  <div class="w-full">
    <div class="flex">
      <div class="w-2/4 h-96 border-r">
        <div class="flex align-middle items-center">
          <Icon
            name="material-symbols:deployed-code-account-rounded"
            class="w-6 h-6 mr-2 bg-btnPrimary"
          />
          <Label class="text-xl font-inter font-bold">Основные</Label>
        </div>
        <div class="mr-5">
          <div class="flex justify-between gap-4">
            <SharedInputWithLabel
              v-model="data.name"
              label="ФИО"
              placeholder="Иванов Петр Петрович"
            />
            <SharedInputWithLabel
              v-model="data.phone"
              label="Телефон"
              placeholder="89618091233"
            />
          </div>
          <div class="flex gap-4">
            <SharedInputWithLabel
              v-model="data.email"
              label="Почта"
              placeholder="KusakaB3@mail.ru"
            />
            <SharedSelectWithLabel
              :items="filials"
              v-model="data.filialId"
              label="Филиал"
            />
          </div>

          <SharedTagsWithLabel label="Роли" />
        </div>
      </div>

      <div class="w-2/4 h-96 mx-10">
        <div class="flex align-middle items-center">
          <Icon
            name="material-symbols:docs"
            class="w-6 h-6 mr-2 bg-btnPrimary"
          />
          <Label class="text-xl font-inter font-bold">Документы</Label>
        </div>

        <SharedTextareaWithLabel
          v-model="data.passport"
          label="Паспортные данные"
          placeholder="Выдан УФМС ФСИН г.Волгоград от 14.05.2016 1456 135324"
        />
        <SharedTextareaWithLabel
          v-model="data.factOfBirth"
          label="Свидетельство о рождении"
          placeholder=""
        />
      </div>
    </div>
    <div class="flex justify-end">
      <Button>Сохранить</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
const filials = ref([
  {
    id: 1,
    caption: "Тестовый филиал",
  },
  {
    id: 2,
    caption: "Петровский",
  },
  {
    id: 3,
    caption: "Черниговский",
  },
]);

interface IEmployerData {
  name: string;
  phone: string;
  email: string;
  filialId: string;
  passport: string;
  factOfBirth: string;
}

const data: Ref<IEmployerData> = ref<IEmployerData>({
  name: "",
  phone: "",
  email: "",
  passport: "",
  filialId: "",
  factOfBirth: "",
});

watch(
  () => data,
  function (new_data) {
    console.log(new_data);
  }
);
</script>
