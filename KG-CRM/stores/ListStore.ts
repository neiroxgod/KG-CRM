export const useListStore = defineStore("list", () => {
  const listState = ref<any[]>([]);

  const addToList = function (item: Object): void {
    listState.value.push(item);
  };

  const removeFromList = (id: number): void => {
    listState.value = listState.value.filter((item) => item.id !== id);
  };

  const updateList = (item: any): void => {
    const index = listState.value.findIndex((el) => el.id === item.id);
    if (index !== -1) {
      listState.value[index] = { ...listState.value[index], ...item };
    }
  };

  return {
    listState,
    addToList,
    removeFromList,
    updateList,
  };
});
