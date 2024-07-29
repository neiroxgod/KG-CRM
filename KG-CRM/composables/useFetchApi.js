export default (token) => {
  return async (url, options = {}) => {
    const config = useRuntimeConfig();
    console.log("config", config);
    return await useFetch(`http://localhost:7000${url}`, {
      baseURL: config.public.baseURL,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Используйте токен, когда он будет передан
      },
    });
  };
};
