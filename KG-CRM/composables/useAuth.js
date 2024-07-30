import useFetchApi from "@/composables/useFetchApi";
import { useAuthStore } from "@/stores/UserStore";

export default () => {
  const authStore = useAuthStore(); //Pinia stores/UserStore

  const login = async ({ username, password }) => {
    const fetchApi = useFetchApi(authStore.token);
    authStore.setLoading(true);
    try {
      const data = await fetchApi("/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });
      console.log(data);
      authStore.setToken(data[0].token.token);
      authStore.setUser(data[0].employer);
      // console.log(authStore);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      authStore.setLoading(false);
    }
  };

  const register = async ({
    username,
    email,
    phone,
    password,
    name,
    caption,
    repeatPassword,
  }) => {
    const fetchApi = useFetchApi(authStore.token);

    if (password !== repeatPassword) {
      return "passwords do not match";
    }

    authStore.setLoading(true);

    try {
      const data = await fetchApi("/auth/register", {
        method: "POST",
        body: {
          email,
          name,
          phone,
          caption,
          username,
          password,
        },
      });
      authStore.setToken(data[0].token.token);
      authStore.setUser(data[0].employer);
    } catch (error) {
      console.error("register error:", error);
      throw error;
    } finally {
      authStore.setLoading(false);
    }
  };

  const initAuth = async () => {
    const fetchApi = useFetchApi(localStorage.getItem("token"));

    const data = ref(null);
    const status = ref("pending");
    const error = ref(null);

    authStore.setLoading(true);
    try {
      const response = await fetchApi("/auth/verify");
    } catch (e) {
      authStore.setToken(null);
      authStore.setUser(null);
      navigateTo("/employerAuth");
      console.error("initAuth error:", e);
      throw e;
    } finally {
      authStore.setLoading(false);
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      authStore.setToken(null);
      authStore.setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return {
    login,
    register,
    initAuth,
    logout,
  };
};
