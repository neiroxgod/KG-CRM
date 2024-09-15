<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button variant="outline"> Создать </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-2">
        <SheetTitle>Создание аудитории</SheetTitle>
      </SheetHeader>
      <!--  -->
      <Separator />
      <form class="mt-2">
        <FormField v-slot="{ componentField }" name="active">
          <FormItem class="w-full mb-2">
            <Checkbox id="terms" v-model:checked="newBrunch.active" />

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
                v-model:model-value="newBrunch.caption"
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
                v-model:model-value="newBrunch.filialId"
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
                v-model:model-value="newBrunch.capacity"
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
            @click="createBrunch($event)"
            variant="outline"
            form="dialogForm"
          >
            Создать аудиторию
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "~/components/ui/toast";
import { CRM_API } from "~/composables/getList";
import type { IBrunch, IFilial } from "~/composables/interfaces";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";

const CRM_API_INSTANCE = new CRM_API();
const filials = ref<IFilial[]>();
const listStore = useListStore();

const formSchema = toTypedSchema(
  z.object({
    active: z.boolean(),
    caption: z.string().min(1, "Укажите название аудитории"),
    filialId: z.number().min(1, "Укажите филиал"),
    capacity: z.number().min(0, "Укажите вместимость аудитории"),
  })
);

const { toast } = useToast();

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const newBrunch = ref<IBrunch>({
  active: false,
  filialId: 0,
  caption: "",
  capacity: 0,
});

const createBrunch = async (event: HTMLElementEventMap["click"]) => {
  const { active, filialId, caption, capacity } = newBrunch.value;

  try {
    const createdBrunch = await CRM_API_INSTANCE.brunches.create({
      active,
      filialId,
      caption,
      capacity,
    });

    listStore.listState = [...listStore.listState, createdBrunch];

    toast({
      title: "Аудитория создана",
      duration: 4000,
    });
  } catch (error) {
    console.error(error);
  }
};

onBeforeMount(async () => {
  filials.value = (await CRM_API_INSTANCE.filials.getList()) as IFilial[];
});
</script>
