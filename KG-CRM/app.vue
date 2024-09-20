<template>
  <div>
    <NuxtLoadingIndicator />
    <Toaster />
    <!-- Loader -->
    <SharedNuxtLoadingBar v-if="userStore.loading" />
    <!-- App -->

    <div class="relative" v-else-if="userStore.user">
      <div class="z-10 fixed top-0 left-0 right-0 h-[58px] w-full">
        <NuxtLayout name="navbar" />
      </div>

      <div class="flex mt-[58px]">
        <div
          class="fixed shadow-md left-0 h-screen transition-width duration-300"
          :style="{ width: userStore.menuState ? '280px' : '65px' }"
        >
          <NuxtLayout name="sidebar" />
        </div>

        <div
          class="bg-slate-100 dark:bg-slate-800 w-full min-h-screen"
          :style="{ 'margin-left': userStore.menuState ? '280px' : '65px' }"
        >
          <NuxtPage />
        </div>
      </div>

      <Sheet class="">
        <SheetTrigger
          class="fixed drop-shadow-xl bottom-4 right-4 cursor-pointer text-blue-500 dark:text-indigo-400"
        >
          <Icon class="w-16 h-16" name="mdi:chat-question"></Icon
        ></SheetTrigger>
        <SheetContent class="lg:min-w-[800px] max-h-screen overflow-y-auto">
          <SheetHeader>
            <SheetTitle class="font-bold font-inter text-2xl"
              >Центр связи</SheetTitle
            >
            <SheetDescription>
              Здесь находятся ваши чаты а так же ответы на вопросы.
            </SheetDescription>

            <div class="flex lg:flex-nowrap flex-wrap gap-5">
              <Button
                class="w-full bg-gradient-to-tr from-purple-400 to-pink-300 transition-all duration-300 hover:bg-gradient-to-tr hover:from-purple-500 hover:to-pink-400 text-white font-inter shadow-md"
                variant="outline"
              >
                <Icon class="mr-2 w-5 h-5" name="mdi:comment-question" />
                Техническая поддержка
              </Button>

              <Button
                class="w-full bg-gradient-to-tr from-blue-400 to-cyan-300 transition-all duration-300 hover:bg-gradient-to-tr hover:from-blue-500 hover:to-cyan-400 text-white font-inter shadow-md"
                variant="outline"
              >
                <Icon class="w-5 h-5 mr-2" name="mdi:telegram" />Техническая
                поддержка (ТГ)</Button
              >

              <Button
                class="w-full bg-gradient-to-tr from-lime-400 to-green-300 transition-all duration-300 hover:bg-gradient-to-tr hover:from-lime-500 hover:to-green-400 text-white font-inter shadow-md"
                variant="outline"
              >
                <Icon class="w-5 h-5 mr-2" name="ri:whatsapp-fill" />Чат
                (Wazzup)</Button
              >
            </div>
            <div class="mt-5">
              <Separator />
              <div class="text-xl mt-2 font-bold">База знаний</div>

              <div class="mt-2 relative w-full items-center">
                <Input
                  id="search"
                  type="text"
                  placeholder="Поиск по базе знаний..."
                  class="pl-10"
                />
                <span
                  class="absolute start-0 inset-y-0 flex items-center justify-center px-2"
                >
                  <Icon
                    name="material-symbols:search-rounded"
                    class="h-4 w-4"
                  />
                </span>
              </div>

              <div
                class="flex justify-center flex-wrap lg:justify-between mt-5 gap-5 text-white"
              >
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-indigo-500 via-purple-300 to-pink-400 rounded-md"
                >
                  <div class="text-center">
                    <Icon
                      class="h-16 w-full lg:w-16"
                      name="mdi:account-group"
                    />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Группы
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-red-400 via-purple-600 to-slate-700 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="ph:buildings-fill" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Филиалы
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-indigo-300 via-purple-400 to-pink-600 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="clarity:employee-solid" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Сотрудники
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-cyan-500 via-blue-300 to-pink-500 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="teenyicons:users-solid" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Ученики
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-emerald-500 via-blue-500 to-red-500 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="ri:customer-service-fill" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Заявки
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="clarity:tasks-solid" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Задачи
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-amber-300 via-yellow-500 to-orange-500 rounded-md"
                >
                  <div class="text-center">
                    <Icon
                      class="h-16 w-16"
                      name="material-symbols:account-balance-wallet"
                    />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Аккаунт
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="iconoir:reports-solid" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Отчеты
                    </div>
                  </div>
                </div>
                <div
                  class="shadow-md flex items-center justify-center w-56 h-48 bg-gradient-to-br from-sky-500 via-purple-500 to-violet-500 rounded-md"
                >
                  <div class="text-center">
                    <Icon class="h-16 w-16" name="uis:schedule" />

                    <div class="text-2xl font-inter font-bold drop-shadow-lg">
                      Расписание
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Auth page -->
    <div v-else>
      <NuxtPage />
    </div>
  </div>
</template>
<script setup>
import Toaster from "./components/ui/toast/Toaster.vue";

const { initAuth } = useAuth();
const userStore = useAuthStore();
userStore.loadFromLocalStorage();

onBeforeMount(() => {
  initAuth();
});
</script>
