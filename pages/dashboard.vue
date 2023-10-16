<template>
  <h1>Dashboard</h1>
  <div>
    {{ status }}
  </div>
  <div>{{ data }}</div>
  <div>{{ token }}</div>
  <div>{{ lastRefreshedAt }}</div>
</template>
<script lang="ts" setup>
definePageMeta({ middleware: "auth", layout: "sidebar" });

const { status, data, token, lastRefreshedAt, getSession, signUp, signIn, signOut } = useAuth();
</script>
