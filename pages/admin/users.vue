<template>
  <h1>Users</h1>
  <div></div>
  <div>{{ data }}</div>
  <div>{{ token }}</div>
  <div>{{ lastRefreshedAt }}</div>
</template>
<script lang="ts" setup>
definePageMeta({
  middleware: ["auth", "roles"],
  layout: "sidebar",
  meta: {
    roles: ["ADMIN"]
  }
});

const { status, data, token, lastRefreshedAt, getSession, signUp, signIn, signOut } = useAuth();
</script>
