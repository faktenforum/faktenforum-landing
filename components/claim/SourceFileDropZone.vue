<template>
  <!-- Hidden file input -->
  <input type="file" ref="fileInput" style="display: none" @change="handleFileDialogChange" />
  <v-card class="dashed-primary-outline d-flex" variant="outlined">
    <common-file-drop-zone
      class="d-flex flex-column flex-grow-1"
      @files-dropped="handleFiles"
      v-slot="{ dropZoneActive }"
    >
      <div
        v-if="!(singleFile && value.sources.length > 0)"
        class="flex-grow-1 d-flex flex-column justify-center"
        :style="{
          'background-color': dropZoneActive ? 'rgb(var(--v-theme-primary-darken-3' : 'transparent'
        }"
      >
        <div class="d-flex justify-center">
          <v-btn
            variant="text"
            color="primary"
            size="xlarge"
            @click="openFileDialog()"
            prepend-icon="mdi-plus-circle"
          >
            <template v-slot:prepend>
              <v-icon color="primary" size="48"></v-icon>
            </template>
            {{ $t("submitPage.dropzone.file.select") }}
          </v-btn>
        </div>
        <div class="d-flex justify-center pt-2 text-color-primary">
          {{ $t("submitPage.dropzone.file.drop") }}
        </div>
      </div>
      <div v-else class="flex-grow-1 d-flex flex-column justify-center pa-10 align-center">
        <v-list lines="two" width="300px">
          <v-list-item
            :title="value.sources[0].file?.name"
            :subtitle="fileToSizeString(value.sources[0].file)"
          >
            <template v-if="value.sources[0].file" v-slot:prepend>
              <v-container fluid class="pa-0 pr-2 ma-0">
                <v-img
                  :width="70"
                  aspect-ratio="4/3"
                  cover
                  :src="fileToUrl(value.sources[0].file)"
                />
              </v-container>
            </template>

            <template v-slot:append>
              <v-btn color="background" @click="clearFile()" size="small" icon="mdi-close"></v-btn>
            </template>
          </v-list-item>
        </v-list>
      </div>
    </common-file-drop-zone>
  </v-card>
</template>
<script setup lang="ts">
import { nanoid } from "nanoid";
import type { Claim } from "./types";

// Component Properties Types

type SourceFileDropZoneProps = {
  modelValue: Claim;
  singleFile?: boolean;
};

const props = defineProps<SourceFileDropZoneProps>();
const emit = defineEmits(["update:value"]);
const value = useVModel(props, "modelValue", emit);

const fileInput = ref<HTMLInputElement | null>(null);

const openFileDialog = () => {
  fileInput.value?.click();
};

function handleFileDialogChange(event: Event) {
  const target = event.target as HTMLInputElement;
  handleFiles(target.files);
}
function handleFiles(files: FileList | File[] | null) {
  if (files) {
    if (props.singleFile) {
      value.value.sources.push({
        key: nanoid(10),
        file: files[0],
        sourceType: "",
        sourceUrl: ""
      });
      return;
    }
    for (let file of files) {
      console.log("Selected file:", file);
      value.value.sources.push({
        key: nanoid(10),
        file,
        sourceType: "",
        sourceUrl: ""
      });
    }
  }
}

function clearFile() {
  value.value.sources = [];
}
</script>

<style scoped>
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
