<template>
  <div class="p-5 flex flex-row-reverse">
    <SharedAddButton label="Добавить" />
  </div>
  <div class="mt-5">
    <!-- https://tanstack.com/table/latest/docs/framework/vue/vue-table -->
    <Table>
      <TableCaption>Список сотрудников.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead> ФИО </TableHead>
          <TableHead>Филиал</TableHead>
          <TableHead>Должность</TableHead>
          <TableHead> Номер </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="empl in employers" :key="empl.id">
          <TableCell class="font-medium">
            {{ empl.fio }}
          </TableCell>
          <TableCell>{{ empl.filial }}</TableCell>
          <TableCell>{{ empl.type[0].label }}</TableCell>
          <TableCell>
            {{ empl.phone }}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script lang="ts" setup>
const employers = [
  {
    id: 1,
    fio: "Садиков Артем Дмитриевич",
    filial: "Камышин",
    type: [
      {
        label: "Администратор",
      },
      {
        label: "Преподаватель",
      },
    ],
    phone: "+79994711222",
  },
  {
    id: 2,
    fio: "Садиков Артем Дмитриевич",
    filial: "Камышин",
    type: [
      {
        label: "Администратор",
      },
      {
        label: "Преподаватель",
      },
    ],
    phone: "+79994711222",
  },
];
</script>

<style></style>
