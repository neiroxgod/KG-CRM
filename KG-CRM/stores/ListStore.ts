export const useListStore = defineStore("list", () => {
  const listState = ref<any[]>([]);
  const addToList = function (item: Object): void {
    listState.value = [...listState.value, item];
  };

  const removeFromList = (id: number): void => {
    listState.value = listState.value.filter((item) => item.id !== id);
  };

  const updateList = (item: any): void => {
    listState.value = listState.value.map((el) =>
      el.id === item.id ? { ...el, ...item } : el
    );
  };

  return {
    listState,
    addToList,
    removeFromList,
    updateList,
  };
});
