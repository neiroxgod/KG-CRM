import { jwtDecode } from "jwt-decode";
import useFetchApi from "@/composables/useFetchApi";
import { useAuthStore } from "@/stores/UserStore";

export default () => {
  const authStore = useAuthStore(); //Pinia stores/UserStore

  const login = async ({ username, password }) => {
    const fetchApi = useFetchApi(authStore.token);
    authStore.setLoading(true);
    try {
      const data = await fetchApi("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });
      authStore.setToken(data.access_token);
      authStore.setUser(data.user);
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
      const data = await fetchApi("/api/auth/register", {
        method: "POST",
        body: {
          email,
          name,
          phone,
          caption,
          username,
          password,
          repeatPassword,
        },
      });

      await login({ username, password });
    } catch (error) {
      console.error("register error:", error);
      throw error;
    } finally {
      authStore.setLoading(false);
    }
  };

  const refreshToken = async () => {
    const fetchApi = useFetchApi(authStore.token);
    try {
      const data = await fetchApi("/api/auth/refresh");
      authStore.setToken(data.access_token);
      return true;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  };

  const getUser = async () => {
    const fetchApi = useFetchApi(authStore.token);
    try {
      const data = await fetchApi("/api/auth/user");
      authStore.setUser(data.user);
      return true;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  };

  const reRefreshAccessToken = () => {
    const jwt = jwtDecode(authStore.token); // Используем токен из хранилища
    const newRefreshTime = jwt.exp * 1000 - Date.now() - 60000;

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = async () => {
    authStore.setLoading(true);
    try {
      await refreshToken();
      await getUser();
      reRefreshAccessToken();
      return true;
    } catch (error) {
      console.error("Init auth error:", error);
      throw error;
    } finally {
      authStore.setLoading(false);
    }
  };

  const logout = async () => {
    const fetchApi = useFetchApi(authStore.token);
    try {
      await fetchApi("/api/auth/logout", { method: "POST" });
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
    refreshToken,
    getUser,
    reRefreshAccessToken,
  };
};
