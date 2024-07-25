<template>
  <form
    @submit="onSubmit"
    class="border p-6 bg-white shadow-md w-1/3 h-screen flex flex-col"
  >
    <FormField name="username">
      <div class="flex flex-col items-center w-full space-y-3">
        <div class="text-3xl font-inter font-bold">Вход в CRM</div>
        <div class="w-full">
          <FormLabel>Логин</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-model="data.username" />
          </FormControl>
        </div>
        <div class="w-full">
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input class="w-full" v-model="data.password" />
          </FormControl>
        </div>
      </div>
    </FormField>
    <div class="pt-5 w-full">
      <SharedAddButton
        label="Войти"
        icon=""
        type="submit"
        class="w-full"
        @click="handleLogin"
        liquid
        :disabled="isButtonDisabled"
      />
      <div class="text-center mt-2">Еще нет аккаунта?</div>
      <Button
        class="w-full mt-2"
        @click="
          loginStore.setState('register');
          $event.preventDefault();
          $event.stopPropagation();
        "
        >Создать аккаунт</Button
      >
    </div>
  </form>
</template>

<script setup lang="ts">
const loginStore = useLoginStore();
const data = reactive({
  username: "",
  password: "",
  loading: false,
});

async function handleLogin() {
  const { login } = useAuth();

  data.loading = true;
  try {
    await login({
      username: data.username,
      password: data.password,
    });
    navigateTo("/");
  } catch (error) {
    console.log(error);
  } finally {
    data.loading = false;
  }
}

const isButtonDisabled = computed(() => {
  return !data.username || !data.password || data.loading;
});
</script>
