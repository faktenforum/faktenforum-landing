import { defineStore } from "pinia";
import { nanoid } from "nanoid";
export type MessageTypes = "info" | "success" | "warning" | "error";
export type NotificationBase = {
  title: string;
  message?: string;
  type: MessageTypes;
  timeout?: number;
};
export type Notification = {
  id: string;
  timeoutHandle: NodeJS.Timeout;
  createdAt: number;
  timeout: number;
} & NotificationBase;

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    items: [] as Notification[],
    defaultTimeout: 5000
  }),

  actions: {
    addNotification({ title, message, type, timeout }: NotificationBase) {
      const duplicate = this.items.find(
        (item) => item.title === title && item.message === message && item.type === type
      );
      if (duplicate) {
        return;
      }
      const id = nanoid();
      const _timeout = timeout || this.defaultTimeout;
      const item: Notification = {
        id,
        title,
        message,
        type: type,
        timeout: _timeout,
        timeoutHandle: setTimeout(() => {
          this.removeNotification(id);
        }, _timeout),
        createdAt: Date.now()
      };
      // check if duplicate message with same tile and message typ exists

      this.items = [item, ...this.items];
    },

    removeNotification(id: String) {
      console.log("removeNotification", id);
      console.log("this.items", this.items);
      this.items = this.items.filter((item) => item.id !== id);
    },

    pauseNotificationTimeout(id: String) {
      const item = this.items.find((item) => item.id === id);
      if (item) {
        clearTimeout(item.timeoutHandle);
      }
    },
    resumeNotificationTimeout(id: String) {
      console.log("resumeNotificationTimeout");
      const item = this.items.find((item) => item.id === id);
      if (item) {
        const remaining = item.timeout - (Date.now() - item.createdAt);
        console.log("Remaining time of " + item.id, remaining);
        if (remaining <= 0) {
          this.removeNotification(id);
        } else {
          item.timeoutHandle = setTimeout(() => {
            this.removeNotification(id);
          }, remaining);
        }
      }
    }
  }
});
