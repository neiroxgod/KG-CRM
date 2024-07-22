<template>
  <div class="flex justify-center items-center min-h-screen">
    <form
      @submit="onSubmit"
      class="border p-6 rounded-2xl w-80 h-80 flex flex-col justify-center items-center"
    >
      <FormField name="username">
        <div class="flex flex-col items-center w-full space-y-3">
          <div class="w-full">
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" class="w-full" v-model="data.username" />
            </FormControl>
          </div>
          <div class="w-full">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input class="w-full" v-model="data.password" />
            </FormControl>
          </div>
        </div>
      </FormField>
      <div class="pt-5 w-full">
        <Button
          type="submit"
          class="w-full"
          @click="handleLogin"
          liquid
          :disabled="isButtonDisabled"
        >
          Submit
        </Button>
      </div>
    </form>
  </div>
</template>
<script setup>
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
