import { jwtDecode } from "jwt-decode";
import useFetchApi from "@/composables/useFetchApi"; // Импортируем useFetchApi
import { useAuthStore } from "@/stores/UserStore.js"; // Импортируем хранилище

export default () => {
  const authStore = useAuthStore(); // Получаем состояние из Pinia

  const login = async ({ username, password }) => {
    const fetchApi = useFetchApi(authStore.token); // Получаем fetchApi с токеном
    authStore.setLoading(true); // Устанавливаем состояние загрузки
    try {
      const data = await fetchApi("/api/auth/login", {
        method: "POST",
        body: {
          username,
          password,
        },
      });
      authStore.setToken(data.access_token); // Устанавливаем токен
      authStore.setUser(data.user); // Устанавливаем пользователя
      return true;
    } catch (error) {
      console.error("Login error:", error); // Логируем ошибку
      throw error; // Пробрасываем ошибку
    } finally {
      authStore.setLoading(false); // Завершаем загрузку
    }
  };

  const refreshToken = async () => {
    const fetchApi = useFetchApi(authStore.token); // Получаем fetchApi с токеном
    try {
      const data = await fetchApi("/api/auth/refresh");
      authStore.setToken(data.access_token); // Устанавливаем новый токен
      return true;
    } catch (error) {
      console.error("Refresh token error:", error);
      throw error;
    }
  };

  const getUser = async () => {
    const fetchApi = useFetchApi(authStore.token); // Получаем fetchApi с токеном
    try {
      const data = await fetchApi("/api/auth/user");
      authStore.setUser(data.user); // Устанавливаем пользователя
      return true;
    } catch (error) {
      console.error("Get user error:", error);
      throw error;
    }
  };

  const reRefreshAccessToken = () => {
    const jwt = jwtDecode(authStore.token); // Используем токен из хранилища
    const newRefreshTime = jwt.exp * 1000 - Date.now() - 60000; // Убедитесь, что время в миллисекундах

    setTimeout(async () => {
      await refreshToken();
      reRefreshAccessToken();
    }, newRefreshTime);
  };

  const initAuth = async () => {
    authStore.setLoading(true); // Устанавливаем состояние загрузки
    try {
      await refreshToken();
      await getUser();
      reRefreshAccessToken();
      return true;
    } catch (error) {
      console.error("Init auth error:", error);
      throw error; // Пробрасываем ошибку
    } finally {
      authStore.setLoading(false); // Завершаем загрузку
    }
  };

  const logout = async () => {
    const fetchApi = useFetchApi(authStore.token); // Получаем fetchApi с токеном
    try {
      await fetchApi("/api/auth/logout", { method: "POST" });
      authStore.setToken(null); // Убираем токен
      authStore.setUser(null); // Убираем пользователя
    } catch (error) {
      console.error("Logout error:", error);
      throw error; // Пробрасываем ошибку
    }
  };

  return {
    login,
    initAuth,
    logout,
    refreshToken,
    getUser,
    reRefreshAccessToken,
  };
};
