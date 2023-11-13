<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column">
    <v-sheet class="px-10 pt-16 h-100 flex-grow-1">
      <h1 class="text-h5 text-color-primary pb-4">{{ $t("submitPage.title") }}</h1>
      <div class="text-caption pb-2">{{ $t("submitPage.text") }}</div>

      <v-tabs v-model="tab" color="primary">
        <v-tab value="file">{{ $t("submitPage.tab.file") }}</v-tab>
        <v-tab value="link">{{ $t("submitPage.tab.link") }}</v-tab>
        <v-tab value="description">{{ $t("submitPage.tab.claim") }}</v-tab>
      </v-tabs>
      <v-window v-model="tab" class="py-6">
        <v-window-item value="file">
          <claim-source-file-drop-zone v-model="claim" single-file />
        </v-window-item>
        <v-window-item value="link">
          <claim-source-add-link-zone v-model="link" />
        </v-window-item>
        <v-window-item value="description">
          <claim-source-add-description-zone v-model="claim.description" />
        </v-window-item>
      </v-window>
      <div class="d-flex justify-center py-0">
        <v-btn
          :disabled="claimHasContent"
          color="primary"
          size="large"
          variant="outlined"
          class="unfilled-button"
          :loading="pendingRequests[`submit.claim`]"
          @click="submit('submit.claim')"
        >
          {{ $t("common.submit") }}
        </v-btn>
      </div>
    </v-sheet>
  </v-container>
</template>
<script lang="ts" setup>
import { nanoid } from "nanoid";
import type { Claim } from "@/components/claim/types";
import type { components } from "@/gen/api-types";
definePageMeta({
  middleware: [],
  layout: "default",
  meta: {}
});
preloadRouteComponents("/submission/[token]");
type ClaimCreateDTO = components["schemas"]["ClaimCreateDTO"];
const { $api } = useNuxtApp();
const { pendingRequests } = $api.usePendingRequests();
const tab = ref<null | string>(null);

const claim = reactive<Claim>({
  title: "",
  description: "",
  resources: []
});
const link = ref("");

watch(link, (value) => {
  console.log(link.value);
});

const claimHasContent = computed(() => {
  if (claim.resources.length > 0) {
    return false;
  }
  if (claim.description.length > 0) {
    return false;
  }
  if (link.value.length > 0) {
    return false;
  }
  return true;
});

async function submit(requestId: string) {
  try {
    const files: {
      file: File;
      formName: string;
    }[] = [];

    const body: ClaimCreateDTO = {
      title: claim.title,
      description: claim.description,
      resources: claim.resources.map((file) => ({
        originalUrl: file.originalUrl,
        files: file.files.map((claimSourceFile) => {
          const fileIndex = files.length;
          const fileFormName = { url: `file-${fileIndex}` };
          if (claimSourceFile.file) {
            files.push({
              file: claimSourceFile.file,
              formName: "files"
            });
          } else {
            throw Error("File not found");
          }
          return fileFormName;
        })
      }))
    };

    //append files

    if (link.value !== "" && body.resources) {
      body.resources.push({ id: nanoid(), originalUrl: link.value, files: [] });
    }

    const { token } = await $api.submission.submitClaim(body, files, requestId);
    await navigateTo(`/submission/${token}`);
  } catch (error) {
    // noop - handled by api error handler
  }
}
</script>
<style scoped>
.dashed-primary-outline {
  border: 2px dashed rgb(var(--v-theme-primary));
  border-radius: 0px;
}
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
