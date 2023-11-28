<template>
  <v-app-bar
    color="surface"
    elevation="0"
    class="py-4 px-2 mb-4"
    density="compact"
    scroll-behavior="hide elevate"
    height="60"
    tag="nav"
  >
    <div class="d-flex align-center h-100 pl-4">
      <v-img
        src="/images/logo-horizontal-yellow.png"
        height="60"
        width="209"
        alt="Faktenforum Logo"
      />
    </div>

    <template v-slot:append v-if="status !== 'authenticated'">
      <v-btn color="secondary" class="px-6" variant="text">What is Faktenforum</v-btn>
      <v-btn color="secondary" class="px-6" variant="text">News</v-btn>
      <v-btn color="secondary" class="pe-10 mr-6" variant="text">FAQ</v-btn>
      <NuxtLink to="/login">
        <v-btn color="primary" class="px-10 text-secondary" variant="flat">Join</v-btn>
      </NuxtLink>
    </template>
    <template v-slot:append v-if="status === 'authenticated'">
      <v-btn
        color="white"
        class="px-10 color-primary--text"
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
</style>
