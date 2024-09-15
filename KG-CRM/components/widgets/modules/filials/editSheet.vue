<template>
  <div>
    <Sheet v-model:open="modalStore.ModalState">
      <SheetContent ref="target">
        <SheetHeader class="mb-2">
          <SheetTitle>Редактирование филиала</SheetTitle>
        </SheetHeader>
        <Separator />
        <form class="mt-2" @submit.prevent="onSubmit">
          <FormField v-slot="{ componentField }" name="active">
            <FormItem class="w-full mb-2">
              <Checkbox
                v-model:model-value="modalStore.selected.active"
                id="terms"
              />
              <label
                for="terms"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Активно
              </label>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="caption">
            <FormItem class="w-full">
              <FormLabel>Название филиала</FormLabel>
              <FormControl>
                <Input
                  v-model:model-value="modalStore.selected.caption"
                  type="text"
                  placeholder="Наименование филиала"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="city">
            <FormItem class="w-full">
              <FormLabel>Город</FormLabel>
              <FormControl>
                <Input
                  v-model:model-value="modalStore.selected.city"
                  type="text"
                  placeholder="Название города"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="adress">
            <FormItem class="w-full">
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input
                  v-model:model-value="modalStore.selected.address"
                  type="text"
                  placeholder="Камышина 12"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="phone">
            <FormItem class="w-full">
              <FormLabel>Телефон</FormLabel>
              <FormControl>
                <Input
                  v-model:model-value="modalStore.selected.phone"
                  type="phone"
                  placeholder="+7 999 999 99 99"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="timezone">
            <FormItem class="w-full">
              <FormLabel>Часовой пояс</FormLabel>
              <Select
                v-bind="componentField"
                v-model:model-value="modalStore.selected.timezone"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите из списка" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem
                      v-for="timezone in timezones"
                      :key="timezone.value"
                      :value="timezone.value"
                    >
                      {{ timezone.label }}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="contractInfo">
            <FormItem class="w-full">
              <FormLabel>Ссылка на договор-оферты</FormLabel>
              <FormControl>
                <Input
                  v-model:model-value="modalStore.selected.contractInfo"
                  type="text"
                  placeholder="Добавьте ссылку"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Separator class="mt-5" />
        </form>
        <SheetFooter>
          <SheetClose as-child class="mt-2">
            <Button
              @click="updateFilial($event)"
              type="submit"
              class="bg-btnPrimary"
              form="dialogForm"
            >
              Сохранить изменения
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "~/components/ui/toast";
import type { IFilial } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";

const listStore = useListStore();
const modalStore = useModalStore();
const CRM_API_INSTANCE = new CRM_API();

const props = defineProps<{
  state: boolean | undefined;
}>();

// Локальное состояние для открытия/закрытия формы
const isOpen = ref(props.state || false);
console.log(modalStore.selected);
const formSchema = toTypedSchema(
  z.object({
    caption: z.string().min(2, "Введите название филиала"),
    city: z.string().min(2, "Введите название города"),
    address: z.string().min(5, "Введите адрес"),
    phone: z.string().min(10, "Введите телефон"),
    timezone: z.string().min(1, "Выберите часовой пояс"),
    contractInfo: z.string().url("Введите корректную ссылку"),
  })
);

const emit = defineEmits(["updateList"]);

const { toast } = useToast();
const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const timezones = [
  { value: "Europe/Kaliningrad", label: "Калининград (GMT+2)" },
  { value: "Europe/Moscow", label: "Москва (GMT+3)" },
  { value: "Europe/Samara", label: "Самара (GMT+4)" },
  { value: "Asia/Yekaterinburg", label: "Екатеринбург (GMT+5)" },
  { value: "Asia/Omsk", label: "Омск (GMT+6)" },
  { value: "Asia/Novosibirsk", label: "Новосибирск (GMT+7)" },
  { value: "Asia/Krasnoyarsk", label: "Красноярск (GMT+7)" },
  { value: "Asia/Irkutsk", label: "Иркутск (GMT+8)" },
  { value: "Asia/Yakutsk", label: "Якутск (GMT+9)" },
  { value: "Asia/Vladivostok", label: "Владивосток (GMT+10)" },
  { value: "Asia/Magadan", label: "Магадан (GMT+11)" },
  { value: "Asia/Kamchatka", label: "Камчатка (GMT+12)" },
];

const updateFilial = async (event: HTMLElementEventMap["click"]) => {
  if (!modalStore.selected.id) {
    throw new Error("Филиал не имеет ID.");
  }

  const updatedFilial = await CRM_API_INSTANCE.filials.update(
    modalStore.selected.id,
    {
      ...modalStore.selected,
    }
  );

  toast({
    title: "Успех",
    description: "Филиал успешно обновлен",
    duration: 5000,
  });

  emit("updateList", updatedFilial);
  modalStore.clearSelected();
};
</script>
