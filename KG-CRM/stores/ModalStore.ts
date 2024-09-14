// export const useModalStore = defineStore("modal", () => {
//   const ModalState = ref<boolean>(false);

//   const ChangeModalState = function (): void {
//     ModalState.value = !ModalState.value;
//   };

//   return {
//     ModalState,
//     ChangeModalState,
//   };
// });

export const useModalStore = defineStore("modal", {
  state: () => ({
    ModalState: false,
    selectedFilial: null as IFilial | null,
  }),
  actions: {
    setSelectedFilial(filial: IFilial) {
      this.selectedFilial = filial;
      this.ModalState = true;
      console.log(this.ModalState);
    },
    clearSelectedFilial() {
      this.selectedFilial = null;
      this.ModalState = false;
      console.log(this.ModalState);
    },
  },
});
