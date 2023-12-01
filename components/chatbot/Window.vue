<template>
  <v-card
    v-if="store.chatOpened"
    class="chat-window mb-2 mr-2 d-flex flex-column"
    min-width="380px"
    max-width="380px"
    elevation="6"
    style="pointer-events: auto"
  >
    <v-toolbar density="compact" class="py-0" flat>
      <v-spacer></v-spacer>

      <v-btn size="small" icon @click="minimizeChat()">
        <v-icon>mdi-window-minimize</v-icon>
      </v-btn>
      <v-btn size="small" icon @click="deactivateBot()">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <chatbot-message-container :messages="store.messages" />

    <v-container class="d-flex flex-row pa-2">
      <v-text-field
        v-model="newMessage"
        class="custom-text-field"
        :label="$t('chatbot.textfield.label')"
        density="compact"
        variant="solo"
        hide-details
        color="primary"
        :disabled="loading"
        @keyup.enter="onSendButtonClick"
      >
        <template v-slot:append-inner>
          <v-btn
            icon
            variant="plain"
            density="default"
            size="default"
            :disabled="newMessage.length === 0"
            color="primary"
            @click="onSendButtonClick"
          >
            <v-icon>mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
const newMessage = ref("");

const store = useChatBotStore();
const { sendMessage, deactivateBot, minimizeChat } = store;
const { loading } = storeToRefs(store);

async function onSendButtonClick() {
  await sendMessage(newMessage.value);
  newMessage.value = "";
}
</script>

<style scoped>
.chat-window {
  height: 80%;
}
</style>
