<template>
  <v-dialog v-model="open" width="auto" :persistent="!!current.persistent">
    <v-card class="solid-primary-outline">
      <v-card-title class="text-h5 text-color-primary">
        {{ current.title }}
      </v-card-title>
      <v-card-text>
        {{ current.message }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          v-for="item in current.actions || []"
          :key="item.label"
          color="primary"
          :icon="item.icon"
          @click="
            item.action();
            open = false;
          "
          >{{ item.label }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { useDialogStore } from "@/stores/dialog";
import type { Dialog } from "@/stores/dialog";
const store = useDialogStore();
const { closeDialog } = store;
const { current: storeValue } = storeToRefs(store);
const current = ref<Dialog>({
  title: "",
  message: "",
  actions: [],
  persistent: false
});
const open = ref(false);
watch(open, (value) => {
  if (!value) {
    closeDialog();
  }
});
watch(storeValue, (value) => {
  if (value) {
    open.value = true;
    current.value = value;
  }
});
</script>
