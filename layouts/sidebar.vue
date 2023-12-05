<template>
  <app-navigation-bar></app-navigation-bar>

  <app-navigation-drawer></app-navigation-drawer>
  <slot></slot>
  <app-dialog></app-dialog>
  <app-notifications></app-notifications>
</template>
<script lang="ts" setup></script>

<style scoped></style>
