<template>
  <div>
    <h1>Claims</h1>
    <common-grid-view></common-grid-view>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({ middleware: ["auth", "roles"], layout: "sidebar", meta: { roles: ["ADMIN"] } });
</script>

<style></style>
