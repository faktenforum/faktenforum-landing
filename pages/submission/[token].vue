<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column" fluid>
    <v-sheet class="px-10 pt-16 h-100 flex-grow-1">
      <v-form fast-fail v-if="data">
        <h1 class="text-h4 mb-4 ff-title">{{ $t("submitPage.source.title") }}</h1>
        <div class="text-body-1 pb-2 mb-4">{{ $t("submitPage.source.subtitle") }}</div>
        <div
          class="px-8 py-6 rounded-sm fluid d-flex flex-column background-color-primary solid-primary-outline text-secondary-darken-3"
        >
          <div>{{ $t("submitPage.acknowledgement") }}</div>
          <div class="text-h6 pb-6">{{ $t("submitPage.request") }}</div>
          <div class="text-h6 pa-1">{{ $t("submitPage.info.title") }}</div>
          <v-text-field
            style="max-width: 361px;"
            class=""
            v-model="claim.title"
            variant="solo"
            density="compact"
            single-line
            :label="$t('submitPage.claim.label.title')"
          ></v-text-field>
          <div class="pa-1">{{ $t("submitPage.info.description") }}</div>
          <v-textarea
            class=""
            v-model="claim.description"
            variant="solo"
            density="compact"
            rows="3"
            :label="$t('submitPage.claim.label.description')"
          ></v-textarea>
          <claim-source-list v-model="claim" />

          <v-tabs v-model="tab" color="secondary" density="compact">
            <v-tab value="file" class="text-h6 font-weight-bold pa-0 mr-4">{{
              $t("submitPage.tab.file")
            }}</v-tab>
            <v-tab value="link" class="text-h6 font-weight-bold pa-0 mr-4">{{
              $t("submitPage.tab.link")
            }}</v-tab>
          </v-tabs>
          <v-window v-model="tab" class="py-6">
            <v-window-item value="file">
              <claim-source-file-drop-zone v-model="claim" />
            </v-window-item>
            <v-window-item value="link">
              <claim-source-add-link-zone show-add-button @add="addLink" />
            </v-window-item>
          </v-window>
        </div>
        <div class="d-flex justify-center py-12">
          <v-btn
            color="primary"
            size="large"
            class="unfilled-button"
            @click="submit('submission.[token].update')"
            :loading="pendingRequests['submission.[token].update']"
          >
            {{ $t("common.update") }}
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
    <div style="height: 120px;"></div>
  </v-container>
</template>
<script lang="ts" setup>
import { nanoid } from "nanoid";
import type { Claim } from "@/components/claim/types";

definePageMeta({
  middleware: [],
  layout: "default",
  meta: {}
});
const { $api } = useNuxtApp();
const { pendingRequests } = $api.usePendingRequests();
const { params } = useRoute();

const { data, refresh } = await $api.submission.useGetSubmit(params.token as string);

const { cloned: claim, sync } = useCloned<Claim>(data as Ref);
onMounted(() => {});

// const claim = ref<Claim>({
//   title: "",
//   description: "",
//   sources: []
// });

const tab = ref<null | string>(null);

function addLink(link: string) {
  console.log("addLink", link);
  claim.value.resources.push({
    id: nanoid(10),
    originalUrl: link,
    files: []
  });
}
async function submit(requestId: string) {
  const files: {
    file: File;
    formName: string;
  }[] = [];
  const payload = {
    title: claim.value.title,
    description: claim.value.description,
    resources: claim.value.resources.map((resource) => ({
      id: isUUIDv4(resource.id) ? resource.id : undefined,
      originalUrl: resource.originalUrl || undefined,
      files: resource.files.map((file) => {
        if (file.file) {
          console.log("Add file uploads");
          files.push({
            file: file.file,
            formName: "files"
          });
          return {
            url: `file-${files.length - 1}`
          };
        }
        return {
          url: file.url
        };
      })
    }))
  };
  try {
    console.log("Update payload: ", payload);
    await $api.submission.updateSubmit(params.token as string, payload, files, requestId);
    await navigateTo(`/`);
  } catch (error) {
    // noop - handled by api error handler
  }
}
</script>
<style scoped>
.v-container {
  max-width: 800px;
  min-height: 600px;
}
.v-card {
  min-height: 222px;
}
.unfilled-button {
  max-width: 361px;
  width: 100%;
}
.filled-button {
  max-width: 460px;
  width: 100%;
}
</style>
