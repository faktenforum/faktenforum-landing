import { defineStore } from "pinia";
import { nanoid } from "nanoid";
type MessageTypes = "info" | "success" | "warning" | "error";
type Notification = {
  id: string;
  title: string;
  message?: string;
  type: MessageTypes;
  timeout: number;
  timeoutHandle: NodeJS.Timeout;
  createdAt: number;
};

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    items: [] as Notification[],
    defaultTimeout: 5000
  }),

  actions: {
    addNotification({
      title,
      message,
      messageType,
      timeout
    }: {
      title: string;
      message?: string;
      messageType: MessageTypes;
      timeout: number;
    }) {
      const id = nanoid();
      const _timeout = timeout || this.defaultTimeout;
      const item: Notification = {
        id,
        title,
        message,
        type: messageType,
        timeout: _timeout,
        timeoutHandle: setTimeout(() => {
          this.removeNotification(id);
        }, timeout),
        createdAt: Date.now()
      };

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
