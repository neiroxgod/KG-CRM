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
    selected: null as any | null,
  }),
  actions: {
    setSelected(item: any) {
      this.selected = item;
      this.ModalState = true;
      console.log(this.ModalState);
    },
    clearSelected() {
      this.selected = null;
      this.ModalState = false;
      console.log(this.ModalState);
    },
  },
});
