<template>
  <v-navigation-drawer v-model="drawerVisible">
    <v-list color="primary" class="pt-4">
      <nuxt-link to="route" custom>
        <v-list-item
          v-for="{ icon, text, route } in links"
          :key="icon"
          :to="route"
          link
          class="p-0"
        >
          <template v-slot:prepend>
            <v-icon>{{ icon }}</v-icon>
          </template>

          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item>
      </nuxt-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useUiStore } from "~/stores/ui"; // Adjust the path to your store accordingly

const uiStore = useUiStore();

export type NavigationPoint = {
  icon: string;
  text: string;
  route: string;
};

const links = ref<NavigationPoint[]>([
  { icon: "mdi-account", text: "Account", route: "/account" },
  { icon: "mdi-view-dashboard", text: "Dashboard", route: "/dashboard" },
  { icon: "mdi-database", text: "Users", route: "/admin/users" }
]);

const drawerVisible = computed({
  get() {
    return uiStore.drawerVisible;
  },
  set(val) {
    uiStore.setDrawerVisibility(val);
  }
});
// Watch for changes in the drawerVisible property and update the store
</script>
<style scoped></style>
