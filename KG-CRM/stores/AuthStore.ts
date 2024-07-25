export const useLoginStore = defineStore("login", () => {
  const loginState = ref<string>("login");

  const setState = (state: string): void => {
    loginState.value = state;
  };

  const layoutName = computed(() => loginState.value as string);

  return {
    loginState,
    layoutName,
    setState,
  };
});
