<template>
  <div class="bot mx-1 my-3 me-auto" color="primary" v-if="$props.type === 'bot'">
    <v-progress-circular v-if="loading" color="white" indeterminate :size="39" />
    {{ message }}
  </div>
  <div class="user mx-1 my-3" v-else-if="$props.type === 'user'">
    <v-progress-circular v-if="loading" indeterminate :size="39" />{{ message }}
  </div>
  <div class="article mx-1 mt-0 mb-4" v-else-if="$props.type === 'article'">
    <a :href="url" target="_blank" class="d-flex flex-column">
      <v-list lines="two" class="">
        <v-list-item class="pb-0" :title="title" :subtitle="message">
          <template v-slot:prepend>
            <v-container class="pa-0 pr-2 ma-0">
              <v-img
                aspect-ratio="4/3"
                cover
                height="60"
                width="80"
                :src="`/api/post-image?url=${encodeURIComponent(url)}`"
              />
            </v-container>
          </template>
        </v-list-item>
      </v-list>
      <span class="pr-6 pb-4 text-right">weiter lesen</span>
    </a>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessageTypes } from "@/stores/chatBot";
type ChatMessageProps = {
  type: ChatMessageTypes;
  message: string;
  loading?: boolean;
  url?: string;
  title?: string;
  date?: string;
};
const props = defineProps<ChatMessageProps>();
</script>

<style scoped>
.bot {
  background-color: rgb(var(--v-theme-primary));
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
}
.user {
  background-color: rgb(var(--v-theme-background));
  border-radius: 10px;
  padding: 10px;
  max-width: 80%;
  align-self: flex-end;
}
.article {
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 2px;
  padding: 0px;
  max-width: 100%;
}
/* Your CSS here */
</style>
