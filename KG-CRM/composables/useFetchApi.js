export default (token) => {
  return async (url, options = {}) => {
    return await $fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`, // Используйте токен, когда он будет передан
      },
    });
  };
};
