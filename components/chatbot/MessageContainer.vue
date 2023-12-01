<template>
  <div
    ref="chatMessagesContainer"
    class="pa-2 d-flex flex-column h-100 pb-2"
    :style="{
      overflowY: 'scroll'
    }"
  >
    <chatbot-message
      v-for="message in messages"
      :key="message.id"
      :type="message.type"
      :message="message.text"
      :loading="message.loading"
      :url="message.url"
      :title="message.title"
      :date="message.date"
    >
    </chatbot-message>
  </div>
</template>

<script lang="ts" setup>
import type { ChatMessage } from "@/stores/chatBot";
const chatMessagesContainer = ref<HTMLElement | null>(null);
const scrollPosition = ref(0);
const { y } = useScroll(chatMessagesContainer);
type MessageContainerProps = {
  messages: ChatMessage[];
  loading?: boolean;
};

const props = defineProps<MessageContainerProps>();
const { messages } = toRefs(props);
const store = useChatBotStore();
const { chatOpened, error } = storeToRefs(store);

const { addNotification } = useNotificationStore();
watch(
  chatOpened,
  (value) => {
    console.log("chatOpened", value);
    nextTick(() => {
      if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTop = scrollPosition.value;
      }
    });
  },

  { immediate: true }
);

watch(
  error,
  (value) => {
    if (!value) return;
    console.log("error", JSON.stringify(value));
    addNotification({
      title: "Error",
      message: JSON.stringify(value),
      type: "error"
    });
  },
  { immediate: true }
);

watch(
  messages,
  () => {
    nextTick(() => {
      if (chatMessagesContainer.value) {
        chatMessagesContainer.value.scrollTop = chatMessagesContainer.value.scrollHeight;
      }
    });
  },

  { immediate: true }
);
watch(
  y,
  () => {
    // scrollPosition.value = y.value;
  },

  { immediate: true }
);
</script>

<style scoped></style>
