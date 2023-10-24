<template>
  <div
    class="solid-primary-outline background-color-surface pa-4 mb-4"
    v-for="source of value.sources"
    :key="source.key"
  >
    <v-list lines="two">
      <v-list-item :title="source.file?.name" :subtitle="fileToSizeString(source.file)">
        <template v-if="source.file" v-slot:prepend>
          <v-container fluid class="pa-0 pr-2 ma-0">
            <v-img :width="70" aspect-ratio="4/3" cover :src="fileToUrl(source.file)" />
          </v-container>
        </template>

        <template v-slot:append>
          <v-btn
            color="background"
            @click="removeSource(source.key)"
            size="small"
            icon="mdi-close"
          ></v-btn>
        </template>
      </v-list-item>
    </v-list>
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
          v-model="source.sourceUrl"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script setup lang="ts">
import type { Claim } from "./types";
const { isValidUrl } = useFormValidation();
// Component Properties Types

type SourceListProps = {
  modelValue: Claim;
  hideSource?: boolean;
};

const props = defineProps<SourceListProps>();
const emit = defineEmits(["update:value"]);
const value = useVModel(props, "modelValue", emit);

function removeSource(sourceKey: string) {
  value.value.sources = value.value.sources.filter((source) => source.key !== sourceKey);
}
</script>
