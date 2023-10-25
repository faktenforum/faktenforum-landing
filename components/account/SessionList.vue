<template>
  <v-list>
    <v-list-item
      v-for="session in props.sessions"
      :key="session.id"
      :title="getTitle(session)"
      :subtitle="(session.userAgent as any) || 'unknown'"
      :loading="props.loading"
    >
      <template v-slot:prepend>
        <v-avatar>
          <v-icon icon="mdi-firefox"></v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          color="SourceListProps"
          icon="mdi-delete-forever-outline"
          density="compact"
          @click="deleteSession(session.id)"
          :loading="pendingRequests[session.id]"
          :disabled="pendingRequests[session.id]"
        ></v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>
<script lang="ts" setup>
import type { operations, components, paths } from "~/gen/api-types";
const { toLocalRelativeTime, toLocalDateTime } = useDateFormatter();

type Session = components["schemas"]["Session"];
type SessionListProps = {
  sessions: Session[];
  loading: boolean | undefined;
};
type SessionEmits = {
  (e: "delete", id: string): void;
};
const props = defineProps<SessionListProps>();
const emits = defineEmits<SessionEmits>();
const { $api } = useNuxtApp();
const dayjs = useDayjs();
const { pendingRequests } = $api.usePendingRequests();
async function deleteSession(id: string) {
  try {
    await $api.account.deleteSession(id, id);
    emits("delete", id);
  } catch (error: any) {
    // noop do not emit delete error
  }
}

function getTitle(session: Session) {
  return `Session created ${toLocalDateTime(
    session.createdAt
  )} ago will expire in ${toLocalRelativeTime(session.expiresAt)}`;
}
</script>
