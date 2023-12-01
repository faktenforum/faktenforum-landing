<template>
  <div class="chat-overlay d-flex flex-column-reverse align-end" v-if="store.botActivated">
    <v-btn
      v-if="!store.chatOpened"
      style="pointer-events: auto"
      density="comfortable"
      icon="mdi-plus"
      class="chat-button ma-4"
      color="primary"
      size="x-large"
      @click="maximizeChat"
    >
      <v-icon>mdi-chat</v-icon>
    </v-btn>

    <chatbot-window />
  </div>
</template>

<script lang="ts" setup>
import { useChatBotStore } from "#imports";

const newMessage = ref("");

const store = useChatBotStore();
const { maximizeChat } = store;
</script>

<style scoped>
.chat-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
}
</style>
