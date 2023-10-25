<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column" fluid>
    <v-sheet class="px-10 pt-16 flex-grow-1" v-if="!!user">
      <v-form fast-fail class="pa-6 fluid background-color-primary solid-primary-outline">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <h1 class="text-h4 text-color-primary pb-8">{{ $t("admin.user.createTitle") }}</h1>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-text-field
              class="pb-2"
              variant="solo"
              :label="$t('admin.users.table.email')"
              v-model="user.email"
              clearable
              :rules="[isValidEmail]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-select
              :label="$t('admin.users.table.role')"
              v-model="user.role"
              :items="['USER', 'ADMIN']"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-text-field
              class="pb-2"
              variant="solo"
              :label="$t('common.password')"
              v-model="user.password"
              clearable
              :rules="[isValidPassword]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-text-field
              class="pb-2"
              variant="solo"
              :label="$t('common.confirmPassword')"
              v-model="confirmPassword"
              clearable
              :rules="[isValidPassword]"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="" cols="12">
            <div class="d-flex flex-row-reverse w-100">
              <v-btn
                class="ml-2"
                :disabled="pendingRequests[`admin.users.create`]"
                @click="onCancel()"
                >{{ $t("common.cancel") }}</v-btn
              >
              <v-btn
                class=""
                :disabled="user.password !== confirmPassword || confirmPassword.length < 1"
                color="primary"
                :loading="pendingRequests[`admin.users.create`]"
                @click="onSave(`admin.users.create`)"
                >{{ $t("common.create") }}</v-btn
              >
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-sheet>
  </v-container>
</template>
<script lang="ts" setup>
import type { components } from "@/gen/api-types";
const { isValidEmail, isValidPassword } = useFormValidation();
const { toLocalRelativeTime, toLocalDateTime } = useDateFormatter();

type User = components["schemas"]["UserCreateDTO"];
definePageMeta({
  middleware: ["auth", "roles"],
  layout: "sidebar",
  meta: {
    roles: ["ADMIN"]
  }
});
const { $api, $router } = useNuxtApp();
const { params } = useRoute();
const { pendingRequests } = $api.usePendingRequests();
const confirmPassword = ref<string>("");
const user = ref<User>({
  email: "",
  role: "USER",
  password: ""
});

async function onSave(requestId: string) {
  try {
    console.log(JSON.stringify(user.value));

    await $api.users.createUser(user.value, requestId);
    $router.push("/admin/users");
  } catch (error) {
    // noop - handled by api error handler
  }
}

function onCancel() {
  $router.push("/admin/users");
}
</script>
<style scoped>
.v-container {
  max-width: 800px;
  min-height: 600px;
}
</style>
