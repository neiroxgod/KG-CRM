<template>
  <form
    @submit="handleSubmit(onSubmit)"
    class="border p-6 bg-white shadow-md w-1/3 h-screen flex flex-col"
  >
    <div class="text-3xl font-inter font-bold">Создание аккаунта</div>
    <div class="flex flex-col items-center w-full space-y-3">
      <FormField v-slot="{ componentField }" name="userFio">
        <FormItem class="w-full">
          <FormLabel>ФИО</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.userFio">{{ errors.userFio }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="caption">
        <FormItem class="w-full">
          <FormLabel>Название школы</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.caption">{{ errors.caption }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="w-full">
          <FormLabel>Почта</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.email">{{ errors.email }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="username">
        <FormItem class="w-full">
          <FormLabel>Логин</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.username">{{
            errors.username
          }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="w-full">
          <FormLabel>Пароль</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.password">{{
            errors.password
          }}</FormMessage>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="repeatPassword">
        <FormItem class="w-full">
          <FormLabel>Повторите пароль</FormLabel>
          <FormControl>
            <Input type="text" class="w-full" v-bind="componentField" />
          </FormControl>
          <FormMessage v-if="errors.repeatPassword">{{
            errors.repeatPassword
          }}</FormMessage>
        </FormItem>
      </FormField>
    </div>
    <div class="pt-5 w-full">
      <SharedAddButton
        label="Создать аккаунт"
        icon=""
        type="submit"
        class="w-full"
        liquid
      />
      <div class="text-center mt-2">Уже есть аккаунт?</div>
      <Button
        class="w-full mt-2"
        @click="
          loginStore.setState('login');
          $event.preventDefault();
          $event.stopPropagation();
        "
        >Войти с паролем</Button
      >
    </div>
  </form>
</template>

<script setup>
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Toast } from "~/components/ui/toast";

const loginStore = useLoginStore();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, {
      message: "Пожалуйста, укажите логин.",
      required_error: "Пожалуйста, укажите логин.",
    }),
    userFio: z.string().min(1, {
      message: "Пожалуйста, введите ваше ФИО.",
      required_error: "Пожалуйста, введите ваше ФИО.",
    }),
    email: z.string().email({
      message: "Пожалуйста, введите корректную почту.",
      required_error: "Пожалуйста, введите корректную почту.",
    }),
    caption: z.string().min(1, {
      message: "Пожалуйста, укажите название вашей школы",
      required_error: "Пожалуйста, укажите название вашей школы",
    }),
    password: z.string().min(6, {
      message: "Пароль должен содержать хотя бы 6 символов.",
      required_error: "Пароль должен содержать хотя бы 6 символов.",
    }),
    repeatPassword: z.string().min(6, {
      message: "Пароль должен содержать хотя бы 6 символов.",
      required_error: "Пароль должен содержать хотя бы 6 символов.",
    }),
  })
);

const { handleSubmit, errors } = useForm({
  validationSchema: formSchema,
});

const onSubmit = (values) => {
  console.log("FORM SUBMITED", values);
  Toast({
    title: "You submitted the following values:",
    description: h(
      "pre",
      { class: "mt-2 w-[340px] rounded-md bg-slate-950 p-4" },
      h("code", { class: "text-white" }, JSON.stringify(values, null, 2))
    ),
  });
};

async function handleLogin() {
  const { login } = useAuth();

  userData.value.loading = true;
  try {
    await login({
      username: userData.value.username,
      password: userData.value.password,
    });
    navigateTo("/");
  } catch (error) {
    console.log(error);
  } finally {
    userData.value.loading = false;
  }
}
</script>
