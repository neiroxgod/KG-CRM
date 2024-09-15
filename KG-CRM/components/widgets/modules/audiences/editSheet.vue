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
                id="terms"
                v-model:checked="modalStore.selected.active"
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
              <FormLabel>Название аудитории</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Наименование филиала"
                  v-bind="componentField"
                  v-model:model-value="modalStore.selected.caption"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="filialId">
            <FormItem class="w-full">
              <FormLabel>Филиал аудитории</FormLabel>
              <FormControl>
                <SharedSelectWithLabel
                  :items="filials!"
                  v-model:model-value="modalStore.selected.filialId"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="capacity">
            <FormItem class="w-full">
              <FormLabel>Вместимость аудитории</FormLabel>
              <FormControl>
                <NumberField
                  v-model:model-value="modalStore.selected.capacity"
                  :default-value="0"
                  :min="0"
                >
                  <NumberFieldContent>
                    <NumberFieldDecrement />
                    <NumberFieldInput />
                    <NumberFieldIncrement />
                  </NumberFieldContent>
                </NumberField>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <Separator class="mt-5" />
        </form>
        <SheetFooter>
          <SheetClose as-child class="mt-2">
            <Button
              @click="updateBrunch($event)"
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
import type { IBrunch, IFilial } from "~/composables/interfaces";
import { CRM_API } from "~/composables/getList";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

const listStore = useListStore();
const modalStore = useModalStore();
const CRM_API_INSTANCE = new CRM_API();

const props = defineProps<{
  state: boolean | undefined;
}>();

console.log(modalStore.selected);
// Локальное состояние для открытия/закрытия формы
const isOpen = ref(props.state || false);

const formSchema = toTypedSchema(
  z.object({
    active: z.boolean(),
    caption: z.string().min(1, "Укажите название аудитории"),
    filialId: z.number().min(1, "Укажите филиал"),
    capacity: z.number().min(0, "Укажите вместимость аудитории"),
  })
);

const emit = defineEmits(["updateList"]);
const filials = ref<IFilial[]>([]);
const { toast } = useToast();
const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const updateBrunch = async (event: HTMLElementEventMap["click"]) => {
  const updatedBrunch = await CRM_API_INSTANCE.brunches.update(
    modalStore.selected
  );

  listStore.updateList(updatedBrunch);

  toast({
    title: "Успех",
    description: "Аудитория успешно обновлена",
    duration: 5000,
  });

  modalStore.clearSelected();
};

onBeforeMount(async () => {
  filials.value = await CRM_API_INSTANCE.filials.getList();
});
</script>
