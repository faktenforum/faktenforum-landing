<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column">
    <v-sheet class="px-10 pt-16 pb-16 h-100 flex-grow-1">
      <h1 class="text-h4 text-color-primary pb-8">{{ $t("account.title") }}</h1>
      <v-row>
        <v-col cols="12" xs="12" sm="8" md="6" lg="4" xl="4" xxl="2">
          <div class="solid-primary-outline pa-4 background-color-primary">
            <v-form fast-fail @submit.prevent="">
              <h2 class="text-h5 pb-4">{{ $t("account.label.details") }}</h2>
              <div class="pa-1">{{ $t("login.label.email") }}</div>
              <v-text-field
                class="pb-2"
                variant="solo"
                v-model="userData.email"
                clearable
                :rules="[isValidEmail]"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                block
                class=""
                :loading="pendingRequests['account.email.update']"
                @click="updateEmail('account.email.update')"
                >{{ $t("account.button.email") }}</v-btn
              >
            </v-form>

            <v-form class="pt-10" fast-fail @submit.prevent="">
              <h2 class="text-h5 pb-4">{{ $t("account.label.changePassword") }}</h2>
              <div class="pa-1">{{ $t("account.label.oldPassword") }}</div>
              <v-text-field
                variant="solo"
                type="password"
                v-model="userData.oldPassword"
                clearable
                :rules="[isValidPassword]"
              ></v-text-field>
              <div class="pa-1">{{ $t("account.label.newPassword") }}</div>
              <v-text-field
                variant="solo"
                type="password"
                v-model="userData.password"
                clearable
                :rules="[isValidPassword]"
              ></v-text-field>

              <div class="pa-1">{{ $t("account.label.confirm") }}</div>
              <v-text-field
                variant="solo"
                type="password"
                v-model="userData.passwordConfirmation"
                clearable
                :rules="[isValidPassword]"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                block
                class=""
                :disabled="
                  !!userData.password &&
                  !!userData.oldPassword &&
                  userData.password !== userData.passwordConfirmation
                "
                :loading="pendingRequests['account.update.password']"
                @click="updatePassword('account.update.password')"
                >{{ $t("account.button.password") }}</v-btn
              >
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" xs="12" sm="12" md="6" lg="8" xl="8" xxl="10">
          <div class="solid-primary-outline background-color-primary pa-4">
            <h2 class="text-h5">{{ $t("account.label.sessions") }}</h2>
            <account-session-list
              :sessions="sessions || []"
              :loading="pendingSessions"
              @delete="deleteSession"
            />
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: "auth", layout: "sidebar" });
const { $api, $i18n } = useNuxtApp();
const { pendingRequests } = $api.usePendingRequests();
const store = useNotificationStore();
const { isValidEmail, isValidPassword } = useFormValidation();

const { data: accountData } = useAuth();
const { addNotification } = store;
const userData = reactive({
  email: "",
  oldPassword: "",
  password: "",
  passwordConfirmation: "",
  sessions: []
});

const {
  data: sessions,
  error,
  pending: pendingSessions,
  refresh: refreshSessions
} = await $api.account.useGetSessions();

userData.email = accountData.value?.email || "";

async function updatePassword(requestId: string) {
  try {
    await $api.account.updatePassword(
      {
        oldPassword: userData.oldPassword,
        newPassword: userData.password
      },
      requestId
    );
    addNotification({
      type: "success",
      title: $i18n.t("account.notification.password")
    });
    userData.oldPassword = "";
    userData.password = "";
    userData.passwordConfirmation = "";
  } catch (e) {
    // noop - handled by api
  }
}
async function deleteSession(id: string) {
  if (sessions.value) {
    // optimistic update remove from list load new data from server
    sessions.value = sessions.value.filter((session) => session.id !== id);
  }
  refreshSessions();
}

async function updateEmail(requestId: string) {
  try {
    await $api.account.updateEmail(
      {
        email: userData.email
      },
      requestId
    );
    addNotification({
      type: "success",
      title: $i18n.t("account.notification.email")
    });
  } catch (e) {
    // noop - handled by api
  }
}
</script>
abcd1234!D
