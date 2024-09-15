<script setup lang="ts">
import { MoreHorizontal } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useToast } from "~/components/ui/toast";
const props = defineProps<{
  item: {
    id: number;
  };
}>();

const route = useRoute();
const userStore = useAuthStore();
const listStore = useListStore();
const { toast } = useToast();
const emit = defineEmits(["deleteItem", "editItem"]);

function getMainRouteSegment(path: string): string | undefined {
  const segments = path.split("/admin")[1]?.split("/");
  return segments ? segments[1] : undefined;
}

const deleteItem = async function () {
  let path = getMainRouteSegment(route.fullPath);
  if (path == "employers") path = "users"; // !!! НЕ ВЫНОСИТЬ В getMainRouteSegment так как используется ниже с employers !!! Нет эндпоинта employers/delete, так как users/employers смежные сущности
  const fetchApi = useFetchApi(userStore.token);
  await fetchApi("/" + path + "/delete/" + props.item.id, {
    method: "DELETE",
  });
  listStore.removeFromList(props.item.id);
  toast({
    description: "Запись удалена!",
    duration: 3000,
  });
};

const editItem = function () {
  // const ModalStore = useModalStore(); //Убрал эту логику твою с редактированием филиалов, оставь просто по клику на фио редактирование, либо делай редактирование разделом через [id].vue
  // ModalStore.ChangeModalState();
  // console.log(ModalStore.ModalState);
  navigateTo(
    "/admin/" + getMainRouteSegment(route.fullPath) + "/" + props.item.id
  );
};
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Открыть меню</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="editItem()"> Редактировать </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="deleteItem" class="text-red-500">
        Удалить
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
