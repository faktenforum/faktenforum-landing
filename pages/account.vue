<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column">
    <v-sheet class="px-10 pt-16 pb-16 h-100 flex-grow-1">
      <h1 class="text-h4 text-color-primary pb-8">{{ $t("account.title") }}</h1>
      <v-row>
        <v-col cols="12" xs="12" sm="8" md="6" lg="4" xl="4" xxl="2">
          <div class="solid-primary-outline pa-4 background-color-primary">
            <v-form fast-fail @submit.prevent="updateEmail">
              <h2 class="text-h5 pb-4">{{ $t("account.label.details") }}</h2>
              <div class="pa-1">{{ $t("login.label.email") }}</div>
              <v-text-field variant="solo" v-model="userData.email" clearable></v-text-field>
              <v-btn type="submit" color="primary" block class="">{{
                $t("account.button.email")
              }}</v-btn>
            </v-form>

            <v-form class="pt-10" fast-fail @submit.prevent="updatePassword">
              <div class="pa-1">{{ $t("account.label.password") }}</div>
              <v-text-field
                variant="solo"
                type="password"
                v-model="userData.password"
                clearable
              ></v-text-field>

              <div class="pa-1">{{ $t("account.label.confirm") }}</div>
              <v-text-field
                variant="solo"
                type="password"
                v-model="userData.passwordConfirmation"
                clearable
              ></v-text-field>
              <v-btn type="submit" color="primary" block class="">{{
                $t("account.button.password")
              }}</v-btn>
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="8" xl="8" xxl="10">
          <div class="solid-primary-outline background-color-primary pa-4">
            <h2 class="text-h5">{{ $t("account.label.sessions") }}</h2>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: "auth", layout: "sidebar" });

const { status, data, token, lastRefreshedAt, getSession, signUp, signIn, signOut } = useAuth();
const userData = reactive({
  email: "",
  password: "",
  passwordConfirmation: "",
  sessions: []
});

userData.email = data.value?.email || "";

function updatePassword() {
  console.log("updatePassword");
}

function updateEmail() {
  console.log("updateEmail");
}
</script>
