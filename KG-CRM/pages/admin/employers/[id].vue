<template>
  <div class="p-5">
    <!-- Header -->
    <div class="w-full mb-5 flex justify-between">
      <div class="flex">
        <div class="h-32 w-32 bg-Primary rounded-full"></div>
        <div class="px-5 py-2">
          <div class="text-3xl font-inter font-bold">Иванов Петр Петрович</div>
          <div class="flex">
            <div class="mt-2">
              <div class="text-md font-inter font-normal text-slate-600">
                Роли
              </div>
              <div class="text-xl font-inter font-semibold">Преподаватель</div>
            </div>
            <div class="mt-2 ml-5">
              <div class="text-md font-inter font-normal text-slate-600">
                Пароль
              </div>
              <div class="text-xl font-inter font-semibold">6446849</div>
            </div>
          </div>
        </div>
      </div>
      <div class="py-2">
        <Button>Создать задачу</Button>
      </div>
    </div>

    <!-- Main -->
    <Separator></Separator>

    <div class="mt-5">
      <Tabs>
        <TabsList>
          <TabsTrigger value="account"> Профиль </TabsTrigger>
          <TabsTrigger value="password"> Выплаты </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <WidgetsModulesEmployerProfile />
        </TabsContent>
        <TabsContent value="password"> </TabsContent>
      </Tabs>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
