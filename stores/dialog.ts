import { defineStore } from "pinia";
import { nanoid } from "nanoid";

export type DialogAction = {
  action: Function;
  label: string;
  icon?: string;
};
export type Dialog = {
  title: string;
  message: string;
  actions: DialogAction[];
  persistent?: boolean;
};

export const useDialogStore = defineStore("dialog", {
  state: () => ({
    current: null as Dialog | null
  }),

  actions: {
    openDialog(dialog: Dialog) {
      this.current = dialog;
    },
    closeDialog() {
      this.current = null;
    }
  }
});
