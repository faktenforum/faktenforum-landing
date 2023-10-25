<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column" fluid>
    <v-sheet class="px-10 pt-16 flex-grow-1" v-if="!!user">
      <v-form fast-fail class="pa-6 fluid background-color-primary solid-primary-outline">
        <v-row>
          <v-col cols="12" sm="6" md="6">
            <h1 class="text-h4 text-color-primary pb-8">{{ $t("admin.user.title") }}</h1>
          </v-col>
          <v-col class="d-flex flex-column align-end" cols="12" sm="6" md="6">
            <div class="d-flex space-between">
              <div class="text-caption pr-2">Updated:</div>
              <div class="text-caption">
                <b>{{ user && toLocalDateTime(user.updatedAt) }}</b>
              </div>
            </div>
            <div class="d-flex space-between">
              <div class="text-caption pr-2">Created:</div>
              <div class="text-caption">
                <b>{{ user && toLocalDateTime(user.createdAt) }}</b>
              </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-text-field
              class="pb-2"
              variant="solo"
              :label="$t('admin.users.table.email')"
              v-model="cloned.email"
              clearable
              :rules="[isValidEmail]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-select
              :label="$t('admin.users.table.role')"
              v-model="cloned.role"
              :items="['USER', 'ADMIN']"
              variant="solo"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="" cols="12">
            <div class="d-flex flex-row-reverse w-100">
              <v-btn
                class="ml-2"
                :disabled="pendingRequests[`admin.users.update-${user.id}`]"
                @click="onCancel()"
                >{{ $t("common.cancel") }}</v-btn
              >
              <v-btn
                class=""
                :disabled="pending"
                color="primary"
                :loading="pendingRequests[`admin.users.update-${user.id}`]"
                @click="onSave(user.id, `admin.users.update-${user.id}`)"
                >{{ $t("common.save") }}</v-btn
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

type User = components["schemas"]["UserDTO"];
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

const { data: user, pending, refresh } = await $api.users.useGetUser(getParamsSingle(params, "id"));
const { cloned, sync } = useCloned<User>(user as Ref);

async function onSave(id: string, requestId: string) {
  try {
    await $api.users.updateUser(id, cloned.value, requestId);
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
