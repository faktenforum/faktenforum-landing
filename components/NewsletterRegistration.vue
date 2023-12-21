<template>
  <v-btn v-bind="$attrs" v-bind:class="$attrs.class">
    <slot></slot>

    <v-dialog v-model="dialog" activator="parent" persistent width="auto">
      <v-form v-if="!registered" v-model="valid" fast-fail @submit.prevent="register">
        <v-card class="px-10 pt-6">
          <v-card-title class="text-h4 mb-4 px-0 ff-title">{{
            $t("newsletter.pre.title")
          }}</v-card-title>
          <v-card-text class="pa-0">
            {{ $t("newsletter.pre.text") }}

            <v-row class="mt-4 mb-2 mb-sm-0">
              <v-col cols="12" sm="6">
                <v-text-field
                  class="h-100"
                  variant="solo"
                  density="compact"
                  single-line
                  v-model="email"
                  clearable
                  :disabled="pending"
                  :label="$t('newsletter.pre.label')"
                  required
                  :rules="[
                    isRequired($t('form.validation.email.required')),
                    isEmail($t('form.validation.email.invalid'))
                  ]"
                ></v-text-field>
              </v-col>
              <v-col class="pt-0 pt-sm-2" cols="12" sm="6">
                <v-btn
                  class="w-100 text-secondary"
                  color="primary"
                  size="large"
                  :loading="pending"
                  type="submit"
                  >{{ $t("newsletter.pre.button.subscribe") }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-btn color="" block @click="dialog = false">{{
              $t("newsletter.pre.button.close")
            }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
      <v-card v-else class="px-10 pt-6">
        <v-card-title class="text-h4 mb-4 px-0 ff-title">{{
          $t("newsletter.post.title")
        }}</v-card-title>
        <v-card-text class="pa-0">
          {{ $t("newsletter.post.text.info") }}
          <div
            class="solid-primary-outline background-color-primary mt-6 mb-4 py-4 px-4 d-flex justify-center"
            v-html="'<div>' + $t('newsletter.post.text.hint', ['<b>&nbsp;', '</b>']) + ' </div>'"
          ></div>
        </v-card-text>
        <v-card-actions>
          <v-btn block @click="cancel">{{ $t("newsletter.post.button.close") }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-btn>
</template>

<script lang="ts" setup>
import { useNotificationStore } from "~/stores/notifications";
const { addNotification } = useNotificationStore();
const valid = ref(true);
const dialog = ref(false);
const registered = ref(false);
const pending = ref(false);
const email = ref("");

async function register() {
  console.log("button clicked");
  if (!valid.value) return;
  try {
    pending.value = true;
    const response = await $fetch("/api/newsletter", {
      method: "POST",
      body: { email: email.value }
    });
    registered.value = true;
  } catch (error) {
    console.log(error);
    addNotification({
      title: "Error",
      type: "error",
      message: (error as any).message || error,
      timeout: 5000
    });
  } finally {
    pending.value = false;
  }
}
function cancel() {
  dialog.value = false;
}
watch(dialog, (value) => {
  if (value) {
    registered.value = false;
    email.value = "";
  }
});
</script>
<style scoped>
.v-card {
  width: 100%;
  max-width: 720px;
}
</style>
