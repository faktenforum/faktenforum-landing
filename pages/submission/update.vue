<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column" fluid>
    <v-sheet class="px-10 pt-16 h-100 flex-grow-1">
      <v-form fast-fail>
        <h1 class="text-h5 text-color-primary pb-4">{{ $t("submitPage.source.title") }}</h1>
        <div class="text-caption pb-2">{{ $t("submitPage.source.subtitle") }}</div>
        <div class="pa-6 fluid d-flex flex-column background-color-primary solid-primary-outline">
          <div>{{ $t("submitPage.acknowledgement") }}</div>
          <div class="pb-6">{{ $t("submitPage.request") }}</div>
          <div class="pa-1">{{ $t("submitPage.info.title") }}</div>
          <v-text-field
            style="max-width: 361px"
            class=""
            variant="solo"
            density="compact"
            single-line
            :label="$t('submitPage.claim.label.title')"
          ></v-text-field>
          <div class="pa-1">{{ $t("submitPage.info.description") }}</div>
          <v-textarea
            class=""
            variant="solo"
            density="compact"
            rows="3"
            :label="$t('submitPage.claim.label.description')"
          ></v-textarea>
          <claim-source-list v-model="(claim as any)" />

          <v-tabs v-model="tab" color="primary">
            <v-tab value="file">{{ $t("submitPage.tab.file") }}</v-tab>
            <v-tab value="link">{{ $t("submitPage.tab.link") }}</v-tab>
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
          <v-btn color="primary" size="large" class="unfilled-button" @click="submit()">
            {{ $t("common.update") }}
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
    <div style="height: 120px"></div>
  </v-container>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: [],
  layout: "default",
  meta: {}
});
import { nanoid } from "nanoid";
import type { Claim } from "@/components/claim/types";

const claim = ref<Claim>({
  title: "",
  description: "",
  sources: []
});

const tab = ref<null | string>(null);

function addLink(link: string) {
  console.log("addLink", link);
  claim.value.sources.push({
    key: nanoid(10),
    sourceType: "",
    sourceUrl: link
  });
}
function submit() {
  console.log("submit", JSON.parse(JSON.stringify(claim.value)));
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
