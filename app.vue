<template>
  <v-app id="inspire">
    <NuxtLayout>
      <v-main>
        <NuxtLoadingIndicator />
        <NuxtPage></NuxtPage>
      </v-main>
    </NuxtLayout>
  </v-app>
</template>
<style scoped>
.v-main {
  background: url("images/background.jpg") no-repeat center top fixed !important;
  background-size: contain;
}
</style>
