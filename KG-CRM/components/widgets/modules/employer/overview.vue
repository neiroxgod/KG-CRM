<template>
  <div class="p-5 bg-slate-100 h-fit w-full rounded-md">
    <div class="text-xl font-bold font-inter">Последние задачи</div>
    <WidgetsTaskShort
      v-if="employer.tasks.length"
      v-for="task in employer.tasks"
      :task-text="task.text"
      :task-deadline="task.deadline"
    />
    <WidgetsEmptyData v-else label="У сотрудника нет задач" />
  </div>
  <div class="mt-5">
    <div class="text-xl font-bold font-inter">
      Прикрепленные документы и файлы
    </div>
    <div class="flex justify-center gap-4 mt-5">
      <WidgetsDocument
        v-if="employer.files.length"
        v-for="file in employer.files"
        :label="file.caption"
        :description="file.createdAt"
        background="bg-gradient-to-br from-indigo-500/50 from-10% via-sky-500/50 via-30% to-emerald-500/50 to-90%"
      />

      <WidgetsEmptyData v-else label="Нет документов" />
    </div>
  </div>
  <div class="mt-5" v-if="employer">
    <div class="text-xl font-bold font-inter">Последняя активность</div>
    <WidgetsActivity
      v-if="employer.activity?.length"
      v-for="activity in employer.activity"
      class="mt-2"
      :acitivity-user="employer.name"
      :activity-date="activity.createdAt"
      :activity-description="activity.description"
      :activity-type="activity.type"
    />

    <WidgetsEmptyData v-else label="Пока нет активности :(" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  employer: IEmployer;
}>();
</script>
