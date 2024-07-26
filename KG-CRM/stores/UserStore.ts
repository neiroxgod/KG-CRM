export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<Object | null>(null);
  const loading = ref<Boolean>(true);

  function setToken(newToken: string): void {
    token.value = newToken;
  }

  function setUser(newUser: Object): void {
    user.value = newUser;
  }

  function setLoading(value: Boolean): void {
    loading.value = value;
  }

  return {
    token,
    user,
    loading,
    setToken,
    setUser,
    setLoading,
  };
});
