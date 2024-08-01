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

function getMainRouteSegment(path: string): string | undefined {
  const segments = path.split("/admin")[1]?.split("/");
  return segments ? segments[1] : undefined;
}

const deleteItem = async function () {
  const path = getMainRouteSegment(route.fullPath);

  const fetchApi = useFetchApi(userStore.token);
  await fetchApi("/" + path + "/delete/" + props.item.id);

  listStore.removeFromList(props.item.id);
  toast({
    description: "Запись удалена!",
    duration: 3000,
  });
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
      <DropdownMenuItem> Редактировать </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="deleteItem" class="text-red-500">
        Удалить
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
