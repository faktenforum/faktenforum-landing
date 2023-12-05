<template>
  <!-- Hidden file input -->
  <input type="file" ref="fileInput" style="display: none;" @change="handleFileDialogChange" />
  <v-card class="dashed-primary-outline rounded-sm d-flex px-8 py-6" variant="outlined">
    <common-file-drop-zone
      class="d-flex flex-column flex-grow-1"
      @files-dropped="handleFiles"
      v-slot="{ dropZoneActive }"
    >
      <div
        v-if="!(singleFile && value.resources.length > 0)"
        class="flex-grow-1 d-flex flex-column justify-center"
        :style="{
          'background-color': dropZoneActive ? 'rgb(var(--v-theme-primary-lighten-3' : 'transparent'
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
            <span class="text-h6 font-weight-bold">
              {{ $t("submitPage.dropzone.file.select") }}
            </span>
          </v-btn>
        </div>
        <div class="d-flex justify-center pt-2 text-color-secondary">
          {{ $t("submitPage.dropzone.file.drop") }}
        </div>
      </div>
      <div v-else class="flex-grow-1 d-flex flex-column justify-center pa-10 align-center">
        <v-list lines="two" width="300px">
          <v-list-item
            :title="value.resources[0].files[0]?.name"
            :subtitle="fileToSizeString(value.resources[0].files[0].size)"
          >
            <template v-if="value.resources[0].files" v-slot:prepend>
              <v-container fluid class="pa-0 pr-2 ma-0">
                <claim-source-file-image
                  aspect-ratio="4/3"
                  :width="70"
                  :src="value.resources[0].files[0].url"
                  :mimeType="value.resources[0].files[0].mimeType"
                />
              </v-container>
            </template>

            <template v-slot:append>
              <v-btn
                color="secondary-lighten-3"
                @click="clearFile()"
                size="small"
                icon="mdi-close"
                variant="flat"
                class="ml-2"
              ></v-btn>
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
      value.value.resources.push({
        id: nanoid(10),
        files: [
          {
            id: nanoid(10),
            file: files[0],
            url: URL.createObjectURL(files[0]),
            name: files[0].name,
            size: files[0].size,
            mimeType: files[0].type
          }
        ],
        originalUrl: ""
      });
      return;
    }
    for (let file of files) {
      console.log("Selected file:", file);
      value.value.resources.push({
        id: nanoid(10),
        files: [
          {
            id: nanoid(10),
            file: file,
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
            mimeType: file.type
          }
        ],
        originalUrl: ""
      });
    }
  }
}

function clearFile() {
  value.value.resources = [];
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
