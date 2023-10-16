<template>
  <div class="d-flex align-center justify-center h-100">
    <v-sheet max-width="400" class="mx-auto pa-10 w-100">
      <v-form fast-fail @submit.prevent="login">
        <h1 class="text-h4 text-color-primary text-center pb-8">{{ $t("login.title") }}</h1>
        <div class="pa-1">{{ $t("login.label.email") }}</div>
        <v-text-field variant="outlined" v-model="username" clearable></v-text-field>
        <div class="pa-1">{{ $t("login.label.password") }}</div>
        <v-text-field
          variant="outlined"
          type="password"
          v-model="password"
          clearable
        ></v-text-field>

        <v-btn type="submit" color="primary" block class="mt-6">{{
          $t("login.button.login")
        }}</v-btn>
        <a
          href="#"
          :style="{ position: 'relative', top: '-64px' }"
          tabindex="0"
          class="text-body-2 text-color-primary"
          >{{ $t("login.forgotPassword") }}</a
        >
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
import { useNotificationStore } from "~/stores/notifications";
definePageMeta({
  middleware: "auth",
  auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: "/dashboard" }
});
const store = useNotificationStore();
const { addNotification } = store;

const username = ref("");
const password = ref("");
const { status, data, token, lastRefreshedAt, getSession, signUp, signIn, signOut } = useAuth();
status.value; // Session status: `unauthenticated`, `loading`, `authenticated`data.value // Session data, e.g., expiration, user.email, ...await signIn() // Sign in the userawait signOut() // Sign out the user
async function login() {
  try {
    const result = await signIn(
      { username: username.value, password: password.value },
      { redirect: true, callbackUrl: "/dashboard" }
    );
    console.log("result", result);
  } catch (error) {
    console.log("Error", JSON.stringify(error));
    console.log("type", typeof error);
    addNotification({ title: "Wrong username or password", messageType: "error", timeout: 5000 });
  }
}
</script>
