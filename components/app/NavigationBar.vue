<template>
  <v-app-bar
    color="secondary"
    elevation="0"
    density="compact"
    scroll-behavior="hide elevate"
    height="78"
    tag="nav"
  >
    <NuxtLink class="d-flex align-center h-100 py-2 ml-4 ml-md-12 mr-4" to="/">
      <v-img
        src="/images/logo-horizontal-yellow.png"
        height="50"
        width="174"
        alt="Faktenforum Logo"
      />
    </NuxtLink>

    <template v-slot:append v-if="status !== 'authenticated'">
      <!-- <v-btn color="primary" class="px-4 mr-2" variant="text">What is Faktenforum</v-btn>
      <v-btn color="primary" class="px-4 mr-2" variant="text">News</v-btn>
      <v-btn color="primary" class="px-4 mr-2" variant="text">FAQ</v-btn>
      <NuxtLink to="/login">
        <v-btn color="primary" class="px-8 mr-12 mr-sm-4 text-secondary" variant="flat">Join</v-btn>
      </NuxtLink> -->
    </template>
    <v-spacer></v-spacer>
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props">
          {{ locale }}
        </v-btn>
      </template>
      <v-list
        class="background-color-secondary"
        :style="{ backgroundColor: 'rgb(var(--v-theme-secondary)' }"
      >
        <v-list-item
          class="color-primary--text"
          v-for="lang in availableLocales"
          :key="lang"
          @click="locale = lang"
        >
          <v-list-item-title>{{ lang }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <template v-slot:append v-if="status === 'authenticated'">
      <v-btn
        color="white"
        class="px-8 mr-12 mr-sm-4 color-primary--text"
        variant="flat"
        @click="signOut({ callbackUrl: '/login', redirect: true })"
        >Logout</v-btn
      >
    </template>
  </v-app-bar>
</template>
<script lang="ts" setup>
const { locale, availableLocales } = useI18n({ useScope: "global" });
const { status, data: user, signOut } = useAuth();
</script>
<style scoped>
.color-primary--text {
  color: rgb(var(--v-theme-primary)) !important;
}
.color-secondary--text {
  color: rgb(var(--v-theme-secondary-darken-5)) !important;
}
.background-color-background {
  background-color: rgb(var(--v-theme-background)) !important; /* Assuming Vuetify 2.x */
}
</style>
