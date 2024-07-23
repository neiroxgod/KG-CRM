<script setup>
const layout = "default";
const { useAuthUser, initAuth } = useAuth();
const user = useAuthUser();

if (!user) {
  navigateTo("/employerAuth");
} else {
  console.log(user);
}
</script>

<template>
  <NuxtLayout :name="layout"> </NuxtLayout>
</template>
