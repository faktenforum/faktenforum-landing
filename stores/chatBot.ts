import { defineStore } from "pinia";
import { nanoid } from "nanoid";
import type { FetchError } from "ofetch";

export type ChatMessageTypes = "bot" | "user" | "article";

export type ChatMessage = {
  id: number;
  text: string;
  type: ChatMessageTypes;
  loading?: boolean;
  date?: string;
  url?: string;
  title?: string;
};

export type BotResponse = {
  data: {
    metadata: {
      _id: {
        $oid: string;
      };
      articleUrl: string;
      claim: string;
      date: string;
      id: string;
      label: string;
      reviewTitle: string;
      summary: string;
    };
    response: string;
  };
  message: string;
};

export const useChatBotStore = defineStore("chatBot", {
  state: () => ({
    messages: ref<ChatMessage[]>([]),
    botActivated: false,
    chatOpened: false,
    loading: false,
    error: null as Error | FetchError | null
  }),

  actions: {
    minimizeChat() {
      this.chatOpened = false;
    },
    maximizeChat() {
      this.chatOpened = true;
    },
    clearMessages() {
      this.messages = [];
    },
    deactivateBot() {
      this.botActivated = false;
      this.chatOpened = false;
    },
    activateBot() {
      this.botActivated = true;
      this.chatOpened = true;
    },

    async sendMessage(message: string) {
      if (message === "") return;
      const botResponse = { id: Date.now(), text: "", type: "bot", loading: true };
      this.messages = [
        ...this.messages,
        { id: Date.now(), text: message, type: "user" },
        botResponse as any
      ];
      setTimeout(async () => {
        try {
          const response = await $fetch<BotResponse>("/api/bot", {
            method: "POST",
            body: { query: message },
            timeout: 30000
          });

          botResponse.text = response.data.response;
          botResponse.loading = false;
          console.log("metadata", response.data.metadata);
          if (response.data.metadata.articleUrl) {
            const article = {
              id: Date.now(),
              text: response.data.metadata.summary,
              type: "article",
              date: response.data.metadata.date,
              url: response.data.metadata.articleUrl,
              title: response.data.metadata.reviewTitle
            };
            this.messages.push(article as any);
          }

          this.messages = [...this.messages];
          botResponse.loading = false;
        } catch (err) {
          botResponse.loading = false;
          this.messages = [...this.messages];
          this.loading = false;
          this.error = err as Error;
        }
      }, 0);
    }
  }
});
