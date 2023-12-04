<template>
  <v-sheet class="pa-10 my-16">
    <v-row>
      <v-col>
        <h4 class="text-h4 mb-2">
          <!-- <h3 class="text-body-1 font-weight-black text-uppercase text-secondary-lighten-3"> -->
          {{ $t("landingPage.news.title") }}
          <!-- </h3> -->
        </h4>
        <p class="py-4">
          {{ $t("landingPage.news.description") }}
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-if="pending" v-for="item in [1, 2, 3]" :key="item" cols="12" sm="4" md="4">
        <v-skeleton-loader
          elevation="0"
          class="mx-auto border"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
      <v-col v-else v-for="item in data || []" :key="item.id" cols="12" sm="4" md="4">
        <a :href="item.link" target="_blank">
          <v-hover v-slot="{ isHovering, props }">
            <v-card elevation="0">
              <v-img :src="item.yoast_head_json.og_image[0].url" height="200px" cover></v-img>

              <v-card-title
                :class="{ 'on-hover': isHovering }"
                v-bind="props"
                class="px-0 py-4 text-h6 font-weight-bold"
              >
                {{ item.yoast_head_json.title }}
              </v-card-title>
              <v-card-text class="px-0 py-4">
                <div v-html="item.yoast_head_json.description"></div>
              </v-card-text>
            </v-card>
          </v-hover>
        </a>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <!-- <h3 class="text-body-1 font-weight-black text-uppercase text-secondary-lighten-3"> -->
        <h4 class="text-h4 mb-2">
          {{ $t("landingPage.chatbot.title") }}
        </h4>
        <!-- </h3> -->
        <p class="py-4">
          {{ $t("landingPage.chatbot.description") }}
        </p>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="12" md="6">
        <v-text-field
          v-model="newMessage"
          class="custom-text-field"
          :label="$t('chatbot.textfield.label')"
          density="compact"
          variant="solo"
          hide-details
          color="secondary"
          @keyup.enter="onSendButtonClick"
        >
          <template v-slot:append-inner>
            <v-btn
              icon
              variant="plain"
              density="default"
              size="default"
              :disabled="newMessage.length === 0 || loading"
              color="primary"
              @click="onSendButtonClick"
            >
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script lang="ts" setup>
const store = useChatBotStore();
const { sendMessage, activateBot, minimizeChat } = store;
const { loading } = storeToRefs(useChatBotStore());

const newMessage = ref("");
type Post = {
  id: number;
  link: string;
  yoast_head_json: {
    title: string;
    description: string;
    og_image: {
      url: string;
    }[];
  };
};

const url = "https://correctiv.org/wp-json/wp/v2/posts/?per_page=3&order=desc&orderby=date";

const { data, pending } = useFetch<Post[]>(url);

async function onSendButtonClick() {
  activateBot();
  sendMessage(newMessage.value);
  newMessage.value = "";
}
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
