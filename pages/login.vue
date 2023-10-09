<template>
  <div class="d-flex align-center justify-center h-100">
    <v-sheet max-width="400" class="mx-auto pa-10 w-100">
      <v-form fast-fail @submit.prevent="login">
        <h1 class="text-h4 text-color-primary text-center pb-8">{{ $t("login.title") }}</h1>
        <div class="pa-1">{{ $t("login.label.email") }}</div>
        <v-text-field variant="outlined" v-model="username"></v-text-field>
        <div class="pa-1">{{ $t("login.label.password") }}</div>
        <v-text-field variant="outlined" v-model="password"></v-text-field>
        <a href="#" class="text-body-2 text-color-primary">{{ $t("login.forgotPassword") }}</a>

        <v-btn type="submit" color="primary" block class="mt-2">{{ $t("login.button") }}</v-btn>
      </v-form>
      <div class="mt-2">
        <p class="text-body-2">
          {{ $t("login.registerCallToAction")
          }}<a href="#" class="pl-2 text-color-primary">{{ $t("login.buttton.signup") }}</a>
        </p>
      </div>
    </v-sheet>
  </div>
</template>
<script lang="ts" setup>
const username = ref("");
const password = ref("");

function login() {}
</script>
