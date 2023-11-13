<template>
  <v-container fluid class="pa-0 pr-2 ma-0">
    <v-img v-if="isImage" :width="width" :aspect-ratio="aspectRatio" cover :src="imageUrl" />
    <common-video-preview-image
      v-else-if="isVideo"
      :width="width"
      :aspect-ratio="aspectRatio"
      cover
      :src="videoUrl"
      :mimeType="mimeType"
    />
    <common-ratio-container
      v-else
      class="background-color-background"
      :width="width"
      :aspect-ratio="aspectRatio"
      center
    >
      <v-icon size="48" color="black" v-if="isAudio"> mdi-music </v-icon>
      <v-icon size="48" color="black" v-else> mdi-file </v-icon>
    </common-ratio-container>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, defineProps } from "vue";

const props = defineProps<{
  mimeType: string;
  src: string;
  width: number;
  aspectRatio: "16/9" | "4/3" | "1/1";
}>();
console.log(JSON.stringify(props));
const isImage = computed(() => (props.mimeType ? props.mimeType.startsWith("image") : false));
const isVideo = computed(() => (props.mimeType ? props.mimeType.startsWith("video") : false));
const isAudio = computed(() => (props.mimeType ? props.mimeType.startsWith("audio") : false));

const imageUrl = computed(() => (isImage.value ? props.src : ""));
const videoUrl = computed(() => (isVideo.value ? props.src : ""));
const mimeType = computed(() => props.mimeType);
</script>

<!-- Add styles if necessary -->
<style scoped>
/* Your styles here */
</style>
