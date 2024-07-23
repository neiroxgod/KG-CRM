export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);
  const loading = ref(true);

  function setToken(newToken) {
    token.value = newToken;
  }

  function setUser(newUser) {
    user.value = newUser;
  }

  function setLoading(value) {
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
