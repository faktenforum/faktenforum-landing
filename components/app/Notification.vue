<template>
  <v-alert
    :color="type"
    :icon="icon"
    :title="title"
    :text="message"
    closable
    @click:close="emits('remove')"
  ></v-alert>
</template>

<script lang="ts" setup>
type NotificationProps = {
  title?: string;
  message?: string;
  type: "info" | "success" | "error" | "warning";
};
const props = defineProps<NotificationProps>();
const emits = defineEmits(["remove"]);
const icon = computed(() => {
  switch (props.type) {
    case "success":
      return "mdi-check-circle";
    case "error":
      return "mdi-alert-circle";
    case "warning":
      return "mdi-alert";
    default:
      return "mdi-information";
  }
});

const iconColor = computed(() => {
  switch (props.type) {
    case "success":
      return "green";
    case "error":
      return "red";
    case "warning":
      return "orange";
    default:
      return "blue";
  }
});
</script>

<style scoped></style>
