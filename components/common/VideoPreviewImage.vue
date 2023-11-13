<template>
  <video
    v-if="!loaded"
    id="video"
    ref="video"
    style="display: none"
    controls
    preload="auto"
    :type="mimeType"
    @loadeddata="onLoadedData"
  >
    <source :src="src" :type="mimeType" />
    Your browser does not support HTML5 video.
  </video>
  <canvas v-if="!loaded" ref="canvas" style="display: none"></canvas>
  <common-ratio-container
    v-if="loading"
    class="background-color-background"
    :width="width"
    :aspect-ratio="aspectRatio"
    center
  >
    <v-icon color="black" size="32"> mdi-video </v-icon>
  </common-ratio-container>
  <v-img v-else :width="width" :aspect-ratio="aspectRatio" :cover="cover" :src="imageSrc"> </v-img>
</template>

<script lang="ts" setup>
import { vi } from "vuetify/lib/locale/index.mjs";
type VideoPreviewImage = {
  src: string;
  width?: number;
  aspectRatio?: "16/9" | "4/3" | "1/1";
  cover?: boolean;
  mimeType: string;
};
const props = defineProps<VideoPreviewImage>();
const { src, width, aspectRatio, cover, mimeType } = toRefs(props);
const canvas = ref<HTMLCanvasElement>();
const video = ref<HTMLVideoElement>();
const imageSrc = ref<string>();
const loading = ref<boolean>(true);
const loaded = ref<boolean>(false);
function isCanvasBlank(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d");
  if (!context) return false;
  const pixelBuffer = new Uint32Array(
    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
  );

  return !pixelBuffer.some((color) => color !== 0);
}
watch(src, (value: string) => {
  console.log("src changed");
  if (!value) return;
  loading.value = true;
  loaded.value = false;
  imageSrc.value = undefined;
  if (video.value) {
    video.value.src = value;
    video.value.load();
  }
});

function onLoadedData() {
  console.log("onLoadedData");
  loading.value = true;
  if (!canvas.value || !video.value) return;
  canvas.value.width = video.value.videoWidth;
  canvas.value.height = video.value.videoHeight;
  video.value.onseeked = () => {
    console.log("onseeked");

    setTimeout(() => {
      if (!canvas.value || !video.value) return;
      const context = canvas.value.getContext("2d");
      if (context) {
        context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
        imageSrc.value = canvas.value.toDataURL();
        loading.value = isCanvasBlank(canvas.value);
        loaded.value = true;
      }
    }, 500);
  };
  if (video.value.duration > 5)
    video.value.currentTime = 5; // First Frame often is black so we skip it
  else {
    video.value.currentTime = video.value.duration / 2;
  }
}
</script>
<style scoped></style>
