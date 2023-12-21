<template>
  <iframe
    ref="myIframe"
    class="full-page-iframe"
    title="submission form"
    scrolling="no"
    src="http://localhost:3000/submission"
    frameborder="0"
    :style="{ height: iframeHeight + 'px' }"
  ></iframe>
</template>

<script lang="ts" setup>
const myIframe = ref<HTMLIFrameElement | null>(null);

const iframeHeight = ref(10);

onMounted(() => {
  // Listen for messages from the iframe
  console.log("Mount iframe");
  iframeHeight.value;
  window.addEventListener(
    "message",
    (event) => {
      if (event.origin === "http://localhost:3000") {
        // Check the origin for security
        console.log("Received message:", event.data);
        const data = JSON.parse(event.data);
        if (data.type === "height") {
          iframeHeight.value = Math.max(data.payload, window.innerHeight - 10);
        }
        if (data.type == "action") {
          if (data.payload == "claim-submit-finished") {
            navigateTo("/");
          }
        }
      }
    },
    false
  );
});
</script>

<style>
body,
html {
  margin: 0;
  padding: 0;
}
* {
  box-sizing: border-box;
}

.full-page-iframe {
  width: 100%; /* Full width of the container */
  border: none; /* Remove the border */

  overflow: hidden;
}
</style>
