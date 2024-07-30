export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<Object | null>(null);
  const loading = ref<Boolean>(true);

  function setToken(newToken: string): void {
    token.value = newToken;
    localStorage.setItem("token", newToken);

    console.log(newToken);
  }

  function setUser(newUser: Object): void {
    user.value = newUser;
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  function setLoading(value: Boolean): void {
    loading.value = value;
  }

  function loadFromLocalStorage(): void {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        token.value = storedToken;
      }

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        user.value = JSON.parse(storedUser);
      }
    }
  }

  // Загрузка данных из localStorage при инициализации на клиенте
  if (typeof window !== "undefined") {
    loadFromLocalStorage();
  }

  return {
    token,
    user,
    loading,
    setToken,
    setUser,
    setLoading,
    loadFromLocalStorage,
  };
});
