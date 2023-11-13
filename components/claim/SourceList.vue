<template>
  <div
    class="solid-primary-outline background-color-surface pa-4 mb-4"
    v-for="resource of (value && value.resources) || []"
    :key="resource.id"
  >
    <v-list lines="two" v-if="resource.files[0]">
      <v-list-item
        :title="resource.files[0]?.name"
        :subtitle="fileToSizeString(resource.files[0].size)"
      >
        <template v-slot:prepend>
          <v-container fluid class="pa-0 pr-2 ma-0">
            <claim-source-file-image
              aspect-ratio="4/3"
              :width="70"
              :src="resource.files[0].url"
              :mimeType="resource.files[0].mimeType"
            />
          </v-container>
        </template>

        <template v-slot:append>
          <v-btn
            v-if="!isUUIDv4(resource.id)"
            color="background"
            @click="removeSource(resource.id)"
            size="small"
            icon="mdi-close"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
    <v-container
      v-else-if="!isUUIDv4(resource.id)"
      class="d-flex pa-0 ma-0 flex-row-reverse w-100 pr-4"
    >
      <v-btn
        color="background"
        @click="removeSource(resource.id)"
        size="small"
        icon="mdi-close"
      ></v-btn>
    </v-container>

    <v-row v-if="!$props.hideSource">
      <v-col>
        <div class="pa-1">{{ $t("common.source") }}</div>
        <v-text-field
          class=""
          variant="solo"
          density="compact"
          single-line
          label="https://url.com"
          :rules="[isValidUrl]"
          v-model="resource.originalUrl"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type { Claim, ClaimSourceFile } from "./types";
const { isValidUrl } = useFormValidation();
// Component Properties Types

type SourceListProps = {
  modelValue: Claim;
  hideSource?: boolean;
};

const props = defineProps<SourceListProps>();
const emit = defineEmits(["update:value"]);
const value = useVModel(props, "modelValue", emit);

function removeSource(resourceKey: string) {
  value.value.resources = value.value.resources.filter((resource) => resource.id !== resourceKey);
}
</script>
