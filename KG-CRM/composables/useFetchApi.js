export default (url, options = {}) => {
  try {
    const { useAuthToken } = useAuth();

    const authTokenValue = useAuthToken().value;

    return $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: authTokenValue ? `Bearer ${authTokenValue}` : "",
      },
    });
  } catch (error) {
    console.error("Ошибка получения токена авторизации:", error);
    // Обработка ошибки или возврат значения по умолчанию
    return $fetch(url, options);
  }
};
