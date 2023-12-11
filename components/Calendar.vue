<template>
  <v-row>
    <v-col>
      <h4 class="text-h4 mb-2">
        {{ $t("calendar.title") }}
      </h4>
    </v-col>
  </v-row>
  <v-row>
    <v-col
      v-for="(item, index) of events.slice(0, 3)"
      cols="12"
      xs="12"
      :sm="index === 2 ? 12 : 6"
      md="4"
      lg="4"
      xl="4"
    >
      <v-card class="elevation-0 rounded-0">
        <v-card-subtitle
          class="d-flex justify-space-between px-0 py-2 text-body-1 font-weight-bold text-secondary"
        >
          <span>{{ item.date }}</span> <span>@ {{ item.time }}</span> </v-card-subtitle
        ><v-hover v-slot="{ isHovering, props }"
          ><v-card-title
            :class="{ 'on-hover': isHovering }"
            v-bind="props"
            class="px-0 py-2 text-h6 font-weight-bold"
          >
            <a :href="item.url" class="text-secondary text-wrap">{{ item.title }}</a>
          </v-card-title></v-hover
        >
        <v-card-text class="text-body-1 px-0 py-4">
          {{ item.description }}
        </v-card-text>
        <v-card-actions v-if="item.link_text" class="pa-0">
          <a :href="item.url" class="text-secondary" variant="plain">{{ item.link_text }}</a>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script setup>
const events = ref([]);
const { data, refresh } = await useFetch(
  "https://docs.google.com/spreadsheets/d/1LMXBxJ9tE4fwL3Fj9yJ5xf2g6u7lr0h7A0HDVpP7g3A/gviz/tq",
  { server: false }
).catch((error) => console.log(error));

watch(data, async (newValue) => {
  if (newValue) {
    const result = await parseData(newValue);
    events.value = result;
  }
});

async function parseData(textBlob) {
  let jsonData = (await textBlob.text())
    .replace("/*O_o*/\n", "")
    .replace(/(^google\.visualization\.Query\.setResponse\(|\);$)/g, "");
  let responseJSON = JSON.parse(jsonData);
  let rowsArray = [];
  responseJSON.table.rows.forEach(function (row) {
    rowsArray.push({
      date: row.c[0].f,
      time: row.c[1].v,
      title: row.c[2].v,
      url: row.c[3] ? row.c[3].v : null,
      link_text: row.c[4] ? row.c[4].v : null,
      description: row.c[5] ? row.c[5].v : null
    });
  });
  return rowsArray;
}

onMounted(async () => {
  refresh();
});
</script>
<style scoped>
.v-card .v-card-subtitle {
  border-bottom: 1px solid rgb(var(--v-theme-secondary-lighten-1));
}
.v-card .v-card-title {
  border-bottom: 4px solid rgb(var(--v-theme-primary));
  line-height: 1;
}
.v-card-title.on-hover {
  opacity: 0.8;
  cursor: pointer;
}
</style>
