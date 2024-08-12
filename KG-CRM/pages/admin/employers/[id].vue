<template>
  <div class="p-5">
    <div class="mt-5 flex justify-between">
      <div class="mr-5 w-2/6">
        <div class="text-4xl font-bold font-inter">Иванов Иван Иванович</div>
        <Accordion type="single" class="w-full" collapsible>
          <AccordionItem value="mainInfo">
            <AccordionTrigger> Основная информация </AccordionTrigger>
            <AccordionContent>
              <WidgetsModulesEmployerMainInfo
                v-if="employer"
                :employer="employer"
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="roles">
            <AccordionTrigger> Роли </AccordionTrigger>
            <AccordionContent>
              <TagsInput v-model="UserRoles">
                <TagsInputItem
                  v-for="item in UserRoles"
                  :key="item.value"
                  :value="item.value"
                >
                  <TagsInputItemText />
                  <TagsInputItemDelete />
                </TagsInputItem>

                <TagsInputInput placeholder="Fruits..." />
              </TagsInput>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="assignedUsers">
            <AccordionTrigger> Связанные ученики </AccordionTrigger>
            <AccordionContent>
              <div class="p-2 mt-1 bg-slate-200 w-full h-fit rounded-md">
                <nuxt-link to="/users/">Сергеев Владимир Петрович</nuxt-link>
              </div>

              <div class="p-2 mt-1 bg-slate-200 w-full h-fit rounded-md">
                <nuxt-link to="/users/">Сергеев Владимир Петрович</nuxt-link>
              </div>

              <div class="p-2 mt-1 bg-slate-200 w-full h-fit rounded-md">
                <nuxt-link to="/users/">Сергеев Владимир Петрович</nuxt-link>
              </div>

              <div class="p-2 mt-1 bg-slate-200 w-full h-fit rounded-md">
                <nuxt-link to="/users/">Сергеев Владимир Петрович</nuxt-link>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="notes">
            <AccordionTrigger> Заметки </AccordionTrigger>
            <AccordionContent>
              <div class="p-2 bg-slate-200 w-full h-fit rounded-md">
                Проходила курсы повышения квалификации 2023.12.01
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <Separator orientation="vertical" />

      <div class="w-4/6">
        <Tabs>
          <TabsList class="gap-10">
            <TabsTrigger value="overview"> Обзор </TabsTrigger>
            <TabsTrigger value="tasks"> Задачи </TabsTrigger>
            <TabsTrigger value="payments"> Выплаты </TabsTrigger>
            <TabsTrigger value="docs"> Документы </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <WidgetsModulesEmployerOverview :employer="employer" />
          </TabsContent>
          <TabsContent value="tasks">
            <WidgetsModulesEmployerTasks />
          </TabsContent>
          <TabsContent value="payments"> </TabsContent>
          <TabsContent value="docs"> </TabsContent>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IEmployer } from "~/composables/interfaces";

const route = useRoute();
const userStore = useAuthStore();

const employer = ref<IEmployer>();

const UserRoles = ref<Array<Object>>();

const getEmployer = async function (): Promise<IEmployer> {
  const fetchApi = useFetchApi(userStore.token);

  const response = await fetchApi("/employers/get/" + route.params.id);
  UserRoles.value = response.roles;
  return response as IEmployer;
};

onMounted(async () => {
  employer.value = await getEmployer();
});
</script>
