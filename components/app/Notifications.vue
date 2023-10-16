<template>
  <v-container
    :style="{
      position: 'fixed',
      zIndex: 10000,
      left: 0,
      right: 0,
      top: '120px'
    }"
    class="d-flex flex-column justify-center pa-0"
    fluid
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        xs="12"
        sm="8"
        md="6"
        lg="4"
        xl="4"
        xxl="2"
        offset="12"
        offset-xs="0"
        offset-sm="3"
        offset-md="5"
        offset-lg="7"
        offset-xl="7"
        offset-xxl="9"
      >
        <AppNotification
          v-for="item in store.items"
          class="mt-2"
          :key="item.id"
          :type="item.type"
          :title="item.title"
          :message="item.message"
          @remove="remove(item.id)"
          @mouseenter="pauseNotificationTimeout(item.id)"
          @mouseleave="resumeNotificationTimeout(item.id)"
        >
          <!-- {{ item.message }}
    <v-btn icon @click="removeNotification(item.id)">
      <v-icon>mdi-close</v-icon>
    </v-btn> -->
        </AppNotification>
        <!-- <AppNotification
          class="mt-2"
          type="success"
          title="Title Success"
          message="Der neue Roman vom Autor des Weltbestsellers Jazz ..."
        />
        <AppNotification
          class="mt-2"
          type="error"
          title="Title Error"
          message="Der neue Roman vom Autor des Weltbestsellers Jazz ..."
        />
        <AppNotification
          class="mt-2"
          type="info"
          title="Title Info"
          message="Der neue Roman vom Autor des Weltbestsellers Jazz ..."
        />
        <AppNotification
          class="mt-2"
          type="warning"
          title="Title Warning"
          message="Der neue Roman vom Autor des Weltbestsellers Jazz ..."
        >
        </AppNotification> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useNotificationStore } from "../../stores/notifications";
const store = useNotificationStore();
const { removeNotification, pauseNotificationTimeout, resumeNotificationTimeout } = store;

function remove(id: string) {
  console.log("remove", id);
  removeNotification(id);
}
</script>
<style scoped>
.notification-container {
  position: fixed;
  top: 10px; /* Adjust this to set the distance from the top */
  right: 10px;
  width: 300px;
  z-index: 1000;
}
.notification {
  /* You can remove the position: fixed; from the notification as they will now stack inside the container */
  width: 100%;
  margin-bottom: 10px; /* Add space between notifications */
}
</style>
