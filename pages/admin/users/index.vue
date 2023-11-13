<template>
  <v-container class="pa-0 my-0 fluid d-flex flex-column">
    <v-sheet class="px-10 pt-16 pb-16 h-100 flex-grow-1">
      <h1 class="text-h4 text-color-primary pb-8">{{ $t("admin.users.title") }}</h1>
      <v-row>
        <v-col cols="12" class="text-end pr-4">
          <nuxt-link :to="`${$route.path}/create`">
            <v-btn color="primary" icon="mdi-plus"> </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
          <div class="solid-primary-outline pa-4 background-color-primary">
            <v-data-table-server
              v-model:items-per-page="itemsPerPage"
              :headers="headers"
              :items-length="(users || []).length"
              :items="users || []"
              :loading="pending"
              class="elevation-1"
              item-value="name"
              @update:options="refresh"
            >
              <template v-slot:item.actions="{ item }">
                <v-btn
                  variant="text"
                  color="secondary"
                  density="compact"
                  icon="mdi-delete"
                  :aria-label="$t('common.delete')"
                  :loading="pendingRequests[`admin.users.delete-${item.id}`]"
                  @click="onDelete(item, `admin.users.delete-${item.id}`)"
                ></v-btn>
                <nuxt-link
                  :to="`${$route.path}/${item.id}`"
                  :disabled="pendingRequests[`admin.users.delete-${item.id}`]"
                  :aria-disabled="pendingRequests[`admin.users.delete-${item.id}`]"
                >
                  <v-btn
                    class="ml-1"
                    :disabled="pendingRequests[`admin.users.delete-${item.id}`]"
                    variant="text"
                    :aria-label="$t('common.edit')"
                    color="secondary"
                    density="compact"
                    icon="mdi-pencil"
                  ></v-btn>
                </nuxt-link>
              </template>
            </v-data-table-server>
          </div>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>
<script lang="ts" setup>
import { VDataTableServer } from "vuetify/lib/labs/components.mjs";
import type { VDataTable } from "vuetify/lib/labs/components.mjs";
import { useDialogStore } from "@/stores/dialog";
definePageMeta({
  middleware: ["auth", "roles"],
  layout: "sidebar",
  meta: {
    roles: ["ADMIN"]
  }
});
type UnwrapReadonlyArrayType<A> = A extends Readonly<Array<infer I>>
  ? UnwrapReadonlyArrayType<I>
  : A;
type DT = InstanceType<typeof VDataTable>;
type ReadonlyDataTableHeader = UnwrapReadonlyArrayType<DT["headers"]>;

const store = useDialogStore();
const { openDialog } = store;
const { $api, $i18n } = useNuxtApp();
const { pendingRequests } = $api.usePendingRequests();
const { data: users, pending, refresh } = await $api.users.useGetUsers();
const itemsPerPage = ref(5);

const headers = computed<ReadonlyDataTableHeader[]>(() => [
  {
    title: "",
    align: "start",
    sortable: false,
    key: "actions"
  },
  { title: $i18n.t("admin.users.table.email"), key: "email", align: "start" },
  { title: $i18n.t("admin.users.table.role"), key: "role", align: "start" },
  { title: $i18n.t("common.table.createdAt"), key: "createdAt", align: "end" },
  { title: $i18n.t("common.table.updatedAt"), key: "updatedAt", align: "end" }
]);
async function onDelete({ id, email }: { id: string; email: string }, requestId: string) {
  openDialog({
    title: `Delete User ${email}`,
    message: `Do you really want to delete user ${email}`,
    actions: [
      { label: "cancel", action: () => {} },
      {
        label: "delete",
        action: async () => {
          try {
            await $api.users.deleteUser(id, requestId);
            if (users && users.value) {
              users.value = users.value?.filter((user) => user.id === id);
            }
            refresh();
          } catch (error) {
            // noop error handling is done by $api
          }
        }
      }
    ]
  });
}
</script>
