export const useModalStore = defineStore("modal", () => {
  const ModalState = ref<boolean>(false);

  const ChangeModalState = function (): void {
    ModalState.value = !ModalState.value;
  };

  return {
    ModalState,
    ChangeModalState,
  };
});
