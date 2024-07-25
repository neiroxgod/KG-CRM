<template>
  <div
    class="flex justify-end bg-gradient-to-tl from-red-300 to-btnPrimary min-h-screen"
  >
    <div class="m-10 bg-white w-full rounded-xl p-5">
      <div class="text-2xl font-inter font-bold text-slate-600 mb-2">
        Вся картина перед вашими глазами!
      </div>
      <div class="p-2 rounded-md border shadow-md">
        <div class="text-xl font-inter font-thin mt-2">
          Взгляните на статистику вашей школы
        </div>
        <widgetsLoginShowOff />
      </div>
    </div>
    <NuxtLayout :name="loginStore.layoutName" />
  </div>
</template>
<script setup>
const loginStore = useLoginStore();
</script>
