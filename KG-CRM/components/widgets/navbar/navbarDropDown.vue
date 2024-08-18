<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex align-middle items-center" as-child>
      <div class="cursor-pointer">
        <div class="h-10 w-10 bg-slate-300 mr-2 rounded-md"></div>
        <Label v-if="user">{{ user.name }}</Label>
        <icon name="material-symbols:expand-more" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56 mr-5">
      <DropdownMenuLabel>{{ user!.name }}</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User class="mr-2 h-4 w-4" />
          <span>Профиль</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard class="mr-2 h-4 w-4" />
          <span>Подписка</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings class="mr-2 h-4 w-4" />
          <span>Настройки</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LifeBuoy class="mr-2 h-4 w-4" />
        <span>Поддержка</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="handleLogOut">
        <LogOut class="mr-2 h-4 w-4" />
        <span>Выйти</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-vue-next";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const userStore = useAuthStore();
const user = computed(() => userStore.user?.user);
console.log("USER", user.value);
const handleLogOut = (): void => {
  useAuth().logout();
  navigateTo("/");
};
</script>
